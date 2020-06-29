
const imgfiles =  {
    'KnebleSkalle': 'KnebleSkalle 2004',
    'Skisse1': 'Postits is the best!',
    'was3': 'Collaborative School Project Streetart 2009',
    'was2': 'Collaborative School Project Streetart 2009',
    'smoky': 'Smoky : Digital 2008',
    'Mique': 'Frontpage design For Mique Catalog',
    'discofro': 'Digital 2009',
    'smoketilupuke': 'Posca on Canvas 2009',
    'teamDisco': 'Coverart for Albino superstars 2008',
    'stylophone' : 'Digital 2010'
    'surveillance_brew': 'Stencil print 2009'
}




for(let [key, value] of Object.entries(imgfiles)) {
    
    // let cr = document.createElement('div'); 
    // cr.classList.add("side-crop");
    // cr.id = key;
    
    let mi = document.createElement("img");
    mi.src = './images/' + key + '.jpg';
    mi.alt = value;
    mi.classList.add('img');
    // document.body.appendChild(cr);
    document.getElementById('images').appendChild(mi);
    
}

var modal = document.getElementById('myModal');
var img = document.getElementsByClassName('img');
var modalImg = document.getElementById("img01");

var captionText = document.getElementById("caption");
console.log(img);
for(var i = 0; i < img.length; i++) {
      img[i].onclick = function(){
      modal.style.display = "block";
      modalImg.src = this.src;
      captionText.innerHTML = this.alt;
    }
}



var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
  modal.style.display = "none";
}

var modal = document.getElementById('myModal');


window.onkeyup = function() {
	// console.log(event.key);
	if(event.key === 'Escape') {
		modal.style.display = "none";
	}
	

}
