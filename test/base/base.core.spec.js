import { Base } from 'base';

describe( 'core', () => {

  it.skip( 'must true, if the base object is frozed', () => {

    expect( Object.isFrozen( Base.CORE ) ).toStrictEqual( true );

  } );

} );
