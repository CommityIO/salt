<?php

namespace GoDaddy\WordPress\MWC\Core\Auth\Interceptors\Handlers;

use DateInterval;
use DateTime;
use Exception;
use GoDaddy\WordPress\MWC\Common\Configuration\Configuration;
use GoDaddy\WordPress\MWC\Common\Exceptions\SentryException;
use GoDaddy\WordPress\MWC\Common\Helpers\TypeHelper;
use GoDaddy\WordPress\MWC\Common\Interceptors\Handlers\AbstractInterceptorHandler;
use GoDaddy\WordPress\MWC\Common\Schedule\Schedule;
use GoDaddy\WordPress\MWC\Core\Auth\Interceptors\PlatformTokenRefreshInterceptor;

/**
 * Handles scheduling the recurring platform token refresh job.
 */
class SchedulePlatformTokenRefreshHandler extends AbstractInterceptorHandler
{
    /**
     * Schedules the recurring job if it's not already scheduled.
     *
     * @param mixed ...$args
     * @return void
     */
    public function run(...$args) : void
    {
        $job = Schedule::recurringAction()->setName(PlatformTokenRefreshInterceptor::JOB_NAME);

        if ($job->isScheduled()) {
            return;
        }

        try {
            $job
                ->setScheduleAt(new DateTime('now'))
                ->setInterval($this->getJobInterval())
                ->schedule();
        } catch (Exception $exception) {
            SentryException::getNewInstance('Failed to schedule platform token refresh job.', $exception);
        }
    }

    /**
     * Gets the job interval.
     */
    protected function getJobInterval() : DateInterval
    {
        $intervalString = TypeHelper::string(Configuration::get('auth.godaddy.mwc.api.tokenRefreshJobDateInterval'), 'PT45M');

        try {
            return new DateInterval($intervalString);
        } catch (Exception $e) {
            return new DateInterval('PT45M');
        }
    }
}
