//fonction qui crée un élément "figure" dans la gallerie
const createElement = (element) => {
  //on récupère la gallerie
  const gallery = document.querySelector(".gallery");
  //on ajoute dans la gallerie une figure
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
  .catch((err) => {
    console.log(err);
  });

//fonction qui crée un bouton dans la nav #filtres
const createButton = (button) => {
  //on récupère le parent des boutons
  const filtres = document.querySelector("#filtres");
  //on ajoute le bouton
  filtres.insertAdjacentHTML(
    "beforeend",
    `<button data-tag="${button.name}"> ${button.name} </button>`
  );
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

  .then(() => {
    //on récupère les boutons
    const buttons = document.querySelectorAll("#filtres button");
    //pour chaque bouton, si on clique dessus, fais une fonction
    buttons.forEach((button) => {
      button.addEventListener("click", function () {
        //on enlève le classe "active" à tout les boutons
        buttons.forEach((element) => element.classList.remove("active"));
        //on met la classe "active" au bouton cliqué
        this.classList.add("active");

        //on récupère le tag du bouton
        const buttonTag = this.dataset.tag;
        //on récupère les figure faites plus haut
        const images = document.querySelectorAll(".gallery figure");
        //pour chaque figure on fait une fonction
        images.forEach((image) => {
          //si l'image a le même tag que le bouton, on enlève la classe "filtered"
          if (image.getAttribute("data-tag") === buttonTag) {
            image.classList.remove("filtered");
            //on applique la classe "filtered" aux autres qui n'ont pas le même tag
          } else {
            image.classList.add("filtered");
          }
        });
      });
    });

    //fonction qui va afficher toutes les images
    function afficherToutesLesImages() {
      // récupère toutes les images
      const toutesLesImages = document.querySelectorAll(".gallery figure");
      //on enlève la classe "filtered" a chaque images
      toutesLesImages.forEach((image) => {
        image.classList.remove("filtered");
      });
    }
    //quand on clique sur "Tous", va faire la fonction afficherToutesLesImages
    boutonTous.addEventListener("click", afficherToutesLesImages);
  })

  //s'il y a une erreur, va console logger err
  .catch(function (err) {
    console.log(err);
  });

//permet d'ajouter la classe active au bouton "Tous" par défaut
const boutonTous = document.querySelector('button[data-tag="Tous"]');
boutonTous.classList.add("active");

//fonction pour modifier le contenu de l'index.html
const modifierContent = () => {
  //on récupère le body
  const body = document.querySelector("#body");
  //on récupère l'article
  const article = document.querySelector("article");
  //on récupère l'image de Sophie Bluel
  const imgPresentation = document.querySelector("#imgPresentation");
  //on récupère le titre de la gallerie
  const projetsTitle = document.querySelector("#mesProjets");
  //on ajoute la barre au body
  body.insertAdjacentHTML(
    "afterbegin",
    `<div id="editionBarre">
        <span class="edition">
          <i class="fa-regular fa-pen-to-square"></i> Mode édition
        </span>
        <button id="buttonChangement">publier les changements</button>
      </div>`
  );
  //on ajoute le bouton modifier à l'article
  article.insertAdjacentHTML(
    "afterbegin",
    `<a href="#" class="modifier">
      <i class="fa-regular fa-pen-to-square"></i> modifier
    </a>`
  );
  //on ajoute le bouton modifier à l'image
  imgPresentation.insertAdjacentHTML(
    "afterend",
    `<a href="#" class="modifier modifierFigure">
      <i class="fa-regular fa-pen-to-square"></i> modifier
    </a>`
  );
  //on ajoute le bouton modifier au titre de la gallerie
  projetsTitle.insertAdjacentHTML(
    "afterend",
    `<a id="openModal" href="#modal" class="modifier modifierFigure">
      <i class="fa-regular fa-pen-to-square"></i> modifier
    </a>`
  );
  //on récupère le bouton login du menu nav
  document.getElementById(
    "loginButton"
  ).innerHTML = `<a id="logoutButton">logout</a>`; //on remplace login par logout
  //on enlève les filtres
  document.getElementById("filtres").style.display = "none";
};

//fonction pour vérifier si on est connecté

const loggedIn = () => {
  //on récupère le token
  const token = sessionStorage.getItem("token");

  //si la valeur de token est null, on renvoie 0
  if (!token) {
    return 0;
    //sinon, on fait la fonction modifierContent
  } else if (token) {
    modifierContent();
  }
};
loggedIn();

//fonction qui permet de supprimer le token quand on appuie sur logout et donc déconnecte l'utilisateur
const logout = () => {
  // Récupération du bouton "logout"
  const logoutButton = document.getElementById("logoutButton");
  // Ajout d'un écouteur d'événement au clic sur le bouton
  logoutButton.addEventListener("click", () => {
    // Suppression du token de sessionStorage
    sessionStorage.removeItem("token");
    // Redirection vers la page de connexion
    window.location.href = "login.html";
  });
};
logout();

document.getElementById("openModal").addEventListener("click", () => {
  document.body.insertAdjacentHTML(
    "afterbegin",
    `<aside id="modal">
      <div id="closeModal"></div>
      <div class="modalWrapper">
        <h2>Galerie photo</h2>
        <div id="modalGallery">
        </div>
        <span></span>
        <button>Ajouter une photo</button>
        <a href="#">Supprimer la galerie</a>
      </div>
    </aside>`
  );

  //fonction qui crée un élément "figure" dans la gallerie
  const createElement = (element) => {
    //on récupère la gallerie
    const modalGallery = document.getElementById("modalGallery");
    //on ajoute dans la gallerie une figure
    modalGallery.innerHTML += `
    <figure data-tag="${element.category.name}">
      <img crossorigin="anonymous" src="${element.imageUrl}" alt="${element.title}"/>
      <figcaption>Éditer</figcaption>
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
    .catch((err) => {
      console.log(err);
    });
  closeModal();
});

const closeModal = () => {
  const closeButton = document.getElementById("closeModal");
  const modal = document.getElementById("modal");
  if (closeButton) {
    closeButton.addEventListener("click", function () {
      modal.remove();
    });
  }
};
