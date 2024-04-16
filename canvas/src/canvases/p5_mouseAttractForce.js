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
    this.col = p.color(p.random(255), p.random(255), p.random(255));
  }
  update() {
    this.acceleration.add(this.gravity);
    this.velocity.add(this.acceleration);
    this.velocity.mult(1.0 - this.friction);
    this.location.add(this.velocity);
    this.acceleration.set(0.0);
  }
  draw() {
    this.p.fill(this.col);
    this.p.ellipse(
      this.location.x,
      this.location.y,
      this.mass * this.radius * 2,
      this.mass * this.radius * 2
    );
  }
  addForce(force) {
    // F = m * a
    force.div(this.mass); // a = F(force) / m(this.mass)
    this.acceleration.add(force);
  }
  attract(center, _mass, min, max) {
    // 重力定数
    const G = 1.0;
    // locationとマウスの距離
    let distance = p5.Vector.dist(center, this.location);
    // 影響範囲を設定
    distance = this.p.constrain(distance, min, max);
    // 引力 F = (m * M) / (r * r)
    const strength = (G * (this.mass * _mass)) / (distance * distance);
    // マウスとlocationの間に働くベクトルを各々の位置ベクトルから算出
    const force = p5.Vector.sub(center, this.location);
    // 正規化
    force.normalize();
    // 引力を割り当て
    force.mult(strength);
    this.addForce(force);
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
const p5_mouseAttractForce = () => {
  return new p5(sketch);

  function sketch(p) {
    const NUM = 300;
    const particles = [];
    p.setup = () => {
      p.createCanvas(cw, ch, p5.p2D, Canvas.canvas);
      Canvas.canvas.style.width = null;
      Canvas.canvas.style.height = null;
      p.frameRate(60);
      p.background(0);

      for (let i = 0; i < NUM; i++) {
        const newParticle = new Particle(p);
        newParticle.location.set(p.random(cw), p.random(ch));
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
    p.mouseDragged = () => {
      particles.forEach((particle) => {
        const mouseLocation = new p5.Vector(p.mouseX, p.mouseY);
        particle.attract(mouseLocation, 200, 5, 20);
      });
    };
    return p;
  }
};
export default p5_mouseAttractForce;
