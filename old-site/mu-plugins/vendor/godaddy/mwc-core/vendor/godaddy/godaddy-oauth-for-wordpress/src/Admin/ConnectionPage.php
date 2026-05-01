<?php

namespace GoDaddy\WordPress\OAuth\Admin;

use Exception;
use GoDaddy\WordPress\MWC\Common\Admin\Notices\Notice;
use GoDaddy\WordPress\MWC\Common\Admin\Notices\Notices;
use GoDaddy\WordPress\MWC\Common\Helpers\TypeHelper;
use GoDaddy\WordPress\MWC\Common\Register\Register;
use GoDaddy\WordPress\OAuth\Interceptors\DisconnectInterceptor;
use GoDaddy\WordPress\OAuth\Storage\Contracts\TokenRepositoryContract;

/**
 * GoDaddy Connection admin page.
 *
 * Provides WordPress admin interface for managing the OAuth connection.
 * Shows connection status and allows users to connect/reconnect.
 */
class ConnectionPage
{
    /**
     * Admin page slug.
     *
     * @var string
     */
    public const PAGE_SLUG = 'godaddy-connection';

    /**
     * Nonce action for authorization requests.
     *
     * @var string
     */
    public const NONCE_ACTION = 'gd_oauth_authorize';

    /**
     * Token repository instance.
     *
     * @var TokenRepositoryContract
     */
    private TokenRepositoryContract $tokenRepository;

    /**
     * Constructor.
     *
     * @param TokenRepositoryContract $tokenRepository Repository instance
     */
    public function __construct(TokenRepositoryContract $tokenRepository)
    {
        $this->tokenRepository = $tokenRepository;
    }

    /** @var string Option key for storing pending notice data */
    public const PENDING_NOTICE_OPTION = 'gd_oauth_pending_notice';

    /**
     * Load the admin page.
     *
     * Registers the admin_menu hook and admin_init hook for pending notices.
     *
     * @return void
     * @throws Exception
     */
    public function load() : void
    {
        Register::action()
            ->setGroup('admin_menu')
            ->setHandler([$this, 'addMenuPage'])
            ->execute();

        Register::action()
            ->setGroup('admin_init')
            ->setHandler([$this, 'enqueuePendingNotice'])
            ->execute();
    }

    /**
     * Enqueue a pending notice stored in wp_options.
     *
     * Reads notice data saved by interceptor handlers, deletes it from
     * wp_options, and enqueues it into the mwc-common Notices system
     * for a single render. The notice displays once and is not dismissible.
     *
     * @return void
     */
    public function enqueuePendingNotice() : void
    {
        $noticeData = get_option(self::PENDING_NOTICE_OPTION);

        if (! is_array($noticeData) || empty($noticeData['id'])) {
            return;
        }

        delete_option(self::PENDING_NOTICE_OPTION);

        Notices::enqueueAdminNotice(
            Notice::getNewInstance()
                ->setId(TypeHelper::string($noticeData['id'], ''))
                ->setType(TypeHelper::string($noticeData['type'] ?? Notice::TYPE_INFO, Notice::TYPE_INFO))
                ->setContent(TypeHelper::string($noticeData['content'] ?? '', ''))
                ->setDismissible(false)
        );
    }

    /**
     * Add the menu page to WordPress admin Settings submenu.
     *
     * @return void
     */
    public function addMenuPage() : void
    {
        add_options_page(
            __('GoDaddy Connection', 'godaddy-oauth-for-wordpress'),
            __('GoDaddy Connection', 'godaddy-oauth-for-wordpress'),
            'manage_options',
            self::PAGE_SLUG,
            [$this, 'renderPage']
        );
    }

    /**
     * Render the admin page.
     *
     * @return void
     */
    public function renderPage() : void
    {
        $status = $this->getConnectionStatus();

        $this->renderTemplate($status);
    }

    /**
     * Get the current connection status.
     *
     * @return ConnectionStatus
     */
    public function getConnectionStatus() : ConnectionStatus
    {
        return new ConnectionStatus($this->tokenRepository->get());
    }

    /**
     * Get the authorization URL with nonce.
     *
     * @return string The authorization URL with security nonce
     */
    public function getAuthorizationUrl() : string
    {
        $baseUrl = admin_url('admin-post.php?action=gd_oauth_authorize');

        return wp_nonce_url($baseUrl, self::NONCE_ACTION);
    }

    /**
     * Get the GoDaddy customer ID if available.
     *
     * Extracts the customer ID from the JWT access token's `sub` claim.
     * Returns null when no token is stored or the token has no customer ID.
     *
     * @return string|null Customer ID or null if not available
     */
    protected function getCustomerId() : ?string
    {
        $token = $this->tokenRepository->get();

        if (! $token) {
            return null;
        }

        return $token->getCustomerId();
    }

    /**
     * Render the page template.
     *
     * @param ConnectionStatus $status The connection status
     * @return void
     */
    protected function renderTemplate(ConnectionStatus $status) : void
    {
        ?>
        <style>
            .wrap .card.gd-oauth-card {
                max-width: 100%;
                padding: 0;
            }
            .wrap .card.gd-oauth-card .gd-oauth-card-section {
                padding: 0.7em 2em 1em;
            }
            .wrap .card.gd-oauth-card .gd-oauth-card-section + .gd-oauth-card-section {
                border-top: 1px solid #c3c4c7;
            }
            .wrap .card.gd-oauth-card .gd-oauth-detail {
                padding: 8px 0;
            }
        </style>
        <div class="wrap">
            <h1><?php echo esc_html__('GoDaddy Connection', 'godaddy-oauth-for-wordpress'); ?></h1>

            <?php if ($status->isConnected()) : ?>
                <?php $this->renderConnectedCard(); ?>
            <?php else : ?>
                <?php $this->renderDisconnectedCard(); ?>
            <?php endif; ?>
        </div>
        <?php
    }

    /**
     * Render the disconnected state card.
     *
     * @return void
     */
    protected function renderDisconnectedCard() : void
    {
        ?>
        <div class="card gd-oauth-card">
            <div class="gd-oauth-card-section">
                <h2><?php echo esc_html__('Authorize GoDaddy', 'godaddy-oauth-for-wordpress'); ?></h2>
                <p>
                    <?php echo esc_html__(
                        'Authorize GoDaddy to securely connect your WordPress site with your Commerce account so you can manage products and orders in one place. No passwords are shared.',
                        'godaddy-oauth-for-wordpress'
                    ); ?>
                </p>
            </div>
            <div class="gd-oauth-card-section">
                <p>
                    <a href="<?php echo esc_url($this->getAuthorizationUrl()); ?>" class="button button-primary">
                        <?php echo esc_html__('Start Authorization', 'godaddy-oauth-for-wordpress'); ?>
                    </a>
                </p>
            </div>
        </div>
        <?php
    }

    /**
     * Render the connected state card.
     *
     * @return void
     */
    protected function renderConnectedCard() : void
    {
        $customerId = $this->getCustomerId();
        ?>
        <div class="card gd-oauth-card">
            <div class="gd-oauth-card-section">
                <h2><?php echo esc_html__('Connected Account Details', 'godaddy-oauth-for-wordpress'); ?></h2>
                <?php if ($customerId) : ?>
                    <p class="gd-oauth-detail">
                        <?php
                        printf(
                            /* translators: %s: Customer ID */
                            esc_html__('Customer ID - %s', 'godaddy-oauth-for-wordpress'),
                            esc_html($customerId)
                        );
                    ?>
                    </p>
                <?php endif; ?>
            </div>
            <div class="gd-oauth-card-section">
                <p>
                    <a href="<?php echo esc_url(DisconnectInterceptor::getDisconnectUrl()); ?>"
                       class="button"
                       onclick="return confirm('<?php echo esc_js(__('Are you sure you want to disconnect your GoDaddy account?', 'godaddy-oauth-for-wordpress')); ?>');">
                        <?php echo esc_html__('Disconnect GoDaddy Account', 'godaddy-oauth-for-wordpress'); ?>
                    </a>
                </p>
            </div>
        </div>
        <?php
    }
}
