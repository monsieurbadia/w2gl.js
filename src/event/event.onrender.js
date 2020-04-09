import { EVENT } from 'base';

/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

/** @public */
export const onrender = f => typeof f === 'function' && EVENT.LIST.renderList.push( f );
