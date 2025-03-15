const urlParams = new URLSearchParams(window.location.search);
const type = urlParams.get("type");
const currentLocation = urlParams.get("location");
const zoom = urlParams.get("zoom");
const coordinates =
  urlParams.get("coordinates") &&
  JSON.parse(decodeURIComponent(urlParams.get("coordinates")));

if (type === "get") {
  document.querySelector("#kotak").style.display = "block";
}

var lat = currentLocation ? currentLocation.split(",")[0] : -4.126049696362079;
var lng = currentLocation ? currentLocation.split(",")[1] : 104.17993307047685;

let titkTengah = [lat, lng];

var map = L.map("map", {
  zoomControl: false,
}).setView(titkTengah, zoom);

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
    maxZoom: 18,
  }
).addTo(map);

if (type === "get") {
  map.on("moveend", (e) => {
    titkTengah = [e.target.getCenter().lat, e.target.getCenter().lng];
    // document
    //   .querySelector("#map")
    //   .insertAdjacentHTML("beforebegin", JSON.stringify(e.target));
    // console.debug("titkTengah :", e);
    // zoom = e.target._zoom;
    // map.setZoom(e.target._zoom);
    window.ReactNativeWebView &&
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: "positionChanged",
          data: {
            lat: e.target.getCenter().lat,
            lng: e.target.getCenter().lng,
            zoom: e.target._zoom,
          },
        })
      );
  });
}

if (coordinates) {
  const lats = coordinates.map((item) => item.lat);
  const lngs = coordinates.map((item) => item.lng);
  const maxLat = Math.max(...lats);
  const minLat = Math.min(...lats);
  const maxLng = Math.max(...lngs);
  const minLng = Math.min(...lngs);

  const southWest = new L.LatLng(minLat, maxLng),
    northEast = new L.LatLng(maxLat, minLng),
    bounds = new L.LatLngBounds(southWest, northEast);

  map.fitBounds(bounds, { padding: [50, 50] });

  coordinates.map((coordinate) => {
    L.marker([coordinate.lat, coordinate.lng], {
      icon,
    })
      .addTo(map)
      .bindPopup(`<strong>${coordinate.title}</strong>`);
  });
}

window.ReactNativeWebView &&
  window.ReactNativeWebView.postMessage(
    JSON.stringify({ type: "loaded", data: true })
  );
