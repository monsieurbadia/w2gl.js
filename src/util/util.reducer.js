export const reducer = ( object, callback ) =>
  Object.keys( object ).reduce( ( result, key ) => ( {
    ...result,
    [ key ]: callback( { ...object[ key ] } )
  } ), {} );
