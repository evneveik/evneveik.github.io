import * as THREE from "./three.js";
import {OrbitControls} from "./OrbitControls.js";
import {GLTFLoader} from "./GLTFLoader.js";


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
const canvas = document.querySelector('#c');

var loader = new GLTFLoader();
var renderer = new THREE.WebGLRenderer({canvas});
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

scene.background = new THREE.Color('green');
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(canvas);

function load(click) {

	try {
		obj = scene.getObjectByName('Scene');
		scene.remove(obj);

	} catch (error) {
		console.error(error);
	}
	loader.load(click, function (gltf) {
		scene.add(gltf.scene);
		console.log(dumpObject(gltf.scene).join('\n'));

	}, undefined, function (error) {

		console.error(error);

	});
}

const skyColor = 0xB1E1FF;  // light blue
const groundColor = 0xB97A20;  // brownish orange
const intensity = 1;
const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
scene.add(light);

var controls = new OrbitControls(camera, canvas);
camera.position.set(0, 0, 10);
controls.target.set(0, 0, 0);
controls.update();


function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}
animate();

