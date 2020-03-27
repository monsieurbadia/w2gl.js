import { Camera } from 'three';

import {
  isEmpty,
  reducer
} from 'util';

export class CustomCamera extends Camera {

  constructor ( option ) {
  
    super();
  
  }

  init ( positions = [] ) {

    if ( positions.length > 0 ) this.position.set( ...positions );

  }

}

export const createCustomCamera = option => {
  
  const _option = isEmpty( option.camera )
    ? {
        default: {
          size: [ window.innerWidth, window.innerHeight ],
          type: 'perspective'
        }
      }
    : option.camera;

  return {
  ...option,
  camera: reducer( _option, o => new CustomCamera( o ) )
  };

};
