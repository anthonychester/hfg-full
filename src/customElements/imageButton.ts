import { Graphics, Sprite, Container, Text, TextStyle } from "pixi.js";
import { applt, xypair } from "../app";

export interface Callbackfunction {
  onclick: Function;
  onmouseout: Function;
  onmouseover: Function;
  onresize: Function;
}

export interface IBoptions {
  x: number;
  y: number;
  sw?: number;
  sh?: number;
  sx?: number;
  sy?: number;
  font?: TextStyle;
  text?: string;
  sprit1source?: string;
  sprit2source?: string;
  con?: Container;
}

export class imageButton extends Graphics {
  app: applt;
  con: any;
  resize: any;
  sprite1: Sprite | Text;
  sprite2: Sprite;
  x: number;
  y: number;
  sw: number;
  sh: number;
  options: IBoptions;
  data: any;
  callbacks: Callbackfunction;

  constructor(app: applt, options: IBoptions) {
    super();
    //@ts-ignore
    this.app = app;
    this.options = options;
    if (options.con) {
      this.con = options.con;
    } else {
      this.con = app;
    }
    this.callbacks = {
      onclick: () => {},
      onmouseout: () => {},
      onmouseover: () => {},
      onresize: () => {}
    };

    //@ts-ignore
    this.sortableChildren = true;
    this.x = options.x ? options.x : 0;
    this.y = options.y ? options.y : 0;
    let pos: xypair = this.app.toPos({ x: this.x, y: this.y });
    this.sw = options.sw ? options.sw : 0;
    this.sh = options.sh ? options.sh : 0;
    if (options.text) {
      this.sprite1 = new Text(options.text, options.font);
    } else {
      this.sprite1 = Sprite.from(
        this.app.loader.resources[options.sprit1source].texture
      );
    }
    this.sprite1.interactive = true;
    this.sprite1.x = pos.x;
    this.sprite1.y = pos.y;
    //@ts-ignore
    this.sprite1.zIndex = 1;
    this.con.addChild(this.sprite1);

    if (options.sprit2source) {
      this.sprite2 = Sprite.from(
        this.app.loader.resources[options.sprit2source].texture
      );
      this.sprite2.interactive = true;
      this.sprite2.x = pos.x;
      this.sprite2.y = pos.y;
      //@ts-ignore
      this.sprite2.zIndex = 0;
      this.con.addChild(this.sprite2);
    }

    //@ts-ignore
    this.sprite1.mouseover = () => {
      this.callbacks.onmouseover(this);
    };
    this.resize = () => {
      this.callbacks.onresize(this);
    };
    if (this.sprite2) {
    //@ts-ignore
      this.sprite2.click = () => {
        this.callbacks.onclick(this);
      };
      //@ts-ignore
      this.sprite2.mouseout = () => {
        this.callbacks.onmouseout(this);
      };
    } else {
    //@ts-ignore
      this.sprite1.click = () => {
        this.callbacks.onclick(this);
      };
      //@ts-ignore
      this.sprite1.mouseout = () => {
        this.callbacks.onmouseout(this);
      };
    }

    this.resize = () => {
      let pos: xypair = this.app.toPos({ x: this.x, y: this.y });
      this.sprite1.x = pos.x;
      this.sprite1.y = pos.y;

      this.sprite1.scale.x = (this.app.xm / 1) * this.sw;
      this.sprite1.scale.y = (this.app.ym / 1) * this.sh;
      if (this.sprite2) {
        this.sprite2.x = pos.x;
        this.sprite2.y = pos.y;

        this.sprite2.scale.x = (this.app.xm / 1) * this.sw;
        this.sprite2.scale.y = (this.app.ym / 1) * this.sh;
      }
    };

    if (this.sprite2) {
      //@ts-ignore
      this.sprite1.mouseover = () => {
        //@ts-ignore
        this.sprite1.zIndex = 0;
        //@ts-ignore
        this.sprite2.zIndex = 1;
      };
      //@ts-ignore
      this.sprite2.mouseout = () => {
        //@ts-ignore
        this.sprite1.zIndex = 1;
        //@ts-ignore
        this.sprite2.zIndex = 0;
      };
    }

    window.addEventListener("updatesize", () => {
      this.resize();
    });
  }

  setNextScreen(secne: Container) {
    this.onClick(() => {
      if (this.app.curent === this.con) {
        //@ts-ignore
        this.app.curent.zIndex = 0;
        this.app.curent = secne;
        //@ts-ignore
        secne.onswitchto(this.con);
        //@ts-ignore
        this.app.curent.zIndex = 1;
      }
    });
  }

  onMouseout(fun: Function) {
    //@ts-ignore
    this.mouseout = fun;
  }

  onClick(fun: Function) {
    //@ts-ignore
    if (this.sprite2) {
    //@ts-ignore
      this.sprite2.click = fun;
    } else {
    //@ts-ignore
      this.sprite1.click = fun;
    }
  }

  onMouseover(fun: Function, toBind = false) {
    //@ts-ignore
    if (toBind) {
    //@ts-ignore
      this.sprite1.mouseover = fun;
    } else {
    //@ts-ignore
      this.sprite1.mouseover = fun;
    }
  }

  onResize(fun: Function) {
    this.resize = fun;
  }
}
