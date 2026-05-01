<?php

namespace DeliciousBrains\WPMDB\Pro\Compatibility\Layers\Platforms;

class Autoscale extends AbstractPlatform {
	/**
	 * @var string
	 */
	protected static $key = 'autoscale';

	/**
	 * Are we running on this platform?
	 *
	 * @return bool
	 */
	public static function is_platform() {
		if ( ! defined( 'WPE_PLATFORM_NAME' ) ) {
			return false;
		}

		return 'autoscale' === strtolower( (string) WPE_PLATFORM_NAME );
	}

	/**
	 * Filters the current platform key.
	 *
	 * @param string $platform
	 *
	 * @return string
	 */
	public function filter_platform( $platform ) {
		if ( static::is_platform() ) {
			return static::get_key();
		}

		return $platform;
	}
}
