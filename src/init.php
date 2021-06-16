<?php
/**
 * Blocks Initializer
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Registration Function 
*/
function gutblocks_register( $block, $options=array() ){
    return register_block_type(
        'gtb/' . $block,
        array_merge(
			array(
				'style'         => 'gut_blocks-style-css',
				'editor_script' => 'gut_blocks-block-js',
				'editor_style'  => 'gut_blocks-editor-css',
			),
            $options
        )
    );
}

function gutblocks_init() {

	wp_register_style(
		'gut_blocks-style-css',
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ),
		is_admin() ? array( 'wp-editor' ) : null,
		null
	);

	wp_register_script(
		'gut_blocks-block-js',
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
		null,
		true
	);

	wp_register_style(
		'gut_blocks-editor-css',
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ),
		array( 'wp-edit-blocks' ),
		null
	);

	// Single Block Registration 
	gutblocks_register('page-header');
	gutblocks_register('cta-with-image');
	gutblocks_register('cta-without-image');
	gutblocks_register('service-block');
}
add_action( 'init', 'gutblocks_init' );

/*
 * New Category
 * */
function gutblocks_new_cat( $categories ){
	return array_merge(
		$categories,
		array(
			array(
				'title' => 'GutBlocks',
				'slug'  => 'gutblocks'
			)
		)
	);
}
add_filter( 'block_categories', 'gutblocks_new_cat' );
