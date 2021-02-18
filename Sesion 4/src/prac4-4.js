import * as THREE from 'three';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';
import Stats from 'three/examples/jsm/libs/stats.module';
import { WEBGL } from 'three/examples/jsm/WebGL.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';
import { Mesh } from 'three';

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

    const movements = [
        new THREE.Vector3(0, 0, 1),   // Forward
        new THREE.Vector3(1, 0, 1),   // Forward-left
        new THREE.Vector3(1, 0, 0),   // Left
        new THREE.Vector3(1, 0, -1),  // Backward-left
        new THREE.Vector3(0, 0, -1),  // Backward
        new THREE.Vector3(-1, 0, -1), // Backward-right
        new THREE.Vector3(-1, 0, 0),  // Right
        new THREE.Vector3(-1, 0, 1)   // Forward-right
    ];

    const stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);

    const helper = new THREE.GridHelper(500, 10, 0x444444, 0x444444);
    helper.position.y = 0.1;


    //SOUND
    const listener = new THREE.AudioListener();
    camera.add(listener);

    const audioLoader = new THREE.AudioLoader();
    const sound = new THREE.PositionalAudio(listener);
    audioLoader.load("../media/dog.ogg", (buffer) => {
        sound.setBuffer(buffer);
        sound.setRefDistance(20);
        sound.setLoop(true);
        sound.setRolloffFactor(1);
    });



    const audioLoader2 = new THREE.AudioLoader();
    const sound2 = new THREE.PositionalAudio(listener);
    audioLoader2.load("../media/376737_Skullbeatz___Bad_Cat_Maste.ogg", (buffer) => {
        sound2.setBuffer(buffer);
        sound2.setRefDistance(20);
        sound2.setLoop(true);
        sound2.setRolloffFactor(1);
    });


    //Creación de Cubo 1
    const geometrybox = new THREE.BoxGeometry(50, 50, 50);
    const textureLoader = new THREE.TextureLoader();  // The object used to load textures
    const specialFaceMaterial = new THREE.MeshPhongMaterial({
        map: textureLoader.load("../textures/cuboOn.png"),
        bumpMap: textureLoader.load("../textures/cuboOn2.png")

    });
    const specialFaceMaterialOn = new THREE.MeshPhongMaterial({
        map: textureLoader.load("../textures/cajaon.png"),
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

    const materials2 = [
        specialFaceMaterial,
        regularFaceMaterial,
        regularFaceMaterial,
        regularFaceMaterial,
        regularFaceMaterial,
        regularFaceMaterial,
    ];




    const box = new THREE.Mesh(geometrybox, materials);
    box.name = "Box1"
    //Creación de Cubo 1
    const box2 = new THREE.Mesh(geometrybox, materials2);
    box.position.set(100, 25, 0);
    box2.position.set(-100, 25, 0);
    box.rotateY(Math.PI);
    box2.name = "Box2"

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xf0f0f0, 0.6);
    hemiLight.position.set(0, 500, 0);

    //RayCaster
    const rayCaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let intersectedObject = null;

    document.body.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    }, false);


    document.body.addEventListener('keydown', (event) => {

        // Space key code
        const spaceKeyCode = 32;
        //activar audio y cambiar imagen 
        // Space pressed and intersected object 
        if (event.keyCode === spaceKeyCode && intersectedObject) {
            if (intersectedObject.name === "Box1") {
                if (sound.isPlaying === true) {
                    sound.pause();
                    box.material[0] = specialFaceMaterial;
                    box.material.needsUpdate = true;

                }
                else {
                    sound.play();
                    box.material[0] = specialFaceMaterialOn;
                    box.material.needsUpdate = true;
                }
            }

            else if (intersectedObject.name == "Box2") {
                if (sound2.isPlaying === true) {
                    sound2.pause();
                    box2.material[0] = specialFaceMaterial;
                    box2.material.needsUpdate = true;
                }
                else {
                    sound2.play();
                    box2.material[0] = specialFaceMaterialOn;
                    box2.material.needsUpdate = true;
                }
            }
        }
    }, false);




    //Adición del objetos a escena
    scene.add(sound);
    scene.add(box);
    scene.add(box2);
    scene.add(hemiLight);
    scene.add(helper);
    box.add(sound);
    box2.add(sound2);

    //bucle de render
    function render() {
        requestAnimationFrame(render);
        const delta = clock.getDelta();
        controls.update(delta);
        stats.update();

        rayCaster.setFromCamera(mouse, camera);
        // Look for all the intersected objects
        const intersects = rayCaster.intersectObjects(scene.children);
        if (intersects.length > 0) {
            // Sorted by Z (close to the camera)
            if (intersectedObject != intersects[0].object) {
                intersectedObject = intersects[0].object;
            }
        } else {

            intersectedObject = null;
        }

        //Control de coli
        let collisions;
        let direction;
        const distance = 20; // Maximum distance of a collision

        for (let i = 0; i < movements.length; i++) {
            direction= movements[i];

            rayCaster.set(camera.position, direction);
            collisions = rayCaster.intersectObjects(scene.children);
            if (collisions.length > 0 && collisions[0].distance <= distance) {
                console.log("CHOQUE");
                if ( collisions ) {
                    controls.update( -delta );
                }
            }
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