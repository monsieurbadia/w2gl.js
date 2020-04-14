import { Timer } from '../../src/core/core.timer';

describe( 'timer', () => {

  const timer = new Timer();

  describe( 'speed', () => {

    it.skip( 'must initialize the speed property to 0.05', () => {

      expect( timer.speed ).toStrictEqual( 0.05 );

    } );

  } );

  describe( 'time', () => {

    it.skip( 'must initialize the time property to 0', () => {

      expect( timer.time ).toStrictEqual( 0 );

    } );

  } );

  describe( 'render', () => {

    it.skip( 'must contain a render property as a method', () => {

      expect( timer.render() ).toBeUndefined();

    } );

  } );

} );
