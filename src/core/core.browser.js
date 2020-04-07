/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

export class Browser {

  constructor () {

    function webgl () {
  
      let canvas = document.createElementNS( 'http://www.w3.org/1999/xhtml', 'canvas' );
      let gl = null;
      let isWebGL = false;
    
      try {
    
        gl = canvas.getContext( 'experimental-webgl' );

        if ( gl == null ) {

          gl = canvas.getContext( 'webgl' );

        }
        
        isWebGL = true;
    
      } catch ( error ) {
    
        gl = null;
        isWebGL = false;

        console.warn( error );
    
      }
    
      canvas = null;
    
      return gl !== null && isWebGL;

    }

    this.run = {
  
      webgl
  
    };

  }

}
