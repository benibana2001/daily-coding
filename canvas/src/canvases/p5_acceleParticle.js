import p5 from "p5";
import Canvas from "../Canvas";
let cw = 800,
  ch = 400;

class Particle {
  constructor(p) {
    this.p = p;

    this.radius = 4.0;
    this.mass = 1.0;
    this.friction = 0.01;
    this.location = new p5.Vector(0.0, 0.0);
    this.velocity = new p5.Vector(0.0, 0.0);
    this.acceleration = new p5.Vector(0.0, 0.0);
    this.gravity = new p5.Vector(0.0, 0.0);
  }
  update() {
    this.acceleration.add(this.gravity);
    this.velocity.add(this.acceleration);
    this.velocity.mult(1.0 - this.friction);
    this.location.add(this.velocity);
    this.acceleration.set(0.0);
  }
  draw() {
    this.p.ellipse(
      this.location.x,
      this.location.y,
      this.mass * this.radius * 2,
      this.mass * this.radius * 2
    );
  }
  bounceOfWalls() {
    if (this.location.x > cw) {
      this.location.x = cw;
      this.velocity.x *= -1.0;
    }
    if (this.location.x < 0) {
      this.location.x = 0;
      this.velocity.x *= -1.0;
    }
    if (this.location.y > ch) {
      this.location.y = ch;
      this.velocity.y *= -1.0;
    }
    if (this.location.y < 0) {
      this.location.y = 0;
      this.velocity.y *= -1.0;
    }
  }
}

const p5_acceleParticle = () => {
  return new p5(sketch);

  function sketch(p) {
    const NUM = 100;
    const particles = [];
    p.setup = () => {
      p.createCanvas(cw, ch, p5.p2D, Canvas.canvas);
      Canvas.canvas.style.width = null;
      Canvas.canvas.style.height = null;
      p.frameRate(60);
      p.background(0);

      for (let i = 0; i < NUM; i++) {
        const newParticle = new Particle(p);
        newParticle.location.set(cw / 2.0, ch / 2.0);
        newParticle.acceleration.set(
          p.random(-10.0, 10.0),
          p.random(-10.0, 10.0)
        );
        newParticle.gravity.set(0.0, 0.1);
        particles.push(newParticle);
      }
    };
    p.draw = () => {
      // 半透明の黒で塗りつぶして軌跡を描画する
      p.fill(0, 31);
      p.rect(0, 0, cw, ch);
      // Particleを描画
      p.fill(255);
      p.noStroke();

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
        particle.bounceOfWalls();
      });
    };
    return p
  }
};
export default p5_acceleParticle;
