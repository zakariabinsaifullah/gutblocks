import { InnerBlocks, BlockControls, InspectorControls, MediaPlaceholder, MediaUpload, MediaUploadCheck, PanelColorSettings } from '@wordpress/block-editor';
import { Button, PanelBody, Toolbar, RangeControl } from '@wordpress/components';
const { Fragment } = wp.element;
const { __ } = wp.i18n;

const Edit = ({ attributes, setAttributes }) => {
    const { url, alt, id, containerBg, containerWidth } = attributes; 
    return(
        <Fragment>
            <InspectorControls>
                <PanelBody 
                    title       = {__("Container Width")}
                    initialOpen = { true }
                >
                    <RangeControl
                        label="Container Max Width"
                        value={ containerWidth }
                        onChange={ ( containerWidth ) => setAttributes( { containerWidth } ) }
                        min={ 1 }
                        max={ 2000 }
                    />
                </PanelBody>
                <PanelColorSettings
                    title={ __( 'Container Background' ) }
                    initialOpen={ true }
                    colorSettings={ [
                        {
                            value: containerBg,
                            onChange: ( colorValue ) => setAttributes( { containerBg: colorValue } ),
                            label: __( 'Background Color' ),
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
            <div className={`page-header`} style={{ backgroundColor: containerBg }}>
                <div className="container" style={{ maxWidth: containerWidth }}>
                    <div className="block-content">
                        <div className="image-wrapper">
                        {
                            url ? (
                                <Fragment>
                                    <img src={url} alt={alt} className="card-image" />
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
                                    labels = { { title: ' Add Image' } }
                                />
                            )
                        }
                        </div>
                        <div className="inner-blocks-wrapper">
                            <InnerBlocks 
                                allowedBlocks={['core/heading', 'core/paragraph', 'core/button']}
                                template={[
                                    ['core/heading'],
                                    ['core/paragraph'],
                                    ['core/button']
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default Edit; 