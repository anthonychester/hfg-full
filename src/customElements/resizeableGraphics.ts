import { Graphics, Sprite, Text } from "pixi.js";
import { applt } from "../app";
import { resizeableText } from "./resizeableText";
export class resizeableGraphics extends Graphics {
  app: applt;
  resize: any;
  text: Text | resizeableText;
  sprite: Sprite;
  status: any;

  constructor(app: applt) {
      super();
    
    this.app = app;

    this.resize = () => {};

    this.interactive = true;
    window.addEventListener("updatesize", () => {
      this.resize();
    });
    
  }
    
  onMouseout(fun: Function) {
    //@ts-ignore
    this.mouseout = fun;
  }

  onClick(fun: Function) {
    //@ts-ignore
    this.click = fun;
  }

  onMouseover(fun: Function) {
    //@ts-ignore
    this.mouseover = fun;
  }

  onResize(fun: Function) {
    this.resize = fun;
  }
  
}
