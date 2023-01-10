function login() {
  // Récupération des informations d'identification
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  // Vérification des informations d'identification
  if (email === "sophie.bluel@test.tld" && password === "S0phie") {
    // Stockage du token en sessionStorage
    //sessionStorage.setItem(
    //"token",
    //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4"
    //);
    // Redirection vers la page d'admin
    window.location.href = "http://127.0.0.1:5500/FrontEnd/index.html";
  } else {
    // Affichage d'une alerte "personne inconnue"
    alert("user not found");
  }
}
var token = sessionStorage.getItem("token");
console.log(token);
