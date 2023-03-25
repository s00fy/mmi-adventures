// Initialisation des constantes

const index = document.getElementById("index"); // recuperer la div "index"
const rules = document.getElementById("rules"); // recuperer la div "rules"
const keysSection = document.getElementById("key"); // recuperer la section "key"
const nextButton = document.getElementById("nextButton"); // recuperer le bouton permettant d'acceder à l'espace des clés
const nextKey = document.getElementById("nextKey"); // recuperer le bouton permettant d'acceder à la clé suivante
const scanButton = document.getElementById("readTag"); // bouton permettant d'accepter le lire les tags NFC
const keysNums = document.querySelector(".keys"); // div permettant de stocker tous les ID de clé

// script permettant d'activer la géolocalisation
document.getElementById("askButton").addEventListener("click", function () {
  index.style.display = "none";
  rules.style.display = "flex";
});
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function (location) {
    // appendLocation(location, "fetched");
  });

  // watchId = navigator.geolocation.watchPosition(appendLocation);
}

// script permettant d'acceder à la lecture des tags NFC
scanButton.addEventListener("click", async () => {
  console.log("User clicked scan button");

  try {
    const ndef = new NDEFReader();
    await ndef.scan();
    console.log("> Scan started");

    ndef.addEventListener("readingerror", () => {
      console.log("Argh! Cannot read data from the NFC tag. Try another one?");
    });

    ndef.addEventListener("reading", ({ message, serialNumber }) => {
      console.log(`> Serial Number: ${serialNumber}`);
      console.log(`> Records: (${message.records.length})`);
    });
  } catch (error) {
    console.log("Argh! " + error);
  }
});

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

// script permettant d'accéder à la section des clés
nextButton.addEventListener("click", function () {
  rules.style.display = "none";
  keysSection.style.display = "flex";
});
