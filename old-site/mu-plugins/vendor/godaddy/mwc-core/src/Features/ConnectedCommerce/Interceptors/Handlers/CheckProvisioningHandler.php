<?php

namespace GoDaddy\WordPress\MWC\Core\Features\ConnectedCommerce\Interceptors\Handlers;

use DateInterval;
use DateTime;
use Exception;
use GoDaddy\WordPress\MWC\Common\Exceptions\SentryException;
use GoDaddy\WordPress\MWC\Common\Interceptors\Handlers\AbstractInterceptorHandler;
use GoDaddy\WordPress\MWC\Common\Schedule\Schedule;
use GoDaddy\WordPress\MWC\Common\Stores\Contracts\StoreRepositoryContract;
use GoDaddy\WordPress\MWC\Core\Features\Commerce\Exceptions\Contracts\CommerceExceptionContract;
use GoDaddy\WordPress\MWC\Core\Features\ConnectedCommerce\Interceptors\CheckProvisioningInterceptor;
use GoDaddy\WordPress\MWC\Core\Features\ConnectedCommerce\Providers\DataObjects\GetProvisioningContextInput;
use GoDaddy\WordPress\MWC\Core\Features\ConnectedCommerce\Services\Contracts\ProvisioningServiceContract;

/**
 * Checks provisioning status and transitions state when provisioning completes or fails.
 */
class CheckProvisioningHandler extends AbstractInterceptorHandler
{
    protected ProvisioningServiceContract $provisioningService;

    protected StoreRepositoryContract $storeRepository;

    public function __construct(ProvisioningServiceContract $provisioningService, StoreRepositoryContract $storeRepository)
    {
        $this->provisioningService = $provisioningService;
        $this->storeRepository = $storeRepository;
    }

    /**
     * {@inheritDoc}
     */
    public function run(...$args)
    {
        try {
            $contextId = $this->provisioningService->getProvisioningContextId();

            if (! $contextId) {
                $this->unschedulePolling();

                return;
            }

            $provisioningContext = $this->provisioningService->getProvisioningContext(
                new GetProvisioningContextInput(['contextId' => $contextId])
            );

            $this->handleProvisioningStatus($provisioningContext->provisioningStatus, $provisioningContext->storeId);
        } catch (CommerceExceptionContract|Exception $exception) {
            SentryException::getNewInstance('Failed to check Connected Commerce provisioning status.', $exception);
        }
    }

    /**
     * Handles the provisioning status transition.
     */
    protected function handleProvisioningStatus(string $status, ?string $storeId) : void
    {
        switch ($status) {
            case 'IN_PROGRESS':
                $this->handleInProgress($status);
                break;
            case 'COMPLETE':
                $this->handleComplete($status, $storeId);
                break;
            case 'FAILED':
                $this->handleFailed($status);
                break;
                // PENDING: do nothing, the recurring action will fire again
        }
    }

    /**
     * Handles in-progress provisioning.
     * This is just a status update; the recurring action is expected to fire again.
     */
    protected function handleInProgress(string $status) : void
    {
        $this->provisioningService->setProvisioningStatus($status);
    }

    /**
     * Handles successful provisioning completion.
     */
    protected function handleComplete(string $status, ?string $storeId) : void
    {
        if ($storeId) {
            $this->storeRepository->setDefaultStoreId($storeId);
        }

        $this->provisioningService->setProvisioningStatus($status);

        $this->unschedulePolling();
    }

    /**
     * Handles provisioning failure.
     */
    protected function handleFailed(string $status) : void
    {
        $this->provisioningService->setProvisioningStatus($status);

        $this->unschedulePolling();
    }

    /**
     * Unschedules the recurring provisioning check action.
     */
    protected function unschedulePolling() : void
    {
        try {
            Schedule::recurringAction()
                ->setName(CheckProvisioningInterceptor::JOB_NAME)
                // RecurringAction::validate() requires that we set values for scheduleAt and interval but the values are not important
                ->setScheduleAt(new DateTime('now'))
                ->setInterval(new DateInterval('PT1M'))
                ->unschedule(true);
        } catch (Exception $exception) {
            SentryException::getNewInstance('Failed to unschedule Connected Commerce provisioning polling job.', $exception);
        }
    }
}
