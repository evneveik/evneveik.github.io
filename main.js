import "./modules/three.js";
import "./modules/OrbitControls.js";
import "./modules/GLTFLoader.js";
// import { readdirSync } from 'fs';
const canvas = document.querySelector('#c');
var files = ['Hode','Hus'];
for(var i = 0; i < files.length; i++){
    // i += 1;
    let bn = document.createElement("button");
    bn.classList.add('bn');
    bn.id = 'b' + i.toString();
    bn.innerText = files[i];
    document.body.appendChild(bn);
}


var knaps = document.getElementsByClassName("bn");





const loader = new THREE.GLTFLoader();
const renderer = new THREE.WebGLRenderer({canvas});
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const bgloader = new THREE.CubeTextureLoader();
const texture = bgloader.load([
	    'skyboxes/pos-x.jpg',
	    'skyboxes/neg-x.jpg',
	    'skyboxes/pos-y.jpg',
	    'skyboxes/neg-y.jpg',
	    'skyboxes/pos-z.jpg',
	    'skyboxes/neg-z.jpg',
	  ]);

scene.background = texture;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(canvas);



const skyColor = 0xB1E1FF;  // light blue
const groundColor = 0xB97A20;  // brownish orange
const intensity = 1;
const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
scene.add(light);

let controls = new THREE.OrbitControls(camera, canvas);
camera.position.set(0, 0, 10);
controls.target.set(0, 0, 0);
controls.enablePan = false;
controls.update();


function dumpObject(obj, lines = [], isLast = true, prefix = '') { 
	    const localPrefix = isLast ? '└─' : '├─';
	    lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);
	    const newPrefix = prefix + (isLast ? '  ' : '│ ');
	    const lastNdx = obj.children.length - 1;
	    obj.children.forEach((child, ndx) => {
	    const isLast = ndx === lastNdx;
	    dumpObject(child, lines, isLast, newPrefix);
	    });
	    return lines;
}



// let bn1 = document.getElementById('bn1');
// let bn2 = document.getElementById('bn2');

// bn2.onclick = loadObj('Hus.glb');
// bn1.onclick = loadObj('Hode.glb');


function loadObj(c) {

	try {
		let obj = scene.getObjectByName('Scene');
		scene.remove(obj);

	} catch (error) {
		console.error(error);
	}
	loader.load(c, function (gltf) {
		let root = gltf.scene;
		scene.add(root);
		console.log(dumpObject(gltf.scene).join('\n'));
		
	}, undefined, function (error) {

		console.error(error);

	});
}

var pos = 0;
for(let i = 0; i < knaps.length; i++) {
    knaps[i].style.position = 'absolute';
    if(i == 0) {
	pos = 8;
    } else {
	pos += 8;
    }
    knaps[i].style.top = pos.toString().concat('%');
    knaps[i].addEventListener('click', function() {
	loadObj('./meshes/' + files[i] + '.glb')
    } );

}
	

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}
animate();

 

