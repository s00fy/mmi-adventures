const index = document.getElementById("index");
const rules = document.getElementById("rules");
const scanButton = document.getElementById("readTag");
document.getElementById("askButton").addEventListener("click", function () {
  index.style.display = "none";
  rules.style.display = "flex";
});
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function (location) {
    appendLocation(location, "fetched");
  });

  // watchId = navigator.geolocation.watchPosition(appendLocation);
}
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

// async function readTag() {
//   if ("NDEFReader" in window) {
//     const ndef = new NDEFReader();
//     try {
//       await ndef.scan();
//       ndef.onreading = (event) => {
//         const decoder = new TextDecoder();
//         for (const record of event.message.records) {
//           console.log("Record type:  " + record.recordType);
//           console.log("MIME type:    " + record.mediaType);
//           console.log("=== data ===\n" + decoder.decode(record.data));
//         }
//       };
//     } catch (error) {
//       console.log(error);
//     }
//   } else {
//     console.log("Web NFC is not supported.");
//   }
// }

//Génération des 5 clés à trouver dans le batiment MMI

var MMInums = [1, 2, 3, 4, 5, 6, 7, 8];
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
  console.log("MMI " + get_rand(MMInums));
}
