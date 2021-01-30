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
    
    
    //Creación de objetos geométricos
    //Creación del cubo con BoxGeometry
    const geometrybox = new THREE.BoxGeometry( 1, 1, 1 );
    const materialbox = new THREE.MeshBasicMaterial( {color: 0xff0000});
    const box = new THREE.Mesh( geometrybox, materialbox );
    
    //Creación de esferea con Spheregeometry
    const geometrySphere = new THREE.SphereBufferGeometry(1,100,100,0,Math.PI*2,0,Math.PI);
    const materialSphere = new THREE.MeshStandardMaterial( {color: 0x00ff00});
    const sphere = new THREE.Mesh(geometrySphere,materialSphere);
    
    //Creación de cilindro con CylinderGeometry
    const geometryCylinder = new THREE.CylinderGeometry(1,1,2,100);
    const materialCylinder = new THREE.MeshLambertMaterial( {color: 0x0000ff});
    const cylynder = new THREE.Mesh(geometryCylinder,materialCylinder);
    
    //Creacion de una casa con geometría personalizada
    //Custom Geometry
    const geometry = new THREE.Geometry();
    
    //Creamos los vértices que crean la casa
    geometry.vertices.push( new THREE.Vector3(-1,0,0)); //0
    geometry.vertices.push( new THREE.Vector3(1,0,0)); //1
    geometry.vertices.push( new THREE.Vector3(-1,2,0)); //2
    geometry.vertices.push( new THREE.Vector3(1,2,0)); //3
    geometry.vertices.push( new THREE.Vector3(0,3,0)); //4
    
    geometry.vertices.push( new THREE.Vector3(-0.5,0)); //5
    geometry.vertices.push( new THREE.Vector3(0.5,0)); //6
    geometry.vertices.push( new THREE.Vector3(-0.5,0.5)); //7
    geometry.vertices.push( new THREE.Vector3(0.5,0.5)); //8
    
    
    geometry.faces.push( new THREE.Face3( 0,1,2 ) );
    geometry.faces.push( new THREE.Face3( 2,1,3) );
    geometry.faces.push( new THREE.Face3( 3,4,2) );
    
    geometry.computeFaceNormals( );
    
    const materialVector = new THREE.MeshBasicMaterial({color: 0x00ffff})
    const vectors = new THREE.Mesh(geometry,materialVector);
    
    const light = new THREE.PointLight( 0xffffff, 1, 100 );
    light.position.set( 10, 10, 0 );
    
    //Rotar cilindro
    cylynder.rotateX(10);
    //Transladar esfera a la izquierda
    sphere.translateX(3);
    sphere.rotateX(30);
    //Rotación del cubo en el espacio
    box.translateX(-3);
    box.rotation.set( Math.PI / 5, Math.PI / 5, 0 );
    
    vectors.translateY(2);
    
    
    
    //Adición del cubo esfera cilindro casa y luz a la escena con su cámara
    scene.add( box );
    scene.add(sphere);
    scene.add(cylynder);
    scene.add(vectors);
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