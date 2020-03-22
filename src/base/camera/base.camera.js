import { Camera } from 'three';
import { reducerLoopObject } from '../../reducer/reducer.object';

export class BaseCamera extends Camera {

  constructor ( options ) {
  
    // console.log( options );

    super();
  
  }

};

export const createBaseCamera = options => ( {
  ...options,
  camera: reducerLoopObject( options.camera, ( option ) => new BaseCamera( option ) )
} );
