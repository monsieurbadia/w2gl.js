import { Vector2 } from 'three';
import { BASE_CONSTANT } from '../base/constant/base.constant';

export class Mouse extends Vector2 {

  constructor () {

    super();

    this.x = 0;
    this.y = 0;

    this.mousemove = this.mousemove.bind( this );

  }

  mousemove ( event ) {

    this.x = event.clientX || event.pageX;
    this.y = event.clientY || event.pageY;

  }

}
