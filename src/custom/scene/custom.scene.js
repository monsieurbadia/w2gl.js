import { Scene } from 'three';

import {
  isEmpty,
  reducer
} from 'util';

export class CustomScene extends Scene {

  constructor ( option ) {

    super();

  }

  addMeshes ( meshes ) {

    meshes.forEach( mesh => this.add( mesh ) );

  }

  init ( meshes ) {

    this.addMeshes( meshes );

  }

}

export const createCustomScene = option => {

  const _option = isEmpty( option.scene ) ? { default: {} } : option.scene;

  return {
    ...option,
    scene: reducer( _option, o => new CustomScene( o ) )
  };

};
