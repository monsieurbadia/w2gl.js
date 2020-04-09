/** @public */
export const LIST = Object.freeze( {
  mousemoveList: [],
  renderList: [],
  resizeList: []
} );

/** @public */
const LISTENERS = [
  'mousemove',
  'resize',
];

/** @public */
export const EVENT = Object.freeze( {
  LIST,
  LISTENERS
} );
