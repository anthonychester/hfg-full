// This is needed for webpack to bundle and process the css
//import "./main.css";
import init, { greet } from "../main-wasm/pkg/main_wasm.js";

document.getElementById("me").innerHTML = "JS loaded";

init().then(function () {
  greet();
});

console.log("run");
