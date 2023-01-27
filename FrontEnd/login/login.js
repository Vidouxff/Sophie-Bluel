const email = document.getElementById("email"); //récupère le champ de l'email
const password = document.getElementById("password"); //récupère le champ du mot de passe
const form = document.querySelector("form"); //récupère le formulaire

//ajoute un addEventListener au formulaire. Lorsque le formulaire est soumis, la fonction d'après est executée
form.addEventListener("submit", (event) => {
    event.preventDefault(); //empêche la soumission par défaut du formulaire, ce qui permet de contrôler ce qui se passe lorsque le formulaire est soumis.

    //crée un objet user avec les valeurs d'email et de mot de passe entrées dans le formulaire.
    const user = {
        email: email.value,
        password: password.value,
    };

    fetch("http://localhost:5678/api/users/login", {
        //la méthode est de type POST
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(user), //ajoute user en format JSON
    })
        .then((response) => {
            //si la réponse à réussi on on récupère le contenu au format JSON
            if (response.status == 200) {
                return response.json();
                //sinon, affiche un message d'erreur
            } else if (!email.value || !password.value) {
                let error = document.querySelector("p.error");
                if (error) {
                    error.parentNode.removeChild(error);
                }
                password.insertAdjacentHTML(
                    "afterend",
                    `<p class="error">*Veuillez remplir tous les champs</p>`
                );
            } else {
                //supprimer le message d'erreur précédemment ajouté
                let error = document.querySelector("p.error");
                if (error) {
                    error.parentNode.removeChild(error);
                }
                //ajouter le message d'erreur
                password.insertAdjacentHTML(
                    "afterend",
                    `<p class="error">*Erreur dans l'identifiant ou le mot de passe</p>`
                );
            }
        })

        .then((data) => {
            sessionStorage.setItem("token", data.token); //stock le token dans un session storage.
            document.location.href = "/index.html"; //redirige vers la page index.html
        })

        //s'il y a une erreur, va console logger err
        .catch((err) => {
            console.log(err);
        });
});
