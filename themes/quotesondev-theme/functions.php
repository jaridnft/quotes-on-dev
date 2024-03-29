<?php
/**
 * Quotes on Dev Theme functions and definitions.
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package QOD_Theme
 */

if ( ! function_exists( 'qod_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 */
	function qod_setup() {
		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		// Let WordPress manage the document title.
		add_theme_support( 'title-tag' );

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus( array(
			'primary' => esc_html( 'Primary Menu' ),
		) );

		// Switch search form, comment form, and comments to output valid HTML5.
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		) );

	}
endif; // qod_setup
add_action( 'after_setup_theme', 'qod_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * @global int $content_width
 */
function qod_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'qod_content_width', 640 );
}

add_action( 'after_setup_theme', 'qod_content_width', 0 );

/**
 * Filter the stylesheet_uri to output the minified CSS file.
 */
function qod_minified_css( $stylesheet_uri, $stylesheet_dir_uri ) {
	if ( file_exists( get_template_directory() . '/build/css/style.min.css' ) ) {
		$stylesheet_uri = $stylesheet_dir_uri . '/build/css/style.min.css';
	}

	return $stylesheet_uri;
}

add_filter( 'stylesheet_uri', 'qod_minified_css', 10, 2 );

/**
 * Enqueue scripts and styles.
 */

function qod_scripts() {
	wp_enqueue_script( 'jquery' );

	wp_enqueue_style( 'qod-style', get_stylesheet_uri() );
	wp_enqueue_style( 'font-awesome-cdn', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css', array(), '4.4.0' );

	wp_enqueue_script( 'qod-skip-link-focus-fix', get_template_directory_uri() . '/build/js/skip-link-focus-fix.min.js', array(), '20130115', true );

	if ( is_front_page() || is_single() ) {
		wp_enqueue_script( 'jquery' );
		wp_enqueue_script( 'generate_quote', get_template_directory_uri() . '/build/js/get.min.js', array( 'jquery' ), false, true );
	} elseif ( is_page( 'submit' ) ) {
		wp_enqueue_script( 'jquery' );
		wp_enqueue_script( 'generate_quote', get_template_directory_uri() . '/build/js/post.min.js', array( 'jquery' ), false, true );
	}

	wp_localize_script( 'generate_quote', 'apiVars', array(
		'rootUrl' => home_url(),
		'restUrl' => esc_url_raw( rest_url() ),
		'nonce'   => wp_create_nonce( 'wp_rest' ),
		'success' => "Thanks, your quote submission was received!",
		'failure' => "Your submission could not be processed."
	) );
}

add_action( 'wp_enqueue_scripts', 'qod_scripts' );

/**
 * Custom functions that act independently of the theme templates.
 */
require get_template_directory() . '/inc/extras.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Custom metaboxes generated using the CMB2 library.
 */
require get_template_directory() . '/inc/metaboxes.php';

/**
 * Custom WP API modifications.
 */
require get_template_directory() . '/inc/api.php';

