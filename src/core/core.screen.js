/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

 /** @public */
const setSize = ( object, [ width, height ] ) => {
  
  object.width = width;
  object.height = height;

};

/** @public */
const resize = function ( { target } ) { setSize( this, [ target.innerWidth, target.innerHeight ] ) };

/**
 * screen
 * @public
 */

export const Screen = function () {

  setSize( this, [ window.innerWidth, window.innerHeight ] )

  return Object.assign( this, { resize } );

};
