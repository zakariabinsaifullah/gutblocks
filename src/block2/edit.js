import { InnerBlocks, BlockControls, InspectorControls, MediaPlaceholder, MediaUpload, MediaUploadCheck, PanelColorSettings } from '@wordpress/block-editor';
import { Button, PanelBody, Toolbar, RangeControl, TextControl, ToggleControl } from '@wordpress/components';
const { Fragment } = wp.element;
const { __ } = wp.i18n;

const Edit = ({ attributes, setAttributes }) => {
    const { url, alt, id, containerBg, containerWidth, btnText, btnLink, btnColor, btnBg, btnRadius, newTab, tab } = attributes; 

    // btn tab 
    setAttributes({
        tab: newTab ? 'blank' : 'self'
    })

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
                    initialOpen={ false }
                    colorSettings={ [
                        {
                            value: containerBg,
                            onChange: ( colorValue ) => setAttributes( { containerBg: colorValue } ),
                            label: __( 'Background Color' ),
                        },
                    ] }
                />
                <PanelBody 
                    title       = {__("Button Settings")}
                    initialOpen = { false }
                >
                    <TextControl
                        label="Button Label"
                        value={ btnText }
                        onChange={ ( btnText ) => setAttributes( { btnText } ) }
                    />
                    <TextControl
                        label="Button Link"
                        value={ btnLink }
                        onChange={ ( btnLink ) => setAttributes( { btnLink } ) }
                    />
                    <ToggleControl
                        label="Open at New Tab?"
                        checked={ newTab }
                        onChange={ () => setAttributes({ newTab: ! newTab }) }
                    />
                    <RangeControl
                        label="Border Radius"
                        value={ btnRadius }
                        onChange={ ( btnRadius ) => setAttributes( { btnRadius } ) }
                        min={ 0 }
                        max={ 100 }
                    />
                </PanelBody>
                <PanelColorSettings
                    title={ __( 'Button Colors' ) }
                    initialOpen={ false }
                    colorSettings={ [
                        {
                            value: btnColor,
                            onChange: ( colorValue ) => setAttributes( { btnColor: colorValue } ),
                            label: __( 'Color' ),
                        },
                        {
                            value: btnBg,
                            onChange: ( colorValue ) => setAttributes( { btnBg: colorValue } ),
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
            <div className={`cta-with-image`} style={{ backgroundColor: containerBg }}>
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
                                allowedBlocks={['core/heading', 'core/paragraph']}
                                template={[
                                    ['core/heading'],
                                    ['core/paragraph']
                                ]}
                                templateLock={ true }
                            />
                        </div>
                        <div className="btn-wrapper">
                            <a href={btnLink} target={`_${tab}`} rel="nofollow noopener" style={{ backgroundColor: btnBg, color: btnColor, borderRadius: btnRadius }}>
                                { btnText }
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default Edit; 