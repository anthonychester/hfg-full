import { Container, Sprite } from "pixi.js";
import { applt, xypair } from "../app";
import { imageButton } from "../customElements/imageButton";
import { backroundCreate } from "../customElements/reuseable";
import { window_alart } from "../../main-wasm/pkg/main_wasm.js";

import { Graphics } from "pixi.js";

export class MainMeue extends Container {
  app: applt;
  previous: any;
  constructor(app: applt) {
    super();
    this.app = app;

    //@ts-ignore
    this.sortableChildren = true;
    this.interactive = true;
    window.addEventListener("loaded", this.loaded.bind(this));
    this.setup();
  }
  setup() {
    let backround = backroundCreate(this.app, 0x69A5FF);
    /*let box = new Graphics();
box.beginFill(0xff0000);
box.x = 0;
box.y = 0;
box.drawRect(0, 0, 50, 50);
box.endFill();
//@ts-ignore
this.addChild(box);*/
    this.addChild(backround);
  }

  loaded() {
      window_alart("loaded");
      /*
    let info = new imageButton(this.app, {
      con: this,
      x: 25,
      y: 200,
      sw: 0.25,
      sh: 0.25,
      sprit1source: "./src/icons/MainMeue/InfoIcon.png",
      sprit2source: "./src/icons/MainMeue/InfoIcon-Dark.png"
    });
    
    info.setNextScreen(this.app.secne.Info);
    this.addChild(info);
    let settings = new imageButton(this.app, {
      con: this,
      x: 435,
      y: 200,
      sw: 0.25,
      sh: 0.25,
      sprit1source: "./src/icons/MainMeue/SettingsIcon.png",
      sprit2source: "./src/icons/MainMeue/SettingsIcon-Dark.png"
    });
    settings.setNextScreen(this.app.secne.Settings);
    this.addChild(settings);
    let title = new imageButton(this.app, {
      con: this,
      x: 130,
      y: 25,
      sw: 0.5,
      sh: 0.5,
      sprit1source: "./src/icons/MainMeue/MainTitle.png"
    });
    this.addChild(title);
    this.addChild(settings);
    let log = new imageButton(this.app, {
      con: this,
      x: 400,
      y: 10,
      sw: 0.15,
      sh: 0.15,
      sprit1source: "./src/icons/MainMeue/Version(2).png"
    });
    this.addChild(log);
    let local = new imageButton(this.app, {
      con: this,
      x: 50,
      y: 135,
      sw: 0.25,
      sh: 0.25,
      sprit1source: "./src/icons/MainMeue/LocalButton.png",
      sprit2source: "./src/icons/MainMeue/LocalButton-Dark.png"
    });
    //gameData
    local.onClick(() => {
      if (this.app.curent === this) {
        this.app.gameData = {
          mode: 0,
          chars: [],
          map: -1,
          players: this.app.data.rules.numOfPlayer
        };

        //@ts-ignore
        this.app.curent.zIndex = 0;
        this.app.curent = this.app.secne.PlayerSelect;
        this.app.secne.PlayerSelect.onswitchto(this);
        //@ts-ignore
        this.app.curent.zIndex = 1;
      }
    });
    this.addChild(local);
    this.app.resize();
    */
  }

  resize() {}

  onswitchto(pre: Function) {
    this.previous = pre;
  }

  update(delta: number) {}
}
