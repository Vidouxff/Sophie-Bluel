const token = sessionStorage.getItem("token");
const gallery = document.querySelector(".gallery");

//fonction qui crée un élément "figure" dans la galerie
const createFigureGallery = (element) => {
    const figure = document.createElement("figure");
    figure.setAttribute("data-tag", element.category.name);
    figure.setAttribute("data-id", element.id);

    const img = document.createElement("img");
    img.setAttribute("crossorigin", "anonymous");
    img.setAttribute("src", element.imageUrl);
    img.setAttribute("alt", element.title);

    const figcaption = document.createElement("figcaption");
    figcaption.innerText = element.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);

    gallery.appendChild(figure);
};

fetch("http://localhost:5678/api/works")
    //si fetch fonctionne on récupère les données au format JSON
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
    })

    //récupération de chaque élément et effectue la fonction "createFigureGallery" pour chaque élément récupéré
    .then((products) => {
        products.forEach((product) => {
            createFigureGallery(product);
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
            //récupère toutes les images
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

const logout = () => {
    //suppression du token de sessionStorage
    sessionStorage.removeItem("token");
    //redirection vers la page de connexion
    window.location.href = "/login/login.html";
};

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

    // mise en place de l'event pour openModal
    document.getElementById("openModal").addEventListener("click", modalOpen);
    //appel de la fonction logout après la création du bouton de déconnexion

    //récupération du bouton "logout"
    const logoutButton = document.getElementById("logoutButton");
    //ajout d'un addEventListener au clic sur le bouton
    logoutButton.addEventListener("click", () => {
        logout();
    });
};

if (token !== null) {
    modifierContent();
}

function modalOpen() {
    const modal = `
            <aside id="modal">
                <div class="modalWrapper">
                    <i class="fa-solid fa-arrow-left" id="backToModal"></i>
                    <i id="closeModal" class="fa-solid fa-xmark" ></i>
                    <h2 id="galleryTitle">Galerie photo</h2>
                    <div id="modalGallery"></div>
                    <form action="#" method="post" id="addPhotoForm">
                        <div id="sendPhotoContainer">
                            <label class="sendPhotoContent" for="buttonAddPhoto">
                                <i class="fa-regular fa-image photoIcon"></i>
                            </label>
                            <label for="buttonAddPhoto" id="buttonAddPhotoData" class="sendPhotoContent">
                              + Ajouter photo
                            <input type="file" id="buttonAddPhoto" accept="image/jpeg,image/png,image/jpg" required />
                            </label>
                            <label class="sendPhotoContent" id="indicationPhoto">jpg.png: 4mo max</label>
                            <img id="photoShowPreview" alt="votre photo" src="#" />
                        </div>
                        <label>Titre</label>
                        <input type="text" name="Title" id="sendPhotoTitle" required />
                        <label>Catégorie</label>
                        <select id="sendPhotoCategory">
                            <option value="0"></option>
                            <option value="1">Objets</option>
                            <option value="2">Appartements</option>
                            <option value="3">Hôtels & restaurants</option>
                        </select>
                    </form>
                    <span></span>
                    <button id="addPhoto">Ajouter une photo</button>
                    <button id="valider">Valider</button>
                    <a href="#" id="deleteGallery">Supprimer la galerie</a>
                </div>
            </aside>
        `;
    document.body.insertAdjacentHTML("afterbegin", modal);

    //verifie les changement dans le form
    document
        .getElementById("addPhotoForm")
        .addEventListener("change", verifyData);

    //si le bouton est en couleur (valide), la fonction createNewWork est appellée quand cliqué
    document.getElementById("valider").addEventListener("click", () => {
        if (verifyData) {
            createNewWork();
        }
    });

    //récupère la croix pour fermer la modale
    document.getElementById("closeModal").addEventListener("click", closeModal);

    //récupère le bouton "ajouter une photo" et au clic sur celui-ci fais la fonction ajoutPhotoMode
    document
        .getElementById("addPhoto")
        .addEventListener("click", ajoutPhotoMode);
    document.getElementById("modal").addEventListener("click", (event) => {
        if (event.target === document.getElementById("modal")) {
            closeModal();
        }
    });

    const photoPreview = document.getElementById("buttonAddPhoto");
    photoPreview.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file.size < 4 * 1024 * 1024) {
            //vérifie la taille de l'image
            const photoPreviewBox = document.getElementById("photoShowPreview");
            const fileUrl = URL.createObjectURL(file);
            photoPreviewBox.src = fileUrl;

            const sendPhotoContentElements =
                document.querySelectorAll(".sendPhotoContent");
            for (const element of sendPhotoContentElements) {
                element.style.display = "none";
                photoPreviewBox.style.display = "block";
            }
        } else {
            alert("image trop volumineuse");
        }
    });

    //fonction qui crée un élément "figure" dans la gallerie de la modale
    const createFigureModal = (element) => {
        const modalGallery = document.getElementById("modalGallery");

        const figure = document.createElement("figure");
        figure.setAttribute("data-id", element.id);
        figure.setAttribute("data-tag", element.category.name);
        figure.setAttribute("class", "figureModalGallery");

        const img = document.createElement("img");
        img.setAttribute("class", "imgModalGallery");
        img.setAttribute("crossorigin", "anonymous");
        img.setAttribute("src", element.imageUrl);
        img.setAttribute("alt", element.title);

        const arrowIcon = document.createElement("i");
        arrowIcon.setAttribute(
            "class",
            "fa-solid fa-arrows-up-down-left-right arrowMove"
        );

        const trashIcon = document.createElement("i");
        trashIcon.setAttribute("class", "fa-solid fa-trash-can trashCan");
        trashIcon.setAttribute("data-id", element.id);

        const h4 = document.createElement("h4");
        h4.innerText = "éditer";

        figure.appendChild(img);
        figure.appendChild(arrowIcon);
        figure.appendChild(trashIcon);
        figure.appendChild(h4);

        modalGallery.appendChild(figure);
    };

    fetch("http://localhost:5678/api/works")
        //si fetch fonctionne on récupère les données au format JSON
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })

        //récupération de chaque élément et effectue la fonction "createFigureModal" pour chaque élément récupéré
        .then((products) => {
            products.forEach((product) => {
                createFigureModal(product);
            });
            //ajoute un addEventListener sur tous les icones corbeille
            const trashButtons = document.querySelectorAll(".trashCan");
            trashButtons.forEach((button) => {
                button.addEventListener("click", (e) => deleteWork(e.target));
            });
        })

        //s'il y a une erreur, va console logger err
        .catch((err) => {
            console.log(err);
        });
}

const closeModal = () => {
    document.getElementById("modal").remove();
};

const deleteWork = (element) => {
    const workId = element.dataset.id;
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
                Array.from(gallery.querySelectorAll("figure")).forEach(
                    (figure) => {
                        if (figure.getAttribute("data-id") === workId) {
                            figure.remove();
                        }
                    }
                );
            } else {
                //si la suppression a échoué, affiche un message d'erreur
                console.error("Une erreur est survenue lors de la suppression");
            }
        })
        .catch((err) => {
            console.error(err);
        });
};

const ajoutPhotoMode = () => {
    changeModalContent();
};

const changeModalContent = () => {
    document.getElementById("addPhotoForm").style.display = "flex";
    document.getElementById("modalGallery").style.display = "none";
    document.getElementById("addPhoto").style.display = "none";
    document.getElementById("valider").style.display = "block";
    document.getElementById("galleryTitle").innerHTML = "Ajout photo";
    document.getElementById("deleteGallery").style.display = "none";
    document.getElementById("backToModal").style.display = "block";
    document
        .getElementById("backToModal")
        .addEventListener("click", backToModal);
};

const backToModal = () => {
    document.getElementById("addPhotoForm").style.display = "none";
    document.getElementById("modalGallery").style.display = "grid";
    document.getElementById("addPhoto").style.display = "block";
    document.getElementById("valider").style.display = "none";
    document.getElementById("galleryTitle").innerHTML = "Galerie photo";
    document.getElementById("deleteGallery").style.display = "block";
    document.getElementById("backToModal").style.display = "none";
};

//fonction qui va vérifier si les datas rentrées dans le formulaire sont correctes
const verifyData = () => {
    const buttonCheck = document.getElementById("valider");
    const newPhoto = document.getElementById("buttonAddPhoto");
    const newTitle = document.getElementById("sendPhotoTitle");
    const selectElement = document.getElementById("sendPhotoCategory");
    //si les 3 champs à remplir sont completés on met le background en couleur
    if (
        newPhoto.value !== "" &&
        newTitle.value !== "" &&
        selectElement.value !== "0"
    ) {
        let error = document.querySelector("p#error");
        if (error) {
            error.remove();
        }
        buttonCheck.style.backgroundColor = "#1D6154";
        return true;
        //sinon on le laisse en gris
    } else {
        buttonCheck.style.backgroundColor = "#A7A7A7";
        return false;
    }
};

const createNewWork = () => {
    //crée la nouvelle image
    const data = new FormData();
    const buttonCheck = document.getElementById("valider");
    const newPhoto = document.getElementById("buttonAddPhoto");
    const newTitle = document.getElementById("sendPhotoTitle");
    const newCategory = document.getElementById("sendPhotoCategory");
    data.append("image", newPhoto.files[0]);
    data.append("title", newTitle.value);
    data.append("category", newCategory.value);

    fetch(
        "http://localhost:5678/api/works", //envoie une requête à l'api pour crée une nouvelle image
        {
            method: "POST",
            accept: "application/json",
            headers: {
                Authorization: `Bearer ${sessionStorage["token"]}`,
            },
            body: data,
        }
    )
        .then((res) => {
            if (res.ok) {
                addDynamicWork();
                alert("Projet ajouté !");
            } else {
                let error = document.querySelector("p#error");
                if (error) {
                    error.parentNode.removeChild(error);
                }
                buttonCheck.insertAdjacentHTML(
                    "beforebegin",
                    `<p id="error">*Veuillez remplir tous les champs</p>`
                );
            }
        })
        .then((data) => {
            console.log(data);
        })

        .catch((error) => {
            console.log(error);
        });
};

const addDynamicWork = () => {
    //ajoute dynamiquement le Work en utilisant l'ancienne fonction
    fetch("http://localhost:5678/api/works")
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .then((products) => {
            createFigureGallery(products[products.length - 1]);
            console.log("L'image a bien été ajoutée");
        });
};
