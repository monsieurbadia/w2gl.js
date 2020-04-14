import { Screen } from '../../src/core/core.screen';

describe( 'screen', () => {

  const screen = new Screen();

  const eventMock = {
    target: {
      innerWidth: 700,
      innerHeight: 400
    },
  };

  describe( 'resize', () => {

    it( 'must return', () => {

      expect( () => screen.resize() ).toThrow( TypeError );

    } );

    it( 'must return', () => {

      expect( screen.resize( eventMock ) ).toBeUndefined();

    } );

  } );

} );
