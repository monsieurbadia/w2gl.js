import {
  Vector2,
  Vector3,
  Vector4
} from 'three';

const VECTOR_PRIMITIVES = Object.freeze( {
  v2: new Vector2(),
  v3: new Vector3(),
  v4: new Vector4()
} );

const VECTOR_TYPES = Object.freeze( [
  'v2',
  'v3',
  'v4'
] );

export const VECTOR = Object.freeze( {
  PRIMITIVES: VECTOR_PRIMITIVES,
  TYPES: VECTOR_TYPES
} );
