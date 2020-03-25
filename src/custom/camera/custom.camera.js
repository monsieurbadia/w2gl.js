import { Camera } from 'three';
import { reducer } from 'util';

export class CustomCamera extends Camera {

  constructor ( options ) {
  
    super();
  
  }

  init ( positions = [] ) {

    if ( positions.length > 0 ) this.position.set( ...positions );

  }

}

export const createCustomCamera = options => ( {
  ...options,
  camera: reducer( options.camera, option => new CustomCamera( option ) )
} );
