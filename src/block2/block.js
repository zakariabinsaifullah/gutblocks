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

registerBlockType( 'gtb/cta-with-image', {
	title: __( 'CTA With Image' ),
	icon: {
		src: 'format-image',
		foreground: '#867ae9'
	},
	category: 'gutblocks',
	keywords: [
		__( 'call to action' ),
		__( 'CTA with Image' ),
	],
	attributes,
	edit,
	save: ({ attributes }) => {
		const { url, alt, id, containerBg, containerWidth, btnText, btnLink, btnColor, btnBg, btnRadius, tab } = attributes; 
		return (
			<div className={`cta-with-image`} style={{ backgroundColor: containerBg }}>
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
                        <div className="btn-wrapper">
                            <a href={btnLink} target={`_${tab}`} rel="nofollow noopener" style={{ backgroundColor: btnBg, color: btnColor, borderRadius: btnRadius }}>
                                { btnText }
                            </a>
                        </div>
                    </div>
                </div>
            </div>
		);
	},
} );
