import * as THREE from 'three';
import { WEBGL } from 'three/examples/jsm/WebGL.js';

//Webgl Enabled
if (WEBGL.isWebGLAvailable()) {
    document.body.appendChild(document.createTextNode("Webgl Working"));
    console.log("Webgl Enabled");
    //creación de la escena y renderización de WebGL
    const scene = new THREE.Scene();
    const renderer = WEBGL.isWebGLAvailable() ? new THREE.WebGLRenderer({ antialias: true }) : new THREE.CanvasRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //Inicialización de la camara
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 4000);

    camera.position.set(0, 0, 12);


    //Creación de objetos geométricos
    //Creación del cubo con BoxGeometry
    const geometrybox = new THREE.BoxGeometry(1, 1, 1);
    const mapUrl = "../textures/descarga.gif";   // The file used as texture
    const textureLoader = new THREE.TextureLoader();  // The object used to load textures
    const map = textureLoader.load(mapUrl);
    const material = new THREE.MeshBasicMaterial({ map: map });
    const box = new THREE.Mesh(geometrybox, material);

    ( textureLoader ) => { renderer.render( scene, camera ); }
    //Rotación del cubo en el espacio
    box.rotation.set(Math.PI / 5, Math.PI / 5, 0);

    //Adición del cubo
    scene.add(box);

    render()

    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    //settear la ventana para que al reescalarse se vuelva a renderizar la escena
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
    }, false);
}

//Webgl Disabled
else {
    console.log("Webgl Disabled");
}