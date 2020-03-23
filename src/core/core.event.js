import { Base } from 'base';

export class Event {

  constructor () {}

  onmousemove ( callback ) {

    if ( callback ) Base.DEFAULT.mousemoveList.push( callback );

    window.addEventListener( 'mousemove', event => {

      Base.DEFAULT.mousemoveList.forEach( mousemove => mousemove( event ) );

    }, false );

  }

  onresize ( callback ) {

    if ( callback ) Base.DEFAULT.resizeList.push( callback );

    window.addEventListener( 'resize', event => {

      Base.DEFAULT.resizeList.forEach( resize => resize( event ) );

    }, false );

  }

}
