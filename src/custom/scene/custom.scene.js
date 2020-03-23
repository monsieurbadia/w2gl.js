import { Scene } from 'three';
import { reducer } from 'util';

export class CustomScene extends Scene {

  constructor ( options ) {

    super();

  }

  addMeshes ( meshes ) {

    meshes.forEach( mesh => this.add( mesh ) );

  }

  init ( meshes ) {

    this.addMeshes( meshes );

  }

}

export const createCustomScene = options => ( {
  ...options,
  scene: reducer( options.scene, option => new CustomScene( option ) )
} );
