import {
  isEmpty,
  reducer
} from 'util';

/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

export class CustomScene {

  constructor ( THREE, option ) {

    const scene = new THREE.Scene();
    
    const addMeshes = ( meshes ) => meshes.forEach( mesh => scene.add( mesh ) );
    const init = ( meshes ) => scene.addMeshes( meshes );

    return Object.assign( scene, {
      addMeshes,
      init,
    } );

  }

}

export const createCustomScene = option => {

  const _option = isEmpty( option.scene || {} ) ? { current: {} } : option.scene;

  return {
    ...option,
    scene: reducer( _option, o => new CustomScene( option.THREE, o ) )
  };

};
