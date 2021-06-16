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
import SVG from './icon';

import { RichText } from '@wordpress/block-editor';

/**
 * Register: Page Header Gutenberg Block.
 */

registerBlockType( 'gtb/service-block', {
	title: __( 'Service Block' ),
	icon: {
		src: 'screenoptions',
		foreground: '#867ae9'
	},
	category: 'gutblocks',
	keywords: [
		__( 'Service Block' ),
	],
	attributes,
	edit,
	save: ({ attributes }) => {
		const { url, alt, id, heading, headingTag, headingColor, iconBg } = attributes; 
		return (
			<div className={`service-block`}>
                <div className="image-wrapper">
                {
                    url &&
                    <img src={url} alt={alt} className={ `service-image wp-image-${id} `} />
                }
                </div>
                <div className="content-wrapper">
                    <div className="heading">
                        <RichText.Content 
                            tagName={headingTag}
                            value={ heading }
                            style={{ color: headingColor }}
                        />
                    </div>
                    <div className="icon" style={{ backgroundColor: iconBg }}>
                        { SVG }
                    </div>
                </div>
            </div>
		);
	},
} );
