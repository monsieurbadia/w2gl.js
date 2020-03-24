import { Camera, OrthographicCamera } from 'three';
import { reducer } from 'util';

export class CustomCamera extends OrthographicCamera {

  constructor ( options ) {
  
    super(
      -1, // left
      1, // right
      1, // top
     -1, // bottom
     -1, // near,
      1, // far
    );
  
  }

  init ( positions = [] ) {

    if ( positions.length > 0 ) this.position.set( ...positions );

  }

}

export const createCustomCamera = options => ( {
  ...options,
  camera: reducer( options.camera, option => new CustomCamera( option ) )
} );
