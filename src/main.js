const urlParams = new URLSearchParams(window.location.search);
const type = urlParams.get("type");

if (type === "get") {
  document.querySelector("#kotak").style.display = "block";
}

window.ReactNativeWebView &&
  window.ReactNativeWebView.postMessage(
    JSON.stringify({ type: "loaded", data: true })
  );
