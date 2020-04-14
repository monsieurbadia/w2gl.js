import { onrender } from 'event';

/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

describe( 'event', () => {

  describe( 'onrender', () => {

    it( 'must return false if it calls without parameters', () => {

      expect( onrender() ).toStrictEqual( false );

    } );

    it( 'must return false if it calls without parameters', () => {

      expect( onrender( () => {} ) ).not.toBeFalsy();
      expect( onrender( () => {} ) ).toBeGreaterThan( 0 );

    } );

  } );

} );