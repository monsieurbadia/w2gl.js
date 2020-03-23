export const Browser = {

  is: {

    webgl () {

      let canvas = document.createElementNS( 'http://www.w3.org/1999/xhtml', 'canvas' );
      let gl = null;
      let isWebGL = false;
    
      try {
    
        gl = canvas.getContext( 'webgl' );
    
      } catch ( error ) {
    
        gl = null;
      
        console.warn( error );
    
      }
    
      canvas = null;
    
      return gl !== null
        ? ( isWebGL = true )
        : ( isWebGL = false );

    }

  }

}
