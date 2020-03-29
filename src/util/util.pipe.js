/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

const triggerFunction = ( result, f ) => f( result ); // find explicit name function

export const pipe = ( ...fs ) => options => [ ...fs ].reduce( triggerFunction, options || {} );
