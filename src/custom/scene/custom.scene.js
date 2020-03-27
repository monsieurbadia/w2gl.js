import {
  isEmpty,
  reducer
} from 'util';

export class CustomScene {

  constructor ( THREE, option ) {

    const scene = new THREE.Scene();
    
    function addMeshes ( meshes ) {

      meshes.forEach( mesh => scene.add( mesh ) );
  
    }
  
    function init ( meshes ) {
  
      scene.addMeshes( meshes );
  
    }

    return Object.assign( scene, {
      addMeshes,
      init,
    } );

  }

}

export const createCustomScene = option => {

  const _option = isEmpty( option.scene ) ? { default: {} } : option.scene;

  return {
    ...option,
    scene: reducer( _option, o => new CustomScene( option.THREE, o ) )
  };

};
