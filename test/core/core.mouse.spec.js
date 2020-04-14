import { Events, Mouse } from 'core';

describe( 'mouse', () => {

  const events = new Events();
  const mouse = new Mouse();

  
  const v1 = {
    x: 700,
    y: 400
  };

  const v2 = {
    x: 0,
    y: 250
  };

  const eventMock = {
    clientX: 700,
    clientY: 400,
    pageX: 700,
    pageY: 400
  };

  describe( 'x', () => {

    it( 'must return', () => {

      expect( () => mouse.move() ).toThrow( TypeError );
 
    } );

  } );

  describe( 'x', () => {

    it( 'must return', () => {

      expect( mouse.move( eventMock ) ).toBeUndefined();
 
    } );

  } );

} );
