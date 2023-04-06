# SAE 402 - Web App réalisé par Alexis Cantet et Guillaume Farbos

# MMI Adventures

MMI Adventures est une application web qui a pour but de faire découvrir le batiment MMI Angoulême ainsi que l'enceinte de l'IUT de manière ludique aux premières années dès leur arrivée à l'IUT. Afin de rendre cette tâche amusante, nous avons fait un parcours de chasse au trésor où les élèves devront résoudre les petites énigmes afin de trouver dans un premier temps les salles, et ensuite les cartes NFC qui permettront de passer à la prochaine clé.

## Technos utilisées

### 1- Les NFC

Pour ce projet nous avions à choisir au minimum 1 techno présentée sur le site : [What Web Can Do Today](https://whatwebcando.today/)

Pourquoi prendre les NFC ? C'est une technologie qui peut être utilisée à la manière d'une vraie clé, elle permet d'ouvrir une porte et passer à la prochaine énigme. Cependant il y a certaines contraintes à utiliser cette technologie :

- Tous les téléphones n'ont pas la possibilité de lire les NFC (c'est pour cela que le parcours se fait en groupe, il permet d'augmenter les chances d'avoir au moins un téléphone capable de lire les NFC).
- Cette techno n'est supportée que par un seul navigateur : Google Chrome. Il faut donc qu'une personne possède un téléphone ayant les NFC ainsi que le navigateur Chrome.
- Elle n'est supportée que par les téléphones et très peu de tablettes.

### 2- JS Vanilla

Pour ce qui est du Java Script nous pouvions choisir un Framework ou bien rester en Vanilla, nous avons choisi de rester sur du Vanilla JS.

Pour cette SAE qui restait dans un laps de temps relativement court et au vu des besoins que nous avions à réaliser, nous avons opté pour le Vanilla JS. En effet, langage qui nous est plutôt familier, il nous a permis d'être à l'aise directement pour réaliser cette SAE. De plus les besoins que nous avions n'étaient pas trop complexe et il n'était pas nécessaire d'alourdir la web app avec un framework JS, qui peut s'avérer plutôt gourmand et pas adapté selon les projets.

### 3- SCSS

Afin d'être plus organisé, nous avons décidé d'opter pour l'utilisation du SCSS, qui nous a permis de structurer notre code en plusieurs parties et de s'y retrouver plus facilement. Combiné à l'utilisation du BEM, il nous a permis de chacun comprendre rapidement le code de l'autre et de travailler plus efficacement.

## Parcours aléatoires

Afin que les élèves n'aient pas le même parcours et qu'il n'y ai pas une forme de triche envers chacun, il y a un total de 14 clés mais les parcours n'ont chacun que 9 clés à trouver.

Cependant il ne fallait pas que les groupes partent dans tous les sens et que le parcours soit un minimum logique. C'est pour cela que les clés présentes dans le batiment MMI vont être faite à la suite (5 clés MMI à trouver par parcours) et les clés dans l'enceinte de l'IUT de même (3 clés). Seule la dernière clé sera la même pour tous les groupes qui sera la clé présente au Crousty.

#### Exemple de code :

```
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
}
```

## NFC Reader

La technologie des NFC se sépare en 2 fonctionnalités, une première permettant d'écrire directement sur les tags NFC ce que nous voulons, et une autres permettant seulement de les lires et de récupérer les données marquées dessus.
Nous avons donc utilisé la fonctionnalité de lecture, qui nous permet de récupérer l'ID marqué dessus et de vérifier que celle-ci correspont bien à la clé qui est affiché actuellement.

#### Exemple de code :

```
scanButton.addEventListener("click", async () => {
  if ("NDEFReader" in window) {
    const ndef = new NDEFReader();
    try {
      await ndef.scan();
      ndef.onreading = (event) => {
        const decoder = new TextDecoder();
        for (const record of event.message.records) {
          if (decoder.decode(record.data) === NFCkey.textContent) {
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
```

## Timer

Afin de ne pas laisser les étudiants bloqué, si ils n'ont pas trouvé l'emplacement de la clé, la salle est révélé au bout des 3 minutes de timer.

## One Page

Pour ce projet nous somme resté sur une seule et même page. En effet cela permet de tout charger à l'ouverture de la web app et dene pas avoir de ralentissement entre chaque actions.

Pour cela il nous fallait utiliser un fichier .json où nous irions stocker toute les informations nécessaires de chaque clé (ID, nom de la salle/emplacement, indice texte, indice image).

## Guide d'utilisation

Afin d'utiliser la web app il vous faudra à disposition un téléphone :

- permettant de lire et d'écrire sur des NFC
- Google Chrome
- l'application "NFC TOOLS"
- un carte NFC vide

#### Étape 1 : Écrire des données sur votre de carte NFC

- Ouvrir l'application NFC Tools, aller dans la partie "ECRIRE", ajouter un enregistrement, texte et noter 1.
- Répéter cette action 14 fois jusqu'à avoir les 14 clés nécesaire au fonctionnement de la web APP
- Une fois fait, cliquez sur le bouton "Ecrire" et rapprochez votre carte NFC
  (si vous avez plusieurs cartes, répartissez ces numéros sur plusieurs cartes)

#### Étape 2 : S'amuser à passer toute les clés

Oui c'était rapide ! Une fois sur le site [MMI Adventures](https://mmi-adventures.netlify.app/), suivez les instructions, activez les NFC et à vous de jouer, passez toutes les clés une à une pour découvrir les petites énigimes e atteindre le trésor !

Bien sur cette web app est plus amusante sur le campus car il permet de se déplacer et faire une réelle chasse au trésor.
