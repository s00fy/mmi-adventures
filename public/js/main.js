if ("geolocation" in navigator) {
  document.getElementById("askButton").addEventListener("click", function () {
    navigator.geolocation.getCurrentPosition(function (location) {
      appendLocation(location, "fetched");
    });
    watchId = navigator.geolocation.watchPosition(appendLocation);
  });
}
