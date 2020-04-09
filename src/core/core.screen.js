/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

/** @public */
const resize = function ( { target } ) {

  this.width = target.innerWidth;
  this.height = target.innerHeight;

};

/**
 * screen
 * @public
 */

export const Screen = function () {

  this.width = window.innerWidth;
  this.height = window.innerHeight;

  this.resize = resize.bind( this );

};
