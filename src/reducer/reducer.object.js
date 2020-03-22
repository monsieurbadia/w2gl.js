export const reducerLoopObject = 
  ( object, callback ) =>
    Object.keys( object ).reduce( ( result, key ) => ( {
      ...result,
      [ key ]: callback( { name: key, ...object[ key ] } )
    } ), {} );
