/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

/** @public */
function move ( { clientX, clientY, pageX, pageY } ) {

  const x = clientX || pageX;
  const y = clientY || pageY;

  this.x = x || this.x;
  this.y = y || this.y;

}

/**
 * mouse 
 * @public 
 */

export const Mouse = function () {

  this.x = 0;
  this.y = 0;

  this.move = move.bind( this );

};
