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
    
    camera.position.set( 0, 0, 8 );
    
    
    //Creación de objetos geométricos
    //Creación del cubo con BoxGeometry
    const geometrybox = new THREE.BoxGeometry( 1, 1, 1 );
    const materialbox = new THREE.MeshBasicMaterial( {color: 0xff0000});
    const box = new THREE.Mesh( geometrybox, materialbox );
    
    //Rotación del cubo en el espacio
    box.rotation.set( Math.PI / 5, Math.PI / 5, 0 );
    
    //Adición del cubo
    scene.add( box );
    
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