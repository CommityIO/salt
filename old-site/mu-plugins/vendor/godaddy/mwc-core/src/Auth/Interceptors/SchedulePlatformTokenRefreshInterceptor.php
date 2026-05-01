<?php

namespace GoDaddy\WordPress\MWC\Core\Auth\Interceptors;

use Exception;
use GoDaddy\WordPress\MWC\Common\Interceptors\AbstractInterceptor;
use GoDaddy\WordPress\MWC\Common\Register\Register;
use GoDaddy\WordPress\MWC\Core\Auth\Interceptors\Handlers\SchedulePlatformTokenRefreshHandler;
use GoDaddy\WordPress\MWC\Core\Traits\CanDetermineWhetherIsStagingSiteTrait;

/**
 * Interceptor to schedule the recurring platform token refresh job.
 */
class SchedulePlatformTokenRefreshInterceptor extends AbstractInterceptor
{
    use CanDetermineWhetherIsStagingSiteTrait;

    /**
     * {@inheritDoc}
     */
    public static function shouldLoad() : bool
    {
        if (static::isStagingSite()) {
            return false;
        }

        return parent::shouldLoad();
    }

    /**
     * {@inheritDoc}
     *
     * @throws Exception
     */
    public function addHooks() : void
    {
        Register::action()
            ->setGroup('shutdown')
            ->setHandler([SchedulePlatformTokenRefreshHandler::class, 'handle'])
            ->execute();
    }
}
