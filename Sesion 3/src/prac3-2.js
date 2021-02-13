import * as THREE from 'three';
import { AmbientLight, PointLight, RGBA_ASTC_6x5_Format } from 'three';
import { WEBGL } from 'three/examples/jsm/WebGL.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

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

    camera.position.set(0, 1, 1000);
    controls.update();

    //Start 
    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', () => init(), false);
    function init() {
        var overlay = document.getElementById('overlay');
        overlay.remove()
        // Do stuff
        const video = document.getElementById('video');
        video.play();
    }

    //ADD VIDEO VARS TO VIDEO element on html
    const video = document.getElementById('video')

    const image = document.createElement('canvas');
    image.width = 854;  // Video width
    image.height = 480; // Video height
    const imageContext = image.getContext('2d');
    imageContext.fillStyle = '#000000';
    imageContext.fillRect(0, 0, 854 - 1, 480 - 1);
    const texture = new THREE.Texture(image);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const wall = new THREE.Mesh(new THREE.PlaneGeometry(854, 480, 4, 4), material);
    //Creación de objetos geométricos


    const light = new PointLight(0xffffff, 3);
    light.position.set(5, 3, 0);

    //Adición del cubo
    scene.add(light);
    scene.add(wall);
    function render() {
        requestAnimationFrame(render);
        wall.rotateY(0.001);
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            imageContext.drawImage(video, 0, 0);
            if (texture) texture.needsUpdate = true;
        }
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