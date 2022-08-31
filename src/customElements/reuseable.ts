import { resizeableGraphics } from "./resizeableGraphics";
import { applt, xypair } from "../app";
import { Graphics } from "pixi.js";
import { window_alart } from "../../main-wasm/pkg/main_wasm";

export function backroundCreate(app: applt, color: number) {
    window_alart("bgc");
  let backround = new resizeableGraphics(app);

backround.beginFill(0x0000ff);
backround.x = 0;
backround.y = 5;
backround.drawRect(0, 0, 50, 50);
backround.endFill();
  backround.onResize(() => {
    /*
    backround.clear();
    backround.lineStyle(4, 0x000000, 1);
    backround.beginFill(color);
    backround.x = 0;
    
    backround.y = 0;
    let xy: xypair = app.toPos({ x: 500, y: 250 });
    backround.drawRect(0, 0, xy.x, xy.y);
    backround.endFill();
    */
    window_alart("run");
     backround.clear();
    backround.beginFill(0x0000ff);
backround.x = 5;
backround.y = 5;
 let xy: xypair = app.toPos({ x: 500, y: 250 });
backround.drawRect(0, 0, xy.x, xy.y);
backround.endFill();

//@ts-ignore
//this.addChild(box);
       
  });
  return backround;
}
