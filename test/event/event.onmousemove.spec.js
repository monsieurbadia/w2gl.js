import { onmousemove } from 'event';

/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

describe( 'event', () => {

  describe( 'onmousemove', () => {

    it( 'must return false if it calls without parameters', () => {

      expect( onmousemove() ).toStrictEqual( false );

    } );

    it( 'must return false if it calls without parameters', () => {

      expect( onmousemove( () => {} ) ).toStrictEqual( expect.any( Number ) );
      expect( onmousemove( () => {} ) ).toBeGreaterThan( 0 );

    } );

  } );

} );
