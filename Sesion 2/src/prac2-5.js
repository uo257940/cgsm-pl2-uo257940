import * as THREE from 'three';
import { Object3D, RGBA_ASTC_6x5_Format } from 'three';
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

    camera.position.set(0, 1, 14);
    controls.update();


    //Creación de esferea con Spheregeometry
    const geometrySphere = new THREE.SphereBufferGeometry(1, 100, 100, 0, Math.PI * 2, 0, Math.PI);
    const mapUrl = "../textures/descarga2.gif";   // The file used as texture
    const textureLoader = new THREE.TextureLoader();  // The object used to load textures
    const map = textureLoader.load(mapUrl);
    const materialSphere = new THREE.MeshPhongMaterial({ map: map })
    const sphere = new THREE.Mesh(geometrySphere, materialSphere);


    //Creación de la atmósfera
    const geometryAtmosphere = new THREE.SphereBufferGeometry(1.001, 100, 100, 0, Math.PI * 2, 0, Math.PI);
    const mapUrlAtmosphere = "../textures/descarga.png";   // The file used as texture
    const textureLoaderAtmosphere = new THREE.TextureLoader();  // The object used to load textures
    const mapAtmosphere = textureLoaderAtmosphere.load(mapUrlAtmosphere);
    const materialAtmosphere = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: mapAtmosphere, transparent: true })
    const Atmosphere = new THREE.Mesh(geometryAtmosphere, materialAtmosphere);

    //Creación de esferea de la luna
    const geometryMoon = new THREE.SphereBufferGeometry(0.27, 100, 100, 0, Math.PI * 2, 0, Math.PI);
    const moonMapUrl = '../textures/moon.gif';
    const moonMap = textureLoader.load(moonMapUrl, function (loaded) { renderer.render(scene, camera); });
    const materialSphereMoon = new THREE.MeshLambertMaterial({ map: moonMap, color: 0x888888 });
    const moon = new THREE.Mesh(geometryMoon, materialSphereMoon);

    const distance=35;
    // Move the Moon away from the coordinate origin (the Earth)
    // NOT TO SCALE. Real value: Math.sqrt( distance * distance / 2 )
    moon.position.set(Math.sqrt(distance / 2), 0, -Math.sqrt(distance / 2));

    // Rotate the Moon to face visible side to the Earth (tidal locking)
    moon.rotation.y = Math.PI;

    // Moon should rotate around the Earth: an Object3D is needed
    const moonGroup = new Object3D();
    moonGroup.add(moon);

    // The Moon orbit is a bit tilted
    moonGroup.rotation.x = 0.089;

    (textureLoader) => { renderer.render(scene, camera); }


    const light = new THREE.PointLight(0xffffff, 8, 1000);
    light.position.set(500, 1, 0);

    const obj3d = new THREE.Object3D();
    obj3d.add(sphere);
    obj3d.add(Atmosphere);
    obj3d.rotateZ(25);

    scene.add(obj3d);
    scene.add(moon);
    scene.add(light);

    function render() {
        requestAnimationFrame(render);
        obj3d.rotation.y += 0.007;
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