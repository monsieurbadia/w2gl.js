import { Scene } from 'three';
import { reducerLoopObject } from '../../reducer/reducer.object';

export class BaseScene extends Scene {

  constructor ( options ) {

    super();

  }

  addMeshes ( meshes ) {

    meshes.forEach( mesh => this.add( mesh ) );

  }

}

export const createBaseScene = options => ( {
  ...options,
  scene: reducerLoopObject( options.scene, ( option ) => new BaseScene( option ) )
} );
