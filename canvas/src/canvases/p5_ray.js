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

const p5_ray = () => {
  let cw = 600,
    ch = 600;

  new p5(sketch);
  /**
   * Sketch
   * @param {p5} p
   */
  function sketch(p) {
    const NUM = 200;
    const particles = [];
    p.setup = function () {
      p.createCanvas(cw, ch, p5.P2D, Canvas.canvas);
      p.frameRate(60);
      p.blendMode(p.ADD);
      p.background(0);
      p.noStroke();

      for (let i = 0; i < NUM; i++) {
        particles[i] = new Particle(p, p.random(5, 26), cw, ch);
      }
    };

    p.draw = function () {
      p.background(0);
      particles.forEach(particle => {
        particle.draw(p)
      })
    };
  }
};

export default p5_ray;
