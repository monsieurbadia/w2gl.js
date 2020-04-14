import { EVENT } from 'base';

/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

/** @public it adds callbacks relative to the resize event */
export const onresize = f => typeof f === 'function' && EVENT.LIST.resizeList.push( f );
