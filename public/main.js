if ("geolocation" in navigator) {
  document.getElementById("askButton").addEventListener("click", function () {
    navigator.geolocation.getCurrentPosition(function (location) {
      appendLocation(location, "fetched");
    });
    watchId = navigator.geolocation.watchPosition(appendLocation);
  });
}
async function readTag() {
  if ("NDEFReader" in window) {
    const ndef = new NDEFReader();
    try {
      await ndef.scan();
      ndef.onreading = (event) => {
        const decoder = new TextDecoder();
        for (const record of event.message.records) {
          console.log("Record type:  " + record.recordType);
          console.log("MIME type:    " + record.mediaType);
          console.log("=== data ===\n" + decoder.decode(record.data));
        }
      };
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("Web NFC is not supported.");
  }
}

// for (let pasMMI = 0; pasMMI < 5; pasMMI++) {
//   var minMMI = 1;
//   var maxMMI = 9;
//   var randomMMI = Math.floor(Math.random() * (maxMMI - minMMI)) + minMMI;
//   console.log("MMI" + randomMMI);
// }

// for (let pasIUT = 0; pasIUT < 3; pasIUT++) {
//   var minIUT = 1;
//   var maxIUT = 5;
//   var randomIUT = Math.floor(Math.random() * (maxIUT - minIUT)) + minIUT;
//   console.log("IUT" + randomIUT);
// }

//Génération des 5 clés à trouver dans le batiment MMI

var MMInums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var gen_nums = [];

function in_array(array, el) {
  for (var i = 0; i < 5; i++) if (array[i] == el) return true;
  return false;
}

function get_rand(array) {
  var rand = array[Math.floor(Math.random() * 9)];
  if (!in_array(gen_nums, rand)) {
    gen_nums.push(rand);
    return rand;
  }
  return get_rand(array);
}

for (var i = 0; i < 5; i++) {
  console.log("MMI " + get_rand(MMInums));
}

//Génération des 3 clés à trouver dans l'enceinte de l'IUT
