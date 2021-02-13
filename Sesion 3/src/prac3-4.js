import * as THREE from 'three';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';
import Stats from 'three/examples/jsm/libs/stats.module';
import { WEBGL } from 'three/examples/jsm/WebGL.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';
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
    const controls = new FirstPersonControls(camera);
    controls.movementSpeed = 70;
    controls.lookSpeed = 0.05;
    controls.noFly = false;
    controls.lookVertical = false;
    const clock = new THREE.Clock();

    camera.position.set(0, 25, 400);



    const stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);

    const helper = new THREE.GridHelper(500, 10, 0x444444, 0x444444);
    helper.position.y = 0.1;

    //Creación de Cubo 1
    const geometrybox = new THREE.BoxGeometry(50, 50, 50);
    const textureLoader = new THREE.TextureLoader();  // The object used to load textures
    const specialFaceMaterial = new THREE.MeshPhongMaterial({
        map: textureLoader.load("../textures/cuboOn.png"),
        bumpMap: textureLoader.load("../textures/cuboOn2.png")

    });
    const regularFaceMaterial = new THREE.MeshPhongMaterial({
        map: textureLoader.load("../textures/brick.jpg"),
        bumpMap: textureLoader.load("../textures/brick-map.jpg")
    });
    const materials = [
        specialFaceMaterial,
        regularFaceMaterial,
        regularFaceMaterial,
        regularFaceMaterial,
        regularFaceMaterial,
        regularFaceMaterial,
    ];



    const box = new THREE.Mesh(geometrybox, materials);

    //Creación de Cubo 1
    const box2 = new THREE.Mesh(geometrybox, materials);
    box.position.set(100, 25, 0);
    box2.position.set(-100, 25, 0);
    box.rotateY(Math.PI);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xf0f0f0, 0.6);
    hemiLight.position.set(0, 500, 0);

    //Adición del cubo
    scene.add(box);
    scene.add(box2);
    scene.add(hemiLight);
    scene.add(helper);
    function render() {
        requestAnimationFrame(render);
        const delta = clock.getDelta();
        controls.update(delta);
        stats.update();
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