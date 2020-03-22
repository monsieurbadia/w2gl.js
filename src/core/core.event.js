import { EventDispatcher } from 'three';
import { BASE_CONSTANT } from '../base/constant/base.constant';

export class Event extends EventDispatcher {

  constructor () {
    
    super();

  }

  onmousemove ( callback ) {

    if ( callback ) BASE_CONSTANT.mousemoveList.push( callback );

    window.addEventListener( 'mousemove', event => {

      BASE_CONSTANT.mousemoveList.forEach( mousemove => mousemove( event ) );

    }, false );

  }

  onresize ( callback ) {

    if ( callback ) BASE_CONSTANT.resizeList.push( callback );

    window.addEventListener( 'resize', event => {

      BASE_CONSTANT.resizeList.forEach( resize => resize( event ) );

    }, false );

  }

}
