<?php

namespace GoDaddy\WordPress\MWC\Core\Auth\Interceptors\Handlers;

use Exception;
use GoDaddy\WordPress\MWC\Common\Exceptions\SentryException;
use GoDaddy\WordPress\MWC\Common\Interceptors\Handlers\AbstractInterceptorHandler;
use GoDaddy\WordPress\MWC\Core\Auth\Jobs\RefreshPlatformTokenJob;
use GoDaddy\WordPress\MWC\Core\JobQueue\JobQueue;

/**
 * Handles the callback for the recurring platform token refresh action.
 */
class PlatformTokenRefreshHandler extends AbstractInterceptorHandler
{
    /**
     * Dispatches the platform token refresh job.
     *
     * @param mixed ...$args
     * @return void
     */
    public function run(...$args) : void
    {
        try {
            JobQueue::getNewInstance()->chain([RefreshPlatformTokenJob::class])->dispatch();
        } catch (Exception $exception) {
            SentryException::getNewInstance('Failed to dispatch platform token refresh job: '.$exception->getMessage(), $exception);
        }
    }
}
