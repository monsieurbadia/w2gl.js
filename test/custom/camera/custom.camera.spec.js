import { createCustomCamera } from 'custom';

/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

describe( 'camera', () => {

  describe( 'createCustomCamera', () => {

    const THREE = {
      Camera: function Camera () {}
    };

    it( 'must return', () => {

      const createCustomCameraMock = jest.fn( createCustomCamera );
      
      expect( createCustomCameraMock( THREE, {
        camera: {
          current: {
            size: [ window.innerWidth, window.innerHeight ],
            type: 'perspective'
          }
        }
      } ) ).toBe();

    } );

  } );

} );
  