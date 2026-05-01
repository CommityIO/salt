<?php

namespace GoDaddy\WordPress\OAuth\Interceptors\Handlers;

use Exception;
use GoDaddy\WordPress\MWC\Common\Container\ContainerFactory;
use GoDaddy\WordPress\OAuth\Admin\ConnectionPage;

/**
 * Abstract base class for interceptor handlers.
 *
 * Handlers contain the actual logic executed by interceptors. This mirrors
 * the pattern from mwc-common, providing a static entry point that creates
 * an instance and delegates to run().
 */
abstract class AbstractInterceptorHandler
{
    /**
     * Static entry point for the handler.
     *
     * Creates an instance via createInstance() and calls run() with the provided args.
     * This is the method that should be registered as the hook callback.
     *
     * @param mixed ...$args Arguments passed from the WordPress hook
     * @return mixed The result from run()
     * @throws Exception
     */
    public static function handle(...$args)
    {
        return static::createInstance()->run(...$args);
    }

    /**
     * Create a new handler instance from the DI container.
     *
     * Resolves the concrete handler class with all its dependencies
     * via auto-wiring. Subclasses do not need to override this.
     *
     * @return static
     * @throws Exception
     */
    protected static function createInstance() : self
    {
        return ContainerFactory::getInstance()->getSharedContainer()->get(static::class);
    }

    /**
     * Execute the handler logic.
     *
     * Concrete handlers implement this method with their specific logic.
     * The method should check if the request matches before processing.
     *
     * @param mixed ...$args Arguments passed from the WordPress hook
     * @return mixed
     */
    abstract public function run(...$args);

    /**
     * Store a pending admin notice in wp_options for display after redirect.
     *
     * The notice is persisted so it survives the redirect and is picked up
     * by ConnectionPage on the next admin page load.
     *
     * @param string $id Unique notice identifier
     * @param string $type Notice type (use Notice::TYPE_* constants)
     * @param string $content Notice message content
     * @return void
     */
    protected function enqueueNotice(string $id, string $type, string $content) : void
    {
        update_option(ConnectionPage::PENDING_NOTICE_OPTION, [
            'id'      => $id,
            'type'    => $type,
            'content' => $content,
        ]);
    }

    /**
     * Redirect to the admin connection page.
     *
     * @return void
     */
    protected function redirectToAdminPage() : void
    {
        wp_safe_redirect(admin_url('options-general.php?page='.ConnectionPage::PAGE_SLUG));
        $this->terminate();
    }

    /**
     * Terminate script execution.
     *
     * @return void
     * @codeCoverageIgnore
     */
    protected function terminate() : void
    {
        exit;
    }
}
