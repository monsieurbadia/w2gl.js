import { EVENT } from 'base';

/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

/** @public */
export const onclear = _ => EVENT.LISTENERS.forEach( listener => window.removeEventListener( listener[ 0 ], listener[ 1 ], false ) );
