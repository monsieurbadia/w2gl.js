/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

const render = function () { this.time += this.speed; };

export const Timer = function () {

  this.speed = 0.05;
  this.time = 0;

  return Object.assign( this, { render } );

};
