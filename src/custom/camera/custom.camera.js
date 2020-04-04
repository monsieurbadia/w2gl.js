import {
  isEmpty,
  reducer
} from 'util';

/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

export class CustomCamera {

  constructor ( THREE, option ) {
  
    const camera = new THREE.Camera();

    function init ( positions = [] ) {

      if ( positions.length > 0 ) camera.position.set( ...positions );
  
    }

    Object.assign( camera, { init } );

    return camera;
  
  }

}

export const createCustomCamera = option => {
  
  const _option = isEmpty( option.camera )
    ? {
        current: {
          size: [ window.innerWidth, window.innerHeight ],
          type: 'perspective'
        }
      }
    : option.camera;

  return {
  ...option,
  camera: reducer( _option, o => new CustomCamera( option.THREE, o ) )
  };

};
