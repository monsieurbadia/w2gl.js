import { onresize } from 'event';

/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

describe( 'event', () => {

  describe( 'onresize', () => {

    it( 'must return false if it calls without parameters', () => {

      expect( onresize() ).toStrictEqual( false );

    } );

    it( 'must return false if it calls without parameters', () => {

      expect( onresize( () => {} ) ).not.toBeFalsy();
      expect( onresize( () => {} ) ).toBeGreaterThan( 0 );

    } );

  } );

} );