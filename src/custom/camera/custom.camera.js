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

    const init = ( positions = [] ) => ( positions.length > 0 ) && camera.position.set( ...positions );

    return Object.assign( camera, { init } );
  
  }

}

export const createCustomCamera = option => {
  
  const _option = isEmpty( option.camera || {} )
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
