<img src="../images/w2gl-logo-standard.png">

# w2gl.js [![NPM Package][npm]][npm-url] [![Build Size][build-size]][build-size-url] [![NPM Downloads][npm-downloads]][npmtrends-url] [![Dev Dependencies][dev-dependencies]][dev-dependencies-url]

> *une micro-librarie javascript basé sur [three.js](https://threejs.org) qui t'aidera à initialiser tes shaders plus facilement.*

[anglais](../README.md) - [français](./documentation.readme.fr.md)

## Probleme❓

*pour réaliser un film, un réalisateur a besoin de 3 choses: une scène, une caméra ainsi qu'un moniteur de contrôle. C'est exactement la même chose dans l'univers des shaders. Mais implémenter du webgl nativement n'est pas une tâche facile. Puis ce n'est vraiment pas évident de maintenir du code propre avec cette api. Heureusement, de nouvelles bibliothèques ont dores et déjà résolues cette problématique. Merci à eux ! Même si il est devenu plus facile de créer des shaders en webgl grâce à ces bibliothèques, on doit toujours redéfinir les mêmes instructions avant de pouvoir nous amuser avec nos shaders.*

### three.js

```html
<!-- source https://thebookofshaders.com/04/ -->
<body>
  <div id="container"></div>
  <script src="js/three.min.js"></script>
  <script id="vertexShader" type="x-shader/x-vertex">
    void main () {
      gl_Position = vec4( position, 1.0 );
    }
  </script>
  <script id="fragmentShader" type="x-shader/x-fragment">
    uniform vec2 u_resolution;
    uniform float u_time;

    void main () {
      vec2 st = gl_FragCoord.xy/u_resolution.xy;
      gl_FragColor=vec4( st.x, st.y, 0.0, 1.0 );
    }
  </script>
  <script>
    var container;
    var camera, scene, renderer;
    var uniforms;

    init();
    animate();

    function init() {
      container = document.getElementById( 'container' );

      camera = new THREE.Camera();
      camera.position.z = 1;

      scene = new THREE.Scene();

      var geometry = new THREE.PlaneBufferGeometry( 2, 2 );

      uniforms = {
        u_time: { type: "f", value: 1.0 },
        u_resolution: { type: "v2", value: new THREE.Vector2() },
        u_mouse: { type: "v2", value: new THREE.Vector2() }
      };

      var material = new THREE.ShaderMaterial( {
        uniforms: uniforms,
        vertexShader: document.getElementById( 'vertexShader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentShader' ).textContent
      } );

      var mesh = new THREE.Mesh( geometry, material );
      scene.add( mesh );

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio( window.devicePixelRatio );

      container.appendChild( renderer.domElement );

      onWindowResize();
      window.addEventListener( 'resize', onWindowResize, false );

      document.onmousemove = function(e){
        uniforms.u_mouse.value.x = e.pageX
        uniforms.u_mouse.value.y = e.pageY
      }
    }

    function onWindowResize( event ) {
      renderer.setSize( window.innerWidth, window.innerHeight );
      uniforms.u_resolution.value.x = renderer.domElement.width;
      uniforms.u_resolution.value.y = renderer.domElement.height;
    }

    function animate() {
      requestAnimationFrame( animate );
      render();
    }

    function render() {
      uniforms.u_time.value += 0.05;
      renderer.render( scene, camera );
    }
```

### Solution❓

*et si tu arrêtais d'implémenter les mêmes instructions pour démarrer un projet à chaque fois. en tant que réalisateur 3d, tu vas avoir besoin d'assistance, tu as besoin d'un gars sûr qui va assurer tes arrières, qui s'occupera de faire les tâches ennuyantes que tu ne souhaite plus répéter. ce gars c'est peut être **w2gl**. écrit en javascript cette micro-librairie basé sur les librairies de moteur 3d te permettra de t'amuser rapidement avec l'univers obscur des shaders. A savoir que **w2gl** n'est pas là pour remplacer le rôle de ces librairies, c'est une petite surcouche à ces librairies qui va justement préparer ta scène 3d et te donner quelques super pouvoirs à travers un objet `starter`.*

### w2gl.js

```js
const starter = w2gl.init( {
  THREE,
  shader: {
    myShaderName : {
      vertex: `
        void main () {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragment: `
        uniform vec2 resolution;
        uniform float time;

        void main () {
          vec2 st = gl_FragCoord.xy / resolution.xy;
          gl_FragColor=vec4(st.x, st.y, 0.0, 1.0);
        }
      `
    }
  }
} );

starter.events.onresize( starter.screen.resize );
starter.events.onmousemove( starter.mouse.move );
```

## ⚠️ Avertissement

Je ne suis pas un développeur, je suis juste un gars normal qui aime la programmation avec l'envie d'en apprendre d'avantage sur le côté obscur de la force. Dernier points, des changements seront à venir dans le futur pour le bien de tous, je l'espère.

## 📦 Installation

### Terminal

```sh
npm i w2gl
```

OR

```sh
yarn add w2gl
```

### Téléchargement

tu peux aussi télécharger le projet, après récupère le fichier dans `dist/w2gl.js` et ensuite ajoute-le dans le dossier de ton projet dans lequel tu y stockes les librairies externes à ton développement.

## 🚀 Démarrer le projet

est-ce que tu cherches à créer une scène rapidement ? Si ta réponse est oui, tu devrais essayer ça !

### 1. es6

```js
import * as THREE from 'three';
import w2gl from 'w2gl';
import vertex from './shader/vertex.fs';
import fragment from './shader/fragment.fs';

// 1. une première possibilité pour obtenir l'objet starter fourni par le résultat de la méthode init
const starter = w2gl.init( { THREE, shader: { myShaderName : { vertex, fragment } } } );

console.log( starter ); // <-- et hop! w2gl est disponible

// 2. et une seconde possibilité, pour obtenir l'objet starter fourni par la fonction de rappel passer en second argument de la méthod init
w2gl.init( { THREE, shader: { myShaderName : { vertex, fragment } } }, starter => {

  console.log( starter ); // <-- voilà! w2gl est disponible et scopé

} );
```

### 2. html/javascript

```html
<script src="./src/three.js"></script>
<script src="./src/w2gl.js"></script>

<script id="vertexShader" type="x-shader/x-vertex">
  void main () {
    gl_Position = vec4( position, 1.0 );
  }
</script>

<script id="fragmentShader" type="x-shader/x-fragment">
  uniform vec2 resolution;
  uniform float time;

  void main () {
    vec2 st = gl_FragCoord.xy/resolution.xy;
    gl_FragColor=vec4( st.x, st.y, 0.0, 1.0 );
  }
</script>

<script>
  // 1. une première possibilité pour obtenir l'objet starter fourni par le résultat de la méthode init
  var starter = w2gl.init( {
    THREE: THREE,
    shader: {
      vertex: document.getElementById( 'vertexShader' ).innerHTML,
      fragment: document.getElementById( 'fragmentShader' ).innerHTML
    }
  } );

  console.log( starter ); // <-- et hop! w2gl est disponible

  // 2. et une seconde possibilité, pour obtenir l'object starter founi par la fonction de rappel passer en second argument de la méthod init
  var starter = w2gl.init( {
    THREE: THREE,
    shader: {
      vertex: document.getElementById( 'vertexShader' ).innerHTML,
      fragment: document.getElementById( 'fragmentShader' ).innerHTML
    } 
  }, starter => {
  
    console.log( starter ); // <-- voilà! w2gl est disponible et scopé
  
  } );
</script>
```

## 📖 API

- ### `.init( option )`

  la methode `init` prend en argument d'entrée : `option`.

  ##### paramètres

  `option` **{ Object }**: collection.
  `returns` **{ Object|Function }**: l'object `starter`.

  ##### exemple

  [voir le schema de l'objet `option`](./documentation/documentation.option.md)

- ### `starter`

  c'est une collection de méthode qui va t'aider durant le développement de tes shaders. Il contient tout ce dont tu as besoin pour te concentrer sur ta tâche principale.

  ##### exemple

  ```js
  {
    THREE: {ACESFilmicToneMapping: 5, AddEquation: 100, AddOperation: 2, AdditiveBlending: 2, AlphaFormat: 1021, …}
    shader: {myShaderName: S}
    scene: {current: ob}
    camera: {current: db}
    renderer: {current: og}
    events: {onmousemove: ƒ, onresize: ƒ, clear: ƒ, init: ƒ, mousemove: ƒ, …}
    mouse: X {x: 5, y: 382, move: ƒ}
    screen: ea {width: 1306, height: 460, resize: ƒ}
  }
  ```

  - #### `.shader`

    l'objet `shader`retourne `THREE.Mesh()` créer à partir de `PlaneBufferGeometry` et `ShaderMaterial`. C'est celui-ci qui contient ton vertex shader et ton fragment shader ainsi que les uniforms.

    ##### uniforms

    pour gagner du temps, j'ai déjà implémenté des uniforms basiques.

    ##### exemple

    ```glsl
    // fragmentShader.fs || vertexShader.vs

    uniform vec2 mouse;
    uniform vec2 resolution;
    uniform float time;
    ```


    ```js
    // index.js
    starter.shader.myShaderName.material.uniforms

    /* output:

    {
      mouse: {type: "v2", value: new THREE.Vector2()}
      resolution: {type: "v2", value: new THREE.Vector2()}
      time: {type: "f", value: 0.0}
    }

    */
    ```

  - #### `.scene`

    l'objet scene retourne `THREE.Scene()`. Cette scene est l'espace 3d dans laquelle se trouvera ton mesh.

  - #### `.camera`

    l'objet scene retourne `THREE.Camera()`. Une camera basique sans artifice que tu n'as pas besoin d'initialiser.

  - #### `.renderer`

    l'objet scene retourne `THREE.WebGLRenderer()`. Je l'ai un peu custom du coup, pour qu'il puisse incrémenter la valeur de `timer.time` au sein de la boucle de rendu.

  - #### `.events`

    je t'ai mis à disposition des méthodes que tu peux utiliser comme des écouteurs d'évènement afin de mettre à jour ta scène. En effet chacune de ces méthodes sont exécutés dans l'écouteur d'évenèment correspondant à son nom.

    - #### `onmousemove( f )`

      cette méthode est appelé lorsque la souris est en mouvement sur l'écran. Tu peux récupréer l'object `window` directement pour ensuite mettre a jour ton fragment shader seulement lorsqu'un mouvement de la souris est détecté.   

      ##### paramètres

      `f` **{ Function }**: callback.
      `returns` **{ Void }**: undefined.

      ##### explication

      `onmousemove` => éxécuter dans la callback de l'écouteur d'évenement `window.addEventListener( 'mousemove', _ => {}, false )`    

      ##### exemple

      ```js
      starter.shader.myShaderName.onmousemove( event => {

        starter.shader.myShaderName.material.uniforms.mouse.value.x = event.clientX;
        starter.shader.myShaderName.material.uniforms.mouse.value.y = event.clientY;

      } );
      ```

    - #### `onrender( f )`

      cette méthode est éxécutée dans une `requestAnimationFrame`. `onrender` est appelée avec comme argument d'entrée un objet `timer` qui va te permettre de mettre à jour ton fragment shader.    

      ##### paramètres

      `f` **{ Function }**: callback.
      `returns` **{ Void }**: undefined.

      ##### explication

      `onrender` => éxécuté dans la méthode `setAnimationLoop`       

      ##### exemple

      ```js
      starter.shader.myShaderName.onrender( timer => {

        starter.shader.myShaderName.material.uniforms.time.value += timer.time;

      } );
      ```

    - #### `onresize( f )`

      cette méthode est appelé lorsque les dimensions de vos écrans ont changés, un argument event lui est passé en argument que tu peux utiliser pour mettre à jour la résolution de ton fragment shader seulement lorsqu'un changement d'écran a été détecté.   

      ##### paramètres

      `f` **{ Function }**: callback.
      `returns` **{ Void }**: undefined.

      ##### explication

      `onresize` => éxécuter dans la callback de `window.addEventListener( 'resize', _ => {}, false );`    

      ##### exemple

      ```js
      starter.renderer.current.onresize( event => {

        starter.renderer.current.setSize( event.target.innerWidth, event.target.innerHeight );

      } );
      ```

  - #### `.mouse`

    contient `new Mouse()` qui n'est rien d'autre qu'un simple vecteur à deux dimensions. comme ça tu n'as plus besoin de l'implémenter. Il est accesible via l'objet `starter`. une fois initialisé. Tu auras accès à ses positions `x`, `y`.

    ##### exemple

    ```js
    starter.mouse

    // output {x: 0, y: 0, move: ƒ}

    starter.events.onmousemove( starter.mouse.move );

    // la souris est initialisé pour se mettre à jour a chaque fois que l'évènement onmousemove sera appelé.
    ```

  - #### `.screen`

    contient `new Screen()`, il contient les dimensions de l'écran ainsi qu'une méthode `resize` appelé en argument la méthode `starter.events.onresize`.

    ##### exemple

    ```js
    starter.screen

    // output {width: 343, height: 811, resize: ƒ}

    starter.events.onresize( starter.screen.resize ); 

    // l'écran est initialisé pour se mettre à chaque à chaque fois que l'évènement onresize est appelé.
    ```

## 🚨 Tests

### Running

**reports**

```sh
npm run test:reports
```

OR

```sh
yarn test:reports
```

**watch**

```sh
npm run test:watch
```

OR

```sh
yarn test:watch
```

## 📝 Todo

- [ ] supporter les glsl #include
- [ ] ajouter plus d'évènements
- [ ] documentation
- [x] mode par défaut
- [ ] améliorer les cas de tests

## 📁 Source

- [WebGL best practices](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices)
- [three.js documentation](https://threejs.org/docs/index.html)

## ©️ License

Copyright ©️ 2019 monsieurbadia

Released under the [MIT](https://github.com/monsieurbadia/glsl-reports/blob/master/LICENSE.md) license

## 🙏 Supports

logo par [@mllemartins](https://twitter.com/mllemartins) avec 🖤    
code par [@monsieurbadia](https://twitter.com/monsieurbadia) avec 🖤    

*si ce projet t'as aidé ou simplement parce que t'es une personne dans le turfu ! n'hésites pas à mettre une ⭐️ pour m'encourager dans mes efforts.*   

[npm]: https://img.shields.io/npm/v/w2gl
[npm-url]: https://www.npmjs.com/package/w2gl
[build-size]: https://badgen.net/bundlephobia/minzip/w2gl
[build-size-url]: https://bundlephobia.com/result?p=w2gl
[npm-downloads]: https://img.shields.io/npm/dw/w2gl
[npmtrends-url]: https://www.npmtrends.com/w2gl
[dev-dependencies]: https://img.shields.io/david/dev/monsieurbadia/w2gl.js
[dev-dependencies-url]: https://david-dm.org/monsieurbadia/w2gl.js#info=devDependencies
