import { EVENT } from 'base';
import { onmousemove, onresize } from 'event';

/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

/** @private */
const listeners = [
  [ 'mousemove', mousemove ],
  [ 'resize', resize ],
];

/** @public */
const mousemove = event => EVENT.mousemoveList.forEach( f => f( event ) );

/** @public */
const resize = event => EVENT.resizeList.forEach( f => f( event ) );

/** @public */
const clear = _ => listeners.forEach( listener => window.removeEventListener( listener[ 0 ], listener[ 1 ], false ) );

/** @public */
const start = _ => listeners.forEach( listener => window.addEventListener( listener[ 0 ], listener[ 1 ], false ) );

/**
 * events
 * @public
 */

export const Events = Object.freeze( function () {

  return Object.assign( this, {
    onmousemove,
    onresize,
    start,
    clear,
    mousemove,
    resize
  } );

} );
