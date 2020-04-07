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

    const add = ( element ) => window.document.body.appendChild( element );
  
    const init = ( scene, camera ) => {
  
      rendererWebGL.current = {
        camera,
        scene,
      };
  
      rendererWebGL.setTimerAnimationLoop();
  
    };
  
    const create = ( option ) => {
  
      rendererWebGL.setClearColor( 0x000000 );
      rendererWebGL.setPixelRatio( window.devicePixelRatio );
      rendererWebGL.setSize( ...option.option.size, true );
  
    };
  
    const onresize = ( resize ) => Base.DEFAULT.resizeList.push( resize );
  
    const setTimerAnimationLoop = ( callback ) => {
  
      rendererWebGL.setAnimationLoop( callback !== null ? _ => {
  
        timer.render();
    
        Base.DEFAULT.renderList.forEach( render => render( timer ) );
    
        if ( callback ) callback( timer );
    
        rendererWebGL.render( rendererWebGL.current.scene, rendererWebGL.current.camera );
  
      } : null );
  
    };

    create( option );
    add( rendererWebGL.domElement );
  
    rendererWebGL.onresize = onresize.bind( rendererWebGL );

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
  
  const _option = isEmpty( option.renderer || {} )
    ? {
        current: {
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
