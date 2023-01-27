const gallery = document.querySelector(".gallery");
//fonction qui crée un élément "figure" dans la gallerie
const createElement = (element) => {
    //on récupère la gallerie

    //on ajoute dans la gallerie une figure
    gallery.innerHTML += `
      <figure data-tag="${element.category.name}" data-id="${element.id}">
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
                buttons.forEach((element) =>
                    element.classList.remove("active")
                );
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
            const toutesLesImages =
                document.querySelectorAll(".gallery figure");
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

    // Appel de la fonction logout après la création du bouton de déconnexion
    logout();
};

const logout = () => {
    // Récupération du bouton "logout"
    const logoutButton = document.getElementById("logoutButton");
    // Ajout d'un addEventListener au clic sur le bouton
    logoutButton.addEventListener("click", () => {
        // Suppression du token de sessionStorage
        sessionStorage.removeItem("token");
        // Redirection vers la page de connexion
        window.location.href = "/login/login.html";
    });
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

document.getElementById("openModal").addEventListener("click", modalOpen);

function modalOpen() {
    if (loggedIn) {
        document.body.insertAdjacentHTML(
            "afterbegin",
            `<aside id="modal">
              <div class="modalWrapper">
              <i class="fa-solid fa-arrow-left" id="backToModal"></i>
              <i id="closeModal" class="fa-solid fa-xmark" ></i>
                <h2 id="galleryTitle">Galerie photo</h2>
                <div id="modalGallery">
                </div>
                <form action="#" method="post" id="addPhotoForm">
                  <div id="sendPhotoContainer">
                    <label class="sendPhotoContent" for="buttonSearchPhoto">
                      <i class="fa-regular fa-image photoIcon"></i>
                    </label>
                    <label for="buttonAddPhoto" id="buttonAddPhotoData">
                      + Ajouter photo
                    <input
                      type="file"
                      id="buttonAddPhoto"
                      accept="image/jpeg,image/png,image/jpg"
                      required/>
                      </label>
                    <label class="sendPhotoContent" id="indicationPhoto">
                      jpg.png: 4mo max
                    </label>
                    <img id="photoShowPreview" alt="votre photo" src="#" />
                  </div>
                  <label>Titre</label>
                  <input type="text" name="Title" id="sendPhotoTitle" required />
                  <label>Catégorie</label>
                  <select id="sendPhotoCategory">
                    <option value="#"></option>
                    <option value="1">Objets</option>
                    <option value="2">Appartements</option>
                    <option value="3">Hôtels & restaurants</option>
                  </select>
                </form>
                <span></span>
                <button id="addPhoto">Ajouter une photo</button>
                <a href="#" id="deleteGallery">Supprimer la galerie</a>
              </div>
            </aside>`
        );

        document
            .getElementById("closeModal")
            .addEventListener("click", closeModal);
        document
            .getElementById("addPhoto")
            .addEventListener("click", ajoutPhotoMode);
        document.getElementById("modal").addEventListener("click", (event) => {
            if (event.target === document.getElementById("modal")) {
                closeModal();
            }
        });

        //fonction qui crée un élément "figure" dans la gallerie
        const createElement = (element) => {
            //on récupère la gallerie
            const modalGallery = document.getElementById("modalGallery");
            //on ajoute dans la gallerie une figure
            modalGallery.innerHTML += `
          <figure data-id="${element.id}" data-tag="${element.category.name} class"figureModalGallery">
            <img crossorigin="anonymous" src="${element.imageUrl}" alt="${element.title}"/>
            <i class="fa-solid fa-arrows-up-down-left-right arrowMove"></i>
            <i class="fa-solid fa-trash-can trashCan" data-id="${element.id}"></i>
            <h4>éditer</h4>
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
                // Ajoute un addEventListener sur tous les boutons de la poubelle
                const trashButtons = document.querySelectorAll(".trashCan");
                trashButtons.forEach((button) => {
                    button.addEventListener("click", (e) =>
                        deleteWork(e.target)
                    );
                });
            })

            //s'il y a une erreur, va console logger err
            .catch((err) => {
                console.log(err);
            });
    }
}

const closeModal = () => {
    document.getElementById("modal").remove();
};

const deleteWork = (element) => {
    // Récupére l'ID du work à supprimer
    const workId = element.dataset.id;
    // Envoie une requête DELETE à l'API pour supprimer le work correspondant
    fetch(`http://localhost:5678/api/works/${workId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${sessionStorage["token"]}`,
        },
    })
        .then((res) => {
            if (res.ok) {
                console.log("L'image à bien été supprimée");
                element.parentNode.remove();

                const galleryFigures = Array.from(
                    gallery.querySelectorAll("figure")
                );
                galleryFigures.forEach((figure) => {
                    if (figure.getAttribute("data-id") === workId) {
                        figure.remove();
                    }
                });
            } else {
                // Si la suppression a échoué, affiche un message d'erreur
                console.error("Erreur lors de la suppression");
            }
        })
        .catch((err) => {
            console.error(err);
        });
};

function ajoutPhotoMode() {
    changeModalContent();
}

function changeModalContent() {
    const addPhotoForm = document.getElementById("addPhotoForm");
    const addPhotoButton = document.getElementById("addPhoto");
    const galleryTitle = document.getElementById("galleryTitle");
    const deleteGallery = document.getElementById("deleteGallery");
    const arrowBack = document.getElementById("backToModal");
    const modalGallery = document.getElementById("modalGallery");
    addPhotoForm.style.display = "flex";
    modalGallery.style.display = "none";
    addPhotoButton.innerHTML = "Valider";
    galleryTitle.innerHTML = "Ajout photo";
    deleteGallery.style.display = "none";
    arrowBack.style.display = "block";
    document
        .getElementById("backToModal")
        .addEventListener("click", backToModal);
}

function backToModal() {
    const addPhotoForm = document.getElementById("addPhotoForm");
    const addPhotoButton = document.getElementById("addPhoto");
    const galleryTitle = document.getElementById("galleryTitle");
    const deleteGallery = document.getElementById("deleteGallery");
    const arrowBack = document.getElementById("backToModal");
    const modalGallery = document.getElementById("modalGallery");
    // Code pour remettre le design à l'état initial
    addPhotoForm.style.display = "none";
    modalGallery.style.display = "grid";
    addPhotoButton.innerHTML = "Ajouter une photo";
    galleryTitle.innerHTML = "Galerie photo";
    deleteGallery.style.display = "block";
    arrowBack.style.display = "none";
}

//utiliser display none etc
