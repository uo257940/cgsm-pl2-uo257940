import * as THREE from 'three';
import { WEBGL } from 'three/examples/jsm/WebGL.js';

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

    camera.position.set( 0, 0, 10 );
    
    //Creación de objetos geométricos
    //Creación del cubo con BoxGeometry
    const geometrybox = new THREE.BoxGeometry( 1, 1, 1 );
    const materialbox = new THREE.MeshBasicMaterial( {color: 0xff0000});
    const box = new THREE.Mesh( geometrybox, materialbox );
    
    //Creación de esferea con Spheregeometry
    const geometrySphere = new THREE.SphereBufferGeometry(1,100,100,0,Math.PI*2,0,Math.PI);
    const materialSphere = new THREE.MeshBasicMaterial( {color: 0x00ff00});
    const sphere = new THREE.Mesh(geometrySphere,materialSphere);
    
    //Creación de cilindro con CylinderGeometry
    const geometryCylinder = new THREE.CylinderGeometry(1,1,2,100);
    const materialCylinder = new THREE.MeshBasicMaterial( {color: 0x0000ff});
    const cylynder = new THREE.Mesh(geometryCylinder,materialCylinder);
    
    
    //Rotar cilindro
    cylynder.rotateX(10);

    //Transladar esfera a la izquierda
    sphere.translateX(3);
    sphere.rotateX(30);

    //Rotación del cubo en el espacio
    box.translateX(-3);
    box.rotation.set( Math.PI / 5, Math.PI / 5, 0 );
    
    //Adición del cubo esfera cilindro casa y luz a la escena con su cámara
    scene.add( box );
    scene.add(sphere);
    scene.add(cylynder);
    
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