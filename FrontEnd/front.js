//fonction qui crée un élément "figure" dans la gallerie
const createElement = (element) => {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML += `
      <figure data-tag="${element.category.name}">
          <img crossorigin="anonymous" src="${element.imageUrl}" alt="${element.title}">
          <figcaption>${element.title}</figcaption>
      </figure>`;
};

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

  const buttons = document.querySelectorAll("#filtres button");
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      buttons.forEach((element) => element.classList.remove("active"));
      this.classList.add("active");

      const buttonTag = this.dataset.tag;
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
    // récupère toutes les images
    const toutesLesImages = document.querySelectorAll(".gallery figure");

    toutesLesImages.forEach((image) => {
      image.classList.remove("filtered");
    });
  }

  boutonTous.addEventListener("click", afficherToutesLesImages);
};

fetch("http://localhost:5678/api/categories")
  //si fetch fonctionne on récupère les données au format JSON
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })

  //récupération de chaque data et effectue la fonction "createButton" pour chaque data récupéré
  .then((data) => {
    data.forEach((button) => {
      createButton(button);
    });
  })

  //s'il y a une erreur, va console logger err
  .catch(function (err) {
    console.log(err);
  });

//permet d'ajouter la classe active au bouton "Tous" par défaut
const boutonTous = document.querySelector('button[data-tag="Tous"]');
boutonTous.classList.add("active");
