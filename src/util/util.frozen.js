export const frozen = ( object ) => {

  Object.keys( object ).forEach( ( key ) => {

    const value = object[ key ];

    object[ key ] = object.hasOwnProperty( key )
      && typeof value === "object"
        ? frozen( value )
        : value;

  } );

  return Object.freeze( object );

}
