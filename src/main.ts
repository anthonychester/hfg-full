// This is needed for webpack to bundle and process the css
//import "./main.css";
import init, { greet, window_alart } from "../main-wasm/pkg/main_wasm.js";
import { Graphics } from "pixi.js";
import { applt } from "./app";
import { Loader } from "./loader";

import { MainMeue } from "./pages/MainMeue";

//init rust wasm 
init().then(function () {
const inputImageAspectRatio = window.innerWidth / window.innerHeight;

const outputImageAspectRatio = 16 / 9;

let outputWidth = window.innerWidth;
let outputHeight = window.innerHeight;

if (inputImageAspectRatio > outputImageAspectRatio) {
  outputWidth = window.innerHeight * outputImageAspectRatio;
} else if (inputImageAspectRatio < outputImageAspectRatio) {
  outputHeight = window.innerWidth / outputImageAspectRatio;
}

let res = window.devicePixelRatio || 1;

const app = new applt(outputWidth, outputHeight, {
  autoResize: true,
  view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
  //@ts-ignore
  resolution: res,
  backgroundColor: 0x1099bb
});

document.body.appendChild(app.view);
/* resetup 
let box = new Graphics();
box.beginFill(0xff0000);
box.x = 0;
box.y = 0;
box.drawRect(0, 0, 50, 50);
box.endFill();
//@ts-ignore
app.stage.addChild(box);
*/

//app.stage.addChild(app.loading);
//@ts-ignore
app.loading.zIndex = -1;
app.secne = {
  MainMeue: new MainMeue(app)
};
app.stage.addChild(app.secne.MainMeue);
app.curent = app.secne.MainMeue;
//@ts-ignore
app.curent.zIndex = 1;


const updateloaded = new CustomEvent("loaded", {
  detail: {},
  bubbles: true,
  cancelable: true,
  composed: false
});

app.isloaded = false;

app.setOnLoad((loader: any, resources: any) => {
  app.loader.resources = resources;
  let Data = app.loader.resources["./src/data.json"];
  app.data = Data.data;
  app.devlog("dev", app.data.version);

  //app.inputHandler = new inputHandler(app);
  app.loading.disable();
  window.dispatchEvent(updateloaded);
  app.resize();
  app.isloaded = true;
});

if (!app.isloaded) {
  let loader = new Loader(app);
  loader.load();
}
for (let i in app.secne) {
  app.stage.addChild(app.secne[i]);
}
//app.loading.inable();
app.ticker.add(function (delta) {
  if (app.isloaded) {
    //@ts-ignore
    app.curent.update(delta);
    app.inputHandler.update(delta);
  } else {
    app.loading.update(delta);
  }
});

window.addEventListener("resize", app.resize);

  //greet();
//});

console.log("run");
});