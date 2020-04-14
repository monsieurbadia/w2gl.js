/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

/** @public */
export const reducer = ( object, f ) =>
  Object.keys( object ).reduce( ( result, key ) => ( {
    ...result,
    [ key ]: f( { ...object[ key ] } )
  } ), {} );
