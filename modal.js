
const imgfiles =  {
    'KnebleSkalle': 'KnebleSkalle 2004',
    'Skisse1': 'Postits is the best!',
    'was3': 'Collaborative School Project Streetart 2009',
    'was2': 'Collaborative School Project Streetart 2009'
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
