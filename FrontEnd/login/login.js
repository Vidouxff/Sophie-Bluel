const login = () => {
  // Récupération des informations d'identification
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  // Vérification des informations d'identification
  if (email === "sophie.bluel@test.tld" && password === "S0phie") {
    // Redirection vers la page d'admin
    window.location.href = "http://127.0.0.1:5500/FrontEnd/index.html";
  } else {
    // Affichage d'une alerte "user not found"
    alert("user not found");
  }
};
