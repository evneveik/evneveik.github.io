function loadObj(click) {

	try {
		obj = scene.getObjectByName('Scene');
		console.log(obj)
		scene.remove(obj);

	} catch (error) {
		console.error(error);
	}
	loader.load(click, function (gltf) {
		scene.add(gltf.scene);

	}, undefined, function (error) {

		console.error(error);

	});
}

 	var bn1 = document.querySelector('#bn1');
	var bn2 = document.querySelector('#bn2');
	bn2.onclick = loadObj('testing28.glb');
	bn1.onclick = loadObj('HodeSculpt.gltf'); 
