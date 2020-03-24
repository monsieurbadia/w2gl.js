import { Base } from 'base';

export class Event {

  constructor () {}

  onmousemove ( callback ) {

    if ( callback ) Base.DEFAULT.mousemoveList.push( callback );

    window.addEventListener( 'mousemove', this.mousemove, false );

  }

  onresize ( callback ) {

    if ( callback ) Base.DEFAULT.resizeList.push( callback );

    window.addEventListener( 'resize', this.resize, false );

  }

  mousemove ( event ) {

    Base.DEFAULT.mousemoveList.forEach( mousemove => mousemove( event ) );

  }

  resize ( event ) {

    Base.DEFAULT.resizeList.forEach( resize => resize( event ) );

  }

  clear () {

    window.addEventListener( 'mousemove', this.mousemove, false );
    window.addEventListener( 'resize', this.resize, false );

  }

}
