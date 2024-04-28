import p5 from "p5";
import Canvas from "../Canvas";

let cw = 200,
  ch = 200;

const p5_randomSquare = {};
p5_randomSquare.name = "p5_recursive";
p5_randomSquare.renderer = "2d";
p5_randomSquare.func = () => {
  class Rect {
    constructor(p, x, y, size) {
      this.p = p;
      this.x = x;
      this.y = y;
      this.size = size;

      this.p.colorMode(p.HSL, 100);
      this.color = [this.getRandom0to100(), this.getRandom0to100(), this.getRandom0to100()]
    }

    getRandom0to100() {
      return this.p.noise(this.p.random(10)) * 100;
      
    }
    draw() {
      this.p.fill(...this.color);
      this.p.noStroke();
      const scall = this.p.sin((this.p.frameCount - this.x - this.y) * 0.1);
      this.p.rect(this.x, this.y, this.size * scall);
    }

    setSize(newSize) {
      this.size = newSize;
    }
  }

  return new p5(sketch);

  function sketch(p) {
    const BG_COLOR = [p.random(40, 255), p.random(40, 255), p.random(40, 255)];
    const rects = [];
    const step = 20;
    const num = cw / 20;

    for (let j = 0; j <= ch; j += step) {
      for (let i = 0; i <= cw; i += step) {
        const rectSize = step - 10 + 10 * p.random(0, 1);
        rects.push(new Rect(p, i, j, rectSize));
      }
    }

    p.setup = () => {
      p.createCanvas(cw, ch, p.p2d, Canvas.canvas);
      Canvas.canvas.style.width = null;
      Canvas.canvas.style.height = null;

      p.frameRate(10);
    };

    p.draw = () => {
      p.blendMode(p.BLEND);
      p.colorMode(p.RGB, 255);
      p.background(...BG_COLOR);

      p.rectMode(p.RADIUS);
      p.blendMode(p.ADD);

      rects.forEach((rect) => {
        rect.draw();
      });
    };
    return p;
  }
};
export default p5_randomSquare;
