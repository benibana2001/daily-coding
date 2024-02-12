import p5 from 'p5';
import Canv from '../CanvWriter';
const p5_P2DRender = (c) => {
  let cw = 400;
  let ch = 400;
  Canv.setCanvas(cw, ch);

  const sketch = (p) => {
    const MAX_COUNT = 1;
    let x = [];
    let y = [];
    p.setup = function () {
      p.createCanvas(cw, ch, p5.P2D, Canv.canvas);
      p.background(0);
      for (let i = 0; i < MAX_COUNT; i++) {
        x[i] = cw / 2;
        y[i] = ch / 2;
      }
    };

    p.draw = function () {
      p.stroke(255);
      p.noFill();
      p.blendMode(p.ADD);
      for (let i = 0; i < MAX_COUNT; i++) {
        p.point(x[i], y[i]);
        x[i] = x[i] + p.random(-4.0, 4.0);
        y[i] = y[i] + p.random(-4.0, 4.0);
      }
    };

    p.windowResized = function () {
      const newWidth = window.innerWidth;
      const isSmallWindow = () => {
        return newWidth < cw;
      };
      if (isSmallWindow()) {
        const ratio = cw / newWidth;
        cw = newWidth;
        ch = ch / ratio;
        p.resizeCanvas(cw, ch);
      }
    };
  };

  new p5(sketch);
};

export default p5_P2DRender;
