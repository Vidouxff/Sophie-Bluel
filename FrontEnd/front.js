//récupère la gallerie
const gallery = document.querySelector(".gallery");

//crée un élément "figure" dans la gallerie
function createElement(element){
  gallery.innerHTML +=`<figure class="imageFilter filtre${element.categoryId}"> <img crossorigin="anonymous" src="${element.imageUrl}" alt="${element.title}"> <figcaption>${element.title}</figcaption> <figure>`
}

//récupère les boutons
const buttons = document.querySelectorAll("button");

//permet d'ajouter la classe active au premier bouton par défaut
buttons[0].classList.add("active");

//boucle pour parcourir tout les boutons et ajoute la classe active au bouton cliqué tout en retirant cette classe aux autres boutons
buttons.forEach(button => {
  button.addEventListener("click", function() {
    buttons.forEach(element => element.classList.remove("active"));
    this.classList.add("active");
  });
});

//fonction qui va filtrer les photos par leur id
function filtre(filtreId){

  //récupère les photos
  const imageFilter = document.getElementsByClassName("imageFilter");

  //boucle pour vérifier les photos
  for(i = 0; i < imageFilter.length; i++){

    //si l'id correspond, la classe "filtered" est enlevé
    if (imageFilter[i].classList.contains(filtreId)){
      imageFilter[i].classList.remove("filtered");
    }

    //si le bouton "tous" est selectionné, affiche toutes les images
    else if (filtreId == "filtre0"){
      imageFilter[i].classList.remove("filtered");
    }

    //applique la classe "filtered" si l'id ne correspond pas
    else {
      imageFilter[i].classList.add("filtered");
    }
  }
}

fetch("http://localhost:5678/api/works")

  //si fetch fonctionne on récupère les données au format JSON
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })

  //récupération de chaque élément et effectue la fonction "createElement" pour chaque élément récupéré
  .then(function(element) {
    for(i = 0; i < element.length; i++){
      createElement(element[i])
    }
  })

  //s'il y a une erreur, va console logger err
  .catch(function(err) {
    console.log(err);
  });