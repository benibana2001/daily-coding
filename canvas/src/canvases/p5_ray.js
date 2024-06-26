import p5 from "p5";
import Canvas from "../Canvas";

class Particle {
  constructor(p, diameter, width, height) {
    // Size
    this.diameter = diameter;
    // 位置ベクトル
    this.location = new p5.Vector(p.random(0, width), p.random(0, height));
    // 速度ベクトル
    this.velocity = new p5.Vector(p.random(-8, 8), p.random(-8, 8));
    // 色
    this.col = p.color(p.random(255), p.random(255), p.random(255));
  }

  draw(p) {
    p.fill(this.col);
    p.ellipse(this.location.x, this.location.y, this.diameter, this.diameter);
    this.location.add(this.velocity);
  }
}

const p5_ray = {};
p5_ray.renderer = "2d";
p5_ray.name = "p5_ray";
p5_ray.func = () => {
  let cw = 800,
    ch = 400;

  return new p5(sketch);
  /**
   * Sketch
   * @param {p5} p
   */
  function sketch(p) {
    const NUM = 200;
    const particles = [];

    p.setup = () => {
      p.createCanvas(cw, ch, p5.P2D, Canvas.canvas);
      // remove width, height from inline
      // since p5.js createCanvas would hard-coding canvas size and CSS (max-width: 100%) would not effective.
      Canvas.canvas.style.width = null;
      Canvas.canvas.style.height = null;

      p.frameRate(60);
      p.blendMode(p.ADD);
      p.background(0);
      p.noStroke();

      for (let i = 0; i < NUM; i++) {
        particles[i] = new Particle(p, p.random(5, 26), cw, ch);
      }
    };

    p.draw = () => {
      p.background(0);
      particles.forEach((particle) => {
        particle.draw(p);
      });
    };
    return p;
  }
};

export default p5_ray;
