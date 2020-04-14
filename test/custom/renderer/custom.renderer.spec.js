import { createCustomRendererWebGL } from 'custom';

/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

describe( 'renderer', () => {

  const THREE = {
    Camera: function Camera () {}
  };

  describe( 'createCustomRendererWebGL', () => {

    it( 'must return', () => {

      expect( createCustomRendererWebGL( THREE, {
        current: {
          option: {
            antialias: true,
            pixelRatio: window.devicePixelRatio,
            size: [ window.innerWidth, window.innerHeight ],
          }
        }
      } ) ).toBe(false);

    } );

  } );

} );
