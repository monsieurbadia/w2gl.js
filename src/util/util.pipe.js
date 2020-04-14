/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

/** @public */
export const pipe = ( ...fs ) => options => [ ...fs ].reduce( ( result, f ) => f( result ), options || {} );
