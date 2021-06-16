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

registerBlockType( 'gtb/cta-without-image', {
	title: __( 'CTA Without Image' ),
	icon: {
		src: 'welcome-comments',
		foreground: '#867ae9'
	},
	category: 'gutblocks',
	keywords: [
		__( 'call to action' ),
		__( 'CTA without Image' ),
	],
	attributes,
	edit,
	save: ({ attributes }) => {
		const { containerBg, containerWidth, btnText, btnLink, btnColor, btnBg, btnRadius, tab } = attributes; 
		return (
			<div className={`cta-without-image`} style={{ backgroundColor: containerBg }}>
                <div className="container" style={{ maxWidth: containerWidth }}>
                    <div className="block-content">
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
