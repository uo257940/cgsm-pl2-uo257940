import * as THREE from 'three';
import { EllipseCurve, Object3D, RGBA_ASTC_6x5_Format } from 'three';
import { WEBGL } from 'three/examples/jsm/WebGL.js';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

//Webgl Enabled
if (WEBGL.isWebGLAvailable()) {
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


    //Creación de tierra con Spheregeometry -------------------
    const geometrySphere = new THREE.SphereBufferGeometry(1, 100, 100, 0, Math.PI * 2, 0, Math.PI);
    const mapUrl = "../textures/descarga2.gif";   // The file used as texture
    const textureLoader = new THREE.TextureLoader();  // The object used to load textures
    const map = textureLoader.load(mapUrl);
    const materialSphere = new THREE.MeshPhongMaterial({ map: map })
    const sphere = new THREE.Mesh(geometrySphere, materialSphere);


    //Creación de la atmósfera ----------------------------------
    const geometryAtmosphere = new THREE.SphereBufferGeometry(1.001, 100, 100, 0, Math.PI * 2, 0, Math.PI);
    const mapUrlAtmosphere = "../textures/descarga.png";   // The file used as texture
    const textureLoaderAtmosphere = new THREE.TextureLoader();  // The object used to load textures
    const mapAtmosphere = textureLoaderAtmosphere.load(mapUrlAtmosphere);
    const materialAtmosphere = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: mapAtmosphere, transparent: true })
    const Atmosphere = new THREE.Mesh(geometryAtmosphere, materialAtmosphere);

    //Creación de esferea de la luna ------------------------------
    const geometryMoon = new THREE.SphereBufferGeometry(0.27, 100, 100, 0, Math.PI * 2, 0, Math.PI);
    const moonMapUrl = '../textures/moon.gif';
    const moonMap = textureLoader.load(moonMapUrl, function (loaded) { renderer.render(scene, camera); });
    const materialSphereMoon = new THREE.MeshLambertMaterial({ map: moonMap, color: 0x888888 });
    const moon = new THREE.Mesh(geometryMoon, materialSphereMoon);

    const distance = 35;
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

    // Elipse------------------------
    const curve = new THREE.EllipseCurve(
        0, 0,            // ax, aY
        6, 6                      // aRotation
    );
    const points = curve.getPoints(50);
    const moonelipsegeometry = new THREE.BufferGeometry().setFromPoints(points);
    const materialelipse = new THREE.LineBasicMaterial({ color: 0xff0000 });
    const moonellipse = new THREE.Line(moonelipsegeometry, materialelipse);
    moonellipse.rotateX(300)



    //Definición del sol con su shader
    const NOISEMAP = '../textures/cloud.png';
    const SUNMAP = '../textures/lavatile.jpg';
    const textureLoaderSun = new THREE.TextureLoader();
    const uniforms = {
        "fogDensity": { value: 0 },
        "fogColor": { value: new THREE.Vector3(0, 0, 0) },
        "time": { value: 1.0 },
        "uvScale": { value: new THREE.Vector2(3.0, 1.0) },
        "texture1": { value: textureLoaderSun.load(NOISEMAP) },
        "texture2": { value: textureLoaderSun.load(SUNMAP) }
    };

    uniforms["texture1"].value.wrapS = uniforms["texture1"].value.wrapT = THREE.RepeatWrapping;
    uniforms["texture2"].value.wrapS = uniforms["texture2"].value.wrapT = THREE.RepeatWrapping;

    //Creación del material del shader
    const vertexShader = require('../shaders/vertex.glsl');
    const fragmentShader = require('../shaders/fragment.glsl');

    const materialSun = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader
    });
    //Creación del sol ---------------------------------------
    const geometrySun = new THREE.SphereBufferGeometry(5, 100, 100, 0, Math.PI * 2, 0, Math.PI);
    const Sun = new THREE.Mesh(geometrySun, materialSun);
    Sun.position.set(50, 1, 0);


    //Creación de la Luz
    const light = new THREE.PointLight(0xffffff, 8, 1000);
    light.position.set(50, 1, 0);

    //Importacion del modelo de la ISS
    const modelUrl = "../models/iss.dae";
    var iss;

    const loadingManager = new THREE.LoadingManager(() => {

        scene.add(iss);
        console.log('Model loaded');
    });

    const loader = new ColladaLoader(loadingManager);
    loader.load(modelUrl, (collada) => {
        iss = collada.scene;
        iss.position.set(1,0,1)
        iss.scale.x = iss.scale.y = iss.scale.z = 0.01;
        iss.rotation.set(Math.PI / 5, Math.PI / 5, 0);
        iss.updateMatrix();
    });

    const obj3d = new THREE.Object3D();
    obj3d.add(sphere);
    obj3d.add(Atmosphere);
    obj3d.rotateZ(25);

    scene.add(moonellipse);
    scene.add(obj3d);
    scene.add(moon);
    scene.add(light);
    scene.add(Sun);

    const clock = new THREE.Clock();

    function animate() {
        const delta = clock.getDelta(); // Elapsed time in seconds

        // UPDATE THE SCENE ACCORDING TO THE ELAPSED TIME
        // UPDATE THE SCENE ACCORDING TO THE ELAPSED TIME
        const rotation = (delta * Math.PI * 2) / 24;
        sphere.rotation.y += rotation;
        Atmosphere.rotation.y += rotation * 0.95;        // Render the scene
        const moonrotation = (delta * Math.PI * 2) / 648;

        moon.rotation.y += moonrotation;
        moon.position.set(0, 0, 0);
        moon.translateX(6);
        uniforms["time"].value += 0.01;
        Sun.rotation.y += 0.001;
        renderer.render(scene, camera);
        // Request the browser to execute the animation-rendering loop
        requestAnimationFrame(animate);
    };

    animate();
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