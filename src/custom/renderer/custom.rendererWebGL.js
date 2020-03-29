import { Base } from 'base';
import { Timer } from 'core';

import {
  isEmpty,
  reducer
} from 'util';

/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

export class CustomRendererWebGL {

  constructor ( THREE, option ) {

    const rendererWebGL = new THREE.WebGLRenderer( { antialias: true } )
    const timer = new Timer();

    create( option );
    add( rendererWebGL.domElement );

  
    // that method is used into a listener
    rendererWebGL.onresize = onresize.bind( rendererWebGL );

    function add ( element ) {

      window.document.body.appendChild( element );
  
    }
  
    function init ( scene, camera ) {
  
      rendererWebGL.current = {
        camera,
        scene,
      };
  
      rendererWebGL.setTimerAnimationLoop();
  
    }
  
    function create ( option ) {
  
      rendererWebGL.setClearColor( 0x000000 );
      rendererWebGL.setPixelRatio( window.devicePixelRatio );
      rendererWebGL.setSize( ...option.option.size, true );
  
    }
  
    function onresize ( resize ) {
  
      Base.DEFAULT.resizeList.push( resize );
  
    }
  
    function setTimerAnimationLoop ( callback ) {
  
      rendererWebGL.setAnimationLoop( callback !== null ? _ => {
  
        timer.render();
    
        Base.DEFAULT.renderList.forEach( render => render( timer ) );
    
        if ( callback ) callback( timer );
    
        rendererWebGL.render( rendererWebGL.current.scene, rendererWebGL.current.camera );
  
      } : null );
  
    }

    return Object.assign( rendererWebGL, {
      add,
      init,
      create,
      onresize,
      setTimerAnimationLoop
    } );

  }

};

export const createCustomRendererWebGL = option => {
  
  const _option = isEmpty( option.renderer )
    ? {
        default: {
          option: {
            antialias: true,
            pixelRatio: window.devicePixelRatio,
            size: [ window.innerWidth, window.innerHeight ],
          }
        }
      }
    : option.renderer;

  return {
    ...option,
    renderer: reducer( _option, o => new CustomRendererWebGL( option.THREE, o ) )
  };

};
