/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

export class Mouse {

  constructor () {

    this.x = 0;
    this.y = 0;

    this.mousemove = this.mousemove.bind( this );

  }

  mousemove ( { clientX, clientY, pageX, pageY } ) {

    const x = clientX || pageX;
    const y = clientY || pageY;

    this.set( x, y );

  }

  set ( x, y ) {

    this.x = x;
    this.y = y;

  }

}
