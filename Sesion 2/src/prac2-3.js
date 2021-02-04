import * as THREE from 'three';
import { RGBA_ASTC_6x5_Format } from 'three';
import { WEBGL } from 'three/examples/jsm/WebGL.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

//Webgl Enabled
if ( WEBGL.isWebGLAvailable() ) {
    document.body.appendChild(document.createTextNode("Webgl Working"));
    console.log("Webgl Enabled");
    //creación de la escena y renderización de WebGL
    const scene = new THREE.Scene();
    const renderer = WEBGL.isWebGLAvailable() ? new THREE.WebGLRenderer( {antialias: true} ) : new THREE.CanvasRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    //Inicialización de la camara
    const camera = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 1, 4000 );
    const controls = new OrbitControls( camera, renderer.domElement );
    controls.mouseButtons = {
        LEFT: THREE.MOUSE.ROTATE,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.PAN
    }
    
    camera.position.set( 0, 1, 14 );
    controls.update();
    
    
    //Creación de esferea con Spheregeometry
    const geometrySphere = new THREE.SphereBufferGeometry(1,100,100,0,Math.PI*2,0,Math.PI);
    const mapUrl = "../textures/descarga2.gif";   // The file used as texture
    const textureLoader = new THREE.TextureLoader();  // The object used to load textures
    const map = textureLoader.load(mapUrl);
    const materialSphere = new THREE.MeshPhongMaterial({map: map})
    const sphere = new THREE.Mesh(geometrySphere,materialSphere);

        
    //Creación de la atmósfera
    const geometryAtmosphere = new THREE.SphereBufferGeometry(1.001,100,100,0,Math.PI*2,0,Math.PI);
    const mapUrlAtmosphere = "../textures/descarga.png";   // The file used as texture
    const textureLoaderAtmosphere = new THREE.TextureLoader();  // The object used to load textures
    const mapAtmosphere = textureLoaderAtmosphere.load(mapUrlAtmosphere);
    const materialAtmosphere = new THREE.MeshLambertMaterial({color: 0xFFFFFF, map: mapAtmosphere, transparent: true})
    const Atmosphere = new THREE.Mesh(geometryAtmosphere,materialAtmosphere);
    
    ( textureLoader ) => { renderer.render( scene, camera ); }


    const light = new THREE.PointLight( 0xffffff, 1, 100 );
    light.position.set( 10, 10, 0 );
    
    
    
    
    //Adición del cubo esfera cilindro casa y luz a la escena con su cámara
    scene.add(sphere);
    scene.add(Atmosphere);
    scene.add( light );
    
    function render(){
        requestAnimationFrame(render);
        renderer.render( scene, camera );
    }
    
    render()
    
    //settear la ventana para que al reescalarse se vuelva a renderizar la escena
    window.addEventListener( 'resize', ( ) => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix( );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.render( scene, camera );
    }, false );
}
    
    //Webgl Disabled
    else{
        console.log("Webgl Disabled");
    }