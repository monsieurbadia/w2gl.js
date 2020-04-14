import { Events } from '../../src/core/core.events';

/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

describe( 'events', () => {

  const events = new Events();

  describe( 'onmousemove', () => {

    it( 'must return', () => {

      expect( events.clear() ).toBeUndefined();
      expect( events.init() ).toBeUndefined();
      expect( events.mousemove() ).toBeUndefined();
      expect( events.resize() ).toBeUndefined();

    } );

  } );

} );
