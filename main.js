import "./modules/three.js";
import "./modules/OrbitControls.js";
import "./modules/GLTFLoader.js";



const canvas = document.querySelector('#c');
var files = ['Hode', 'Hus', 'brille'];



function createButton(btype, bclass, text) {
    let bn = document.createElement(btype);
    bn.classList.add(bclass);
    // bn.id = 'b' + i.toString();
    bn.innerText = text;
    document.body.appendChild(bn);
}



for(var i = 0; i < files.length; i++) {
    createButton("p", "bn", files[i]);   

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
		
	}, undefined, function (error) {

		console.error(error);

	});
}

var pos = 0;
for(var i = 0; i < knaps.length; i++) {
    knaps[i].style.position = 'absolute';
    if(i == 0) {
	pos = 5;
    } else {
	pos += 5;
    }
    let f = './meshes/' + files[i] + '.glb';
    knaps[i].style.top = pos.toString().concat('%');
    knaps[i].addEventListener('click', function() {
	loadObj(f)
    } );

}

createButton('p', 'cbn', 'back');
var cbn = document.getElementsByClassName('cbn');



cbn[0].addEventListener("click", function(){
    location.href = 'index.html';
});



	

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}
animate();
