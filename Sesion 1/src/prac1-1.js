import { WEBGL } from 'three/examples/jsm/WebGL.js';


if ( WEBGL.isWebGLAvailable() ) {
    document.body.appendChild(document.createTextNode("Webgl Working"));
    console.log("Webgl Enabled");
}
else{
    console.log("Webgl Disabled");
}