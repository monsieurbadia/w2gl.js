import { Camera } from 'three';
import { reducerLoopObject } from '../../reducer/reducer.object';

export class BaseCamera extends Camera {

  constructor ( options ) {
  
    super();
  
    this.options = options;

  }

  init ( positions ) {

    this.position.set( ...positions );

  }

};

export const createBaseCamera = options => ( {
  ...options,
  camera: reducerLoopObject( options.camera, ( option ) => new BaseCamera( option ) )
} );
