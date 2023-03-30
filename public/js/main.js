// Initialisation des constantes

const home = document.querySelector(".home"); // recuperer la section "home"
const rules = document.querySelector(".rules"); // recuperer la section "rules"
const keysSection = document.querySelector(".key"); // recuperer la section "key"
const treasureSection = document.querySelector(".treasure"); // recuperer la section "key"
const nextButton = document.getElementById("nextButton"); // recuperer le bouton permettant d'acceder à l'espace des clés
const nextKey = document.getElementById("nextKey"); // recuperer le bouton permettant d'acceder à la clé suivante
const scanButton = document.getElementById("readTag"); // bouton permettant d'accepter le lire les tags NFC
const keysNums = document.querySelector(".keys"); // div permettant de stocker tous les ID de clé


// script permettant d'activer la géolocalisation
document.getElementById("askButton").addEventListener("click", function () {
  home.classList.add("d-none");
  rules.classList.remove("d-none");
});

// script permettant d'accéder à la section des clés
scanButton.addEventListener("click", function () {
  rules.classList.add("d-none");
  keysSection.classList.remove("d-none");
});
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function (location) {
    // appendLocation(location, "fetched");
  });

  // watchId = navigator.geolocation.watchPosition(appendLocation);
}

//Génération des 5 clés (aléatoire sur les 8 existantes) à trouver dans le batiment MMI
var MMInums = [0, 1, 2, 3, 4, 5, 6, 7];
var gen_nums = [];

function in_array(array, el) {
  for (var i = 0; i < 5; i++) if (array[i] == el) return true;
  return false;
}

function get_rand(array) {
  var rand = array[Math.floor(Math.random() * 8)];
  if (!in_array(gen_nums, rand)) {
    gen_nums.push(rand);
    return rand;
  }
  return get_rand(array);
}

for (var i = 0; i < 5; i++) {
  keysNums.innerHTML += "<p>" + get_rand(MMInums) + "</p>";
  // console.log("MMI " + get_rand(MMInums));
}
