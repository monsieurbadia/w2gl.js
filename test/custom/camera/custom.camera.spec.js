import { reducer } from '../../../src/util/util.reducer';
import { createCustomCamera } from 'custom';

jest.fn( reducer );
jest.mock( '../../../src/util/util.reducer' );

/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

describe( 'camera', () => {

  it( 'must return', () => {

    // expect(  ).toBeDefined();
    // expect( createCustomCamera ).toBeDefined();

  } );

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
  