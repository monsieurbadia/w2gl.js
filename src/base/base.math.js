import {
  Vector2,
  Vector3,
  Vector4
} from 'three';

const MATH_PRIMITIVES = Object.freeze( {
  v2: new Vector2(),
  v3: new Vector3(),
  v4: new Vector4()
} );

const MATH_TYPES = Object.freeze( [
  'v2',
  'v3',
  'v4'
] );

export const MATH = Object.freeze( {
  PRIMITIVES: MATH_PRIMITIVES,
  TYPES: MATH_TYPES
} );
