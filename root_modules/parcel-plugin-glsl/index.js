const TYPES = [
  'glsl',
  'vert',
  'frag',
  'vs',
  'fs'
];

module.exports = function ( bundler ) {

  TYPES.forEach( function ( type ) { bundler.addAssetType( type, require.resolve( './src/GLSLAsset' ) ) } );

};
