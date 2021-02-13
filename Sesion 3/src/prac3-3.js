import * as THREE from 'three';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';
import Stats from 'three/examples/jsm/libs/stats.module';
import { WEBGL } from 'three/examples/jsm/WebGL.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { AmbientLight, PointLight } from 'three';

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
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.mouseButtons = {
        LEFT: THREE.MOUSE.ROTATE,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.PAN
    }

    camera.position.set(0, 1, 14);
    controls.update();

    //Creación de objetos geométricos
    //Creación del cubo con BoxGeometry
    const geometrybox = new THREE.BoxGeometry(1, 1, 1);
    const textureLoader = new THREE.TextureLoader();  // The object used to load textures
    const material = new THREE.MeshPhongMaterial(
        {
            map: textureLoader.load("../textures/brick.jpg"),
            bumpMap: textureLoader.load("../textures/brick-map.jpg")
        });
    const box = new THREE.Mesh(geometrybox, material);

    const controlData = {
        bumpScale: material.bumpScale
    }
    
    const gui = new GUI();
    gui.add(controlData, 'bumpScale', -4,4).step(0.1).name('bumpScale');

    const stats = new Stats( );
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    document.body.appendChild( stats.domElement );


    //Rotación del cubo en el espacio
    box.rotation.set(Math.PI / 5, Math.PI / 5, 0);

    const light = new PointLight(0xffffff, 2);
    light.position.set(0, 50, 100);

    //Adición del cubo
    scene.add(box);
    scene.add(light);
    function render() {
        requestAnimationFrame(render);
        box.rotateY(0.001);
        stats.update( );
        material.bumpScale = controlData.bumpScale;
        renderer.render(scene, camera);
    }

    render()

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