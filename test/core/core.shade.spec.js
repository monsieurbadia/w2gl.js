import { Shade } from 'core';

/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

describe( 'core.shader', () => {

  const option = {
    uniforms: {},
    fragment: '',
    vertex: ''
  };

  const THREE = function () {
    function Vector2 () { this.x = 0; this.y = 0; };
    this.Vector2 = Vector2;
  };

  // const shade = new Shade( THREE, option );

  describe( 'compile', () => {

    it.skip( 'must return', () => {

      // expect( shade ).toBe( );

    } );

  } );

} );
