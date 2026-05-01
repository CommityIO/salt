<?php

namespace GoDaddy\WordPress\MWC\Core\Auth\Jobs;

use DateTime;
use Exception;
use GoDaddy\WordPress\MWC\Common\Auth\AuthProviderFactory;
use GoDaddy\WordPress\MWC\Common\Exceptions\SentryException;
use GoDaddy\WordPress\MWC\Common\Providers\Jitter\Contracts\CanGetJitterContract;
use GoDaddy\WordPress\MWC\Common\Schedule\Schedule;
use GoDaddy\WordPress\MWC\Core\Auth\Providers\Platform\AuthProvider;
use GoDaddy\WordPress\MWC\Core\JobQueue\Contracts\QueueableJobContract;
use GoDaddy\WordPress\MWC\Core\JobQueue\Contracts\RetryableJobContract;
use GoDaddy\WordPress\MWC\Core\JobQueue\Helpers\JobConfigHelper;
use GoDaddy\WordPress\MWC\Core\JobQueue\Services\ScheduledJobQueueDispatchService;
use GoDaddy\WordPress\MWC\Core\JobQueue\Traits\RetryableJobTrait;

/**
 * Job to refresh the platform authentication token.
 */
class RefreshPlatformTokenJob implements QueueableJobContract, RetryableJobContract
{
    use RetryableJobTrait;

    /** @var string represents the key of this job */
    public const JOB_KEY = 'refreshPlatformTokenJob';

    /** @var int base delay in seconds for exponential backoff */
    protected const RETRY_BASE_DELAY_SECONDS = 60;

    /** @var int maximum delay in seconds for exponential backoff */
    protected const RETRY_MAX_DELAY_SECONDS = 900;

    protected AuthProviderFactory $authProviderFactory;

    protected CanGetJitterContract $jitterProvider;

    public function __construct(AuthProviderFactory $authProviderFactory, CanGetJitterContract $jitterProvider)
    {
        $this->authProviderFactory = $authProviderFactory;
        $this->jitterProvider = $jitterProvider;
    }

    /**
     * {@inheritDoc}
     */
    public function getMaxAttempts() : int
    {
        return 2;
    }

    /**
     * {@inheritDoc}
     */
    protected function executeJob() : void
    {
        $authProvider = $this->authProviderFactory->getManagedWooCommerceAuthProvider();

        if (! $authProvider instanceof AuthProvider) {
            return;
        }

        $authProvider->getFreshCredentials();
    }

    /**
     * Schedules a delayed retry instead of immediately re-queuing.
     */
    protected function retryJob(int $nextAttempt) : void
    {
        $delay = $this->getRetryDelay($nextAttempt);

        try {
            Schedule::singleAction()
                ->setName(ScheduledJobQueueDispatchService::ACTION_SCHEDULER_JOB_NAME)
                ->setArguments(
                    JobConfigHelper::getJobKeyByClassName(static::class),
                    [],
                    [$nextAttempt]
                )
                ->setScheduleAt(new DateTime("+{$delay} seconds"))
                ->schedule();
        } catch (Exception $exception) {
            SentryException::getNewInstance('Failed to schedule delayed retry for platform token refresh.', $exception);
        }
    }

    /**
     * Calculates retry delay with exponential backoff and jitter.
     *
     * With the default base and retry intervals at 3 total retries, this yields ~60s, ~120s, ~240s delays.
     */
    protected function getRetryDelay(int $attemptCount) : int
    {
        $exponentialDelay = min(
            static::RETRY_BASE_DELAY_SECONDS * (2 ** ($attemptCount - 1)),
            static::RETRY_MAX_DELAY_SECONDS
        );

        return $this->jitterProvider->getJitter($exponentialDelay);
    }

    /**
     * {@inheritDoc}
     */
    protected function onFailure(Exception $exception, int $attemptCount) : void
    {
        SentryException::getNewInstance(
            'Failed to refresh platform token (attempt '.$attemptCount.'/'.$this->getMaxAttempts().'): '.$exception->getMessage(),
            $exception
        );
    }
}
