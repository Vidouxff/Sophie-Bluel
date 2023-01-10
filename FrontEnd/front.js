//fonction qui crée un élément "figure" dans la gallerie
/*const createElement = (element) => {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML += `
      <figure class="imageFilter filtre${element.categoryId}">
          <img crossorigin="anonymous" src="${element.imageUrl}" alt="${element.title}">
          <figcaption>${element.title}</figcaption>
      </figure>`;
};*/

const createElement = (element) => {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML += `
      <figure data-tag="${element.category.name}">
          <img crossorigin="anonymous" src="${element.imageUrl}" alt="${element.title}">
          <figcaption>${element.title}</figcaption>
      </figure>`;
};

//forEach
//addEventListener
//Data-
//this this.dataset.tag

//fonction qui va filtrer les photos par leur id
/*function filtre(filtreId) {
  //récupère les photos
  const imageFilter = document.getElementsByClassName("imageFilter");

  //boucle pour vérifier les photos
  for (let i = 0; i < imageFilter.length; i++) {
    //si l'id correspond, la classe "filtered" est enlevé
    if (imageFilter[i].classList.contains(filtreId)) {
      imageFilter[i].classList.remove("filtered");
    }

    //si le bouton "tous" est selectionné, affiche toutes les images
    else if (filtreId == "filtre0") {
      imageFilter[i].classList.remove("filtered");
    }

    //applique la classe "filtered" si l'id ne correspond pas
    else {
      imageFilter[i].classList.add("filtered");
    }
  }
}*/

fetch("http://localhost:5678/api/works")
  //si fetch fonctionne on récupère les données au format JSON
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })

  //récupération de chaque élément et effectue la fonction "createElement" pour chaque élément récupéré
  .then((products) => {
    products.forEach((product) => {
      createElement(product);
    });
  })

  //s'il y a une erreur, va console logger err
  .catch(function (err) {
    console.log(err);
  });

const createButton = (button) => {
  const filtres = document.querySelector("#filtres");
  filtres.insertAdjacentHTML(
    "beforeend",
    `<button data-tag="${button.name}"> ${button.name} </button>`
  );

  const buttons = document.querySelectorAll("nav button");
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      buttons.forEach((element) => element.classList.remove("active"));
      this.classList.add("active");

      const buttonTag = event.target.getAttribute("data-tag");
      const images = document.querySelectorAll(".gallery figure");
      images.forEach((image) => {
        if (image.getAttribute("data-tag") === buttonTag) {
          image.classList.remove("filtered");
        } else {
          image.classList.add("filtered");
        }
      });
    });
  });

  function afficherToutesLesImages() {
    // récupérer toutes les images
    const toutesLesImages = document.querySelectorAll(".gallery figure");

    // pour chaque image, lui ajouter la classe "visible" qui permet de l'afficher
    toutesLesImages.forEach((image) => {
      image.classList.remove("filtered");
    });
  }

  // ajouter un écouteur d'événement "click" sur le bouton "Tous"
  // qui appelle la fonction "afficherToutesLesImages" lorsqu'on clique sur le bouton
  boutonTous.addEventListener("click", afficherToutesLesImages);
};

//le truc au dessus c'est faux, il faut je pense faire : addeventlistener pour chaque bouton, on enlève la classe filtered aux images qui ont la meme data-tag (.getAttribute) que le bouton cliqué, else on active filtered

fetch("http://localhost:5678/api/categories")
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((data) => {
    data.forEach((button) => {
      createButton(button);
    });
  })
  .catch(function (err) {
    console.log(err);
  });

//permet d'ajouter la classe active au bouton "Tous" par défaut
const boutonTous = document.querySelector('button[data-tag="Tous"]');
boutonTous.classList.add("active");
//récupère les boutons

//boucle pour parcourir tout les boutons et ajoute la classe active au bouton cliqué tout en retirant cette classe aux autres boutons

//faire comme au dessus avec forEach, addEventListener et this.classlist pour filtrer par exemple pour chaque bouton, on écoute et si il y a click, on enleve avec this. la classe filtered. Du coup faut mettre dès le depart filtered aux boutons par défaut ou un truc comme ça

//le truc au dessus c'est faux, il faut je pense faire : addeventlistener pour chaque bouton, on enlève la classe filtered aux images qui ont la meme data-tag (.getAttribute) que le bouton cliqué, else on active filtered

//forEach
//addEventListener
//Data-
//this this.dataset.tag
