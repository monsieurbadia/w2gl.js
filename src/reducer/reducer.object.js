export const reducerLoopObject = 
  ( object, callback ) =>
    Object.keys( object ).reduce( ( result, key ) => ( {
      ...result,
      [ key ]: callback( { ...object[ key ] } )
    } ), {} );
