<?php

namespace GoDaddy\WordPress\MWC\Core\Auth\Interceptors;

use Exception;
use GoDaddy\WordPress\MWC\Common\Interceptors\AbstractInterceptor;
use GoDaddy\WordPress\MWC\Common\Register\Register;
use GoDaddy\WordPress\MWC\Core\Auth\Interceptors\Handlers\PlatformTokenRefreshHandler;

/**
 * Listens for the recurring platform token refresh action and dispatches the refresh job.
 */
class PlatformTokenRefreshInterceptor extends AbstractInterceptor
{
    public const JOB_NAME = 'mwc_gd_platform_token_refresh';

    /**
     * Adds hooks.
     *
     * @throws Exception
     */
    public function addHooks() : void
    {
        Register::action()
            ->setGroup(self::JOB_NAME)
            ->setHandler([PlatformTokenRefreshHandler::class, 'handle'])
            ->execute();
    }
}
