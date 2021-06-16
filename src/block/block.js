/**
 * BLOCK: Page Header 
 *
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

import edit from './edit';
import attributes from './attributes';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Register: Page Header Gutenberg Block.
 */

registerBlockType( 'gtb/page-header', {
	title: __( 'Page Header' ),
	icon: {
		src: 'columns',
		foreground: '#867ae9'
	},
	category: 'gutblocks',
	keywords: [
		__( 'Page Header' ),
		__( 'Hero Area' ),
	],
	attributes,
	edit,
	save: ({ attributes }) => {
		const { url, alt, id, containerBg, containerWidth } = attributes; 
		return (
			<div className={`page-header`} style={{ backgroundColor: containerBg }}>
                <div className="container" style={{ maxWidth: containerWidth }}>
                    <div className="block-content">
                        <div className="image-wrapper">
                        {
                            url &&
                            <img src={url} alt={alt} className={`card-image wp-image-${id}`} />
                        }
                        </div>
                        <div className="inner-blocks-wrapper">
                            <InnerBlocks.Content />
                        </div>
                    </div>
                </div>
            </div>
		);
	},
} );
