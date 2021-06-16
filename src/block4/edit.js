import { RichText, BlockControls, InspectorControls, MediaPlaceholder, MediaUpload, MediaUploadCheck, PanelColorSettings } from '@wordpress/block-editor';
import { Button, PanelBody, Toolbar, SelectControl, ToggleControl } from '@wordpress/components';
const { Fragment } = wp.element;
const { __ } = wp.i18n;

import SVG from './icon';

const tags = [
    { 
        label: 'h1', 
        value: 'h1' 
    },
    { 
        label: 'h2', 
        value: 'h2' 
    },
    { 
        label: 'h3', 
        value: 'h3'
    }
];

const Edit = ({ attributes, setAttributes }) => {
    const { url, alt, id, heading, headingTag, headingColor, iconBg } = attributes; 

    return(
        <Fragment>
            <InspectorControls>
                <PanelBody 
                    title       = {__("Heading Options")}
                    initialOpen = { true }
                >
                    <SelectControl
                        label="Select Heading Tag"
                        value={ headingTag }
                        options={ tags}
                        onChange={ ( headingTag ) => { setAttributes( { headingTag } ) } }
                    />
                </PanelBody>
                <PanelColorSettings
                    title={ __( 'Color Settings' ) }
                    initialOpen={ false }
                    colorSettings={ [
                        {
                            value: headingColor,
                            onChange: ( colorValue ) => setAttributes( { headingColor: colorValue } ),
                            label: __( 'Heading Color' ),
                        },
                        {
                            value: iconBg,
                            onChange: ( colorValue ) => setAttributes( { iconBg: colorValue } ),
                            label: __( 'Icon Background' ),
                        },
                    ] }
                />
            </InspectorControls>
            <BlockControls>
                {
                    url &&
                    <Toolbar>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={ media => setAttributes({ 
                                    url:media.url, 
                                    id: media.id,
                                    alt: media.alt
                                })}
                                allowedTypes={["image"]}
                                value={id}
                                render={({ open }) => {
                                    return (
                                        <Button
                                            className="components-icon-button components-toolbar__control"
                                            label={__(
                                                "Edit Image"
                                            )}
                                            onClick={open}
                                            icon="edit"
                                        />
                                    );
                                }}
                            />
                        </MediaUploadCheck>
                        <Button
                            className="components-icon-button components-toolbar__control"
                            label={__(
                                "Delete Image"
                            )}
                            onClick={ () => setAttributes({ url:'', id: null, alt: '' }) }
                            icon="trash"
                        />
                    </Toolbar>
                }
            </BlockControls>
            <div className={`service-block`}>
                <div className="image-wrapper">
                {
                    url ? (
                        <Fragment>
                            <img src={url} alt={alt} className="service-image" />
                        </Fragment>
                    ) : (
                        <MediaPlaceholder
                            icon="format-image"
                            onSelect={ media => setAttributes({ 
                                url:media.url, 
                                id: media.id,
                                alt: media.alt
                            })}
                            onFilesPreUpload={ media => setAttributes({ 
                                url:media.url, 
                                id: media.id,
                                alt: media.alt
                            })}
                            onSelectURL={ url => setAttributes({ url })}
                            allowedTypes={["image"]}
                            labels = { { title: ' Add Service Image' } }
                        />
                    )
                }
                </div>
                <div className="content-wrapper">
                    <div className="heading">
                        <RichText
                            tagName={headingTag}
                            value={ heading }
                            onChange={ ( heading ) => setAttributes( { heading } ) }
                            style={{ color: headingColor }}
                        />
                    </div>
                    <div className="icon" style={{ backgroundColor: iconBg }}>
                        { SVG }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default Edit; 