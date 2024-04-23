import Canvas from "../Canvas.js";

const dotPattern = {};
dotPattern.renderer = "2d";
dotPattern.name = "dotPattern";
dotPattern.func = () => {
  const cw = Canvas.canvas.width;
  const ch = Canvas.canvas.height;
  const particle = () => {
    return [
      Math.random() * cw,
      Math.random() * ch,
      ch > cw ? (Math.random() * cw) / 5 : (Math.random() * ch) / 5,
      Canvas.randomRGBA(Math.random() * 1.0),
    ];
  };

  const particles = () => {
    let ary = [];
    for (let i = 0; i < 30; i++) {
      ary.push(particle());
    }
    return ary;
  };

  const drawParticles = () => {
    for (let i = 0, ps = particles(); i < ps.length; i++) {
      Canvas.drawArc(...ps[i]);
    }
  };

  const draw = () => {
    Canvas.drawBG(Canvas.randomRGBA(0.1));
    drawParticles();
  };

  draw();
  // Canvas.canvas.addEventListener('click', () => draw())
  Canvas.registerCanvasEvent("click", () => draw());
};

export default dotPattern;
