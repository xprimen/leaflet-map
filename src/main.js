const urlParams = new URLSearchParams(window.location.search);
const type = urlParams.get("type");
const currentLocation = urlParams.get("location");

if (type === "get") {
  document.querySelector("#kotak").style.display = "block";
}

var lat = currentLocation ? currentLocation.split(",")[0] : -4.126049696362079;
var lng = currentLocation ? currentLocation.split(",")[1] : 104.17993307047685;

let titkTengah = [lat, lng];

var map = L.map("map", {
  zoomControl: false,
}).setView(titkTengah, 12);

const icon = L.icon({
  iconUrl: "https://yayasanpdfk.my.id/kotak.png",
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [0, -50],
  className: "marker",
});

L.control.zoom({ position: "bottomright" }).addTo(map);

L.tileLayer(
  "https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}",
  {
    attribution: "Map data &copy; Google",
    maxZoom: 16,
  }
).addTo(map);

window.ReactNativeWebView &&
  window.ReactNativeWebView.postMessage(
    JSON.stringify({ type: "loaded", data: true })
  );
