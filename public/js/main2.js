// script permettant d'acceder à la lecture des tags NFC
const NFCkey = document.querySelector(".NFCkey");
let idValue = 1;
// même script que pour la génération des clés MMI, mais celui ci est pour les clé IUT
var IUTnums = [8, 9, 10, 11, 12];
const MAX_KEYS = 3;
var gen_nums = [];

function in_array(array, el) {
  for (var i = 0; i < MAX_KEYS; i++) if (array[i] == el) return true;
  return false;
}

function get_rand(array) {
  var rand = array[Math.floor(Math.random() * 5)];
  if (!in_array(gen_nums, rand)) {
    gen_nums.push(rand);
    return rand;
  }
  return get_rand(array);
}

for (var i = 0; i < 3; i++) {
  keysNums.innerHTML += "<p>" + get_rand(IUTnums) + "</p>";
}
keysNums.innerHTML += "<p>13</p>"; //permet de rajouter la dernière clé commune à tous le monde : le crous
const keysChilds = keysNums.querySelectorAll(":nth-child(n)");

keysChilds.forEach((keyChild) => {
  console.log(keyChild.textContent);
});

let indexKey = 0;
const keyID = document.querySelector(".indiceID"); // constante pour rentrer l'ID d'une clé
const keyText = document.querySelector(".key__main--text"); // constante pour rentrer la description d'une clé
const keyImage = document.querySelector(".indiceImage"); // constante pour rentrer l'image' d'une clé
const keyCount = document.querySelector(".key__footer--text");
// script qui permet de passer à la clé suivante

nextKey.addEventListener("click", () => {
  const keysChildSuivant = keysChilds[indexKey++ % keysChilds.length];

  // script qui récupère les données dans le fichier .json et les injecte dans le HTML
  fetch("./js/keys.json")
    .then((response) => response.json())
    .then((data) => {
      if (indexKey > 9) {
        nextKey.disabled = true;
        nextKey.classList.add("grey");
      } else {
        // Les données JSON sont converties objet JavaScript
        const idValue = data.keys[keysChildSuivant.textContent].id;
        // const keyNFC = decoder.decode(record.data);
        const textValue = data.keys[keysChildSuivant.textContent].indiceText;
        const imageValue = data.keys[keysChildSuivant.textContent].image;
        // Les données sont injecter dans le HTML
        keyID.innerText = indexKey;
        keyText.innerText = textValue;
        keyImage.src = imageValue;
        keyCount.innerHTML = indexKey - 1;
        NFCkey.innerText = idValue;
        console.log(idValue);
        console.log("Index de clé " + indexKey);
        // permet de désactiver le bouton lors de la dernière clé
      }
      nextKey.classList.add("grey");
      nextKey.disabled = true;
      nextKey.innerText = "Clé manquante";
    });
});

scanButton.addEventListener("click", async () => {
  if ("NDEFReader" in window) {
    const ndef = new NDEFReader();
    try {
      await ndef.scan();
      ndef.onreading = (event) => {
        const decoder = new TextDecoder();
        for (const record of event.message.records) {
          if (decoder.decode(record.data) === NFCkey.textContent) {
            console.log("C'est la bonne clé");
            nextKey.disabled = false;
            nextKey.classList.remove("grey");
            nextKey.innerText = "Clé suivante";
          }
        }
      };
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("Web NFC is not supported.");
  }
});
