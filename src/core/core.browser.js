/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

/** @public */
const webgl = () => {

  let canvas = document.createElementNS( 'http://www.w3.org/1999/xhtml', 'canvas' );
  let gl = null;
  let isWebGL = false;

  try {

    gl = canvas.getContext( 'experimental-webgl' );

    if ( gl === null ) gl = canvas.getContext( 'webgl' );
    
    isWebGL = true;

  } catch ( error ) {

    gl = null;
    isWebGL = false;

  }

  canvas = null;

  return gl !== null && isWebGL;

};

/** @public */
export const Browser = Object.freeze( function () {
  
  return Object.assign( this, { run: { webgl } } );

} );
