import p5 from "p5";
import Canvas from "../Canvas";
let cw = 800,
  ch = 400;

class ParticleVec3 {
  constructor(p) {
    this.p = p;

    this.radius = 4.0;
    this.mass = 1.0;
    this.friction = 0.0;
    this.location = new p5.Vector(0.0, 0.0, 0.0);
    this.velocity = new p5.Vector(0.0, 0.0, 0.0);
    this.acceleration = new p5.Vector(0.0, 0.0, 0.0);
    this.gravity = new p5.Vector(0.0, 0.0, 0.0);
    this.min = new p5.Vector(0, 0, 0);
    this.max = new p5.Vector(cw, ch, ch / 2);
    this.col = p.color(p.random(255), p.random(255), p.random(255));
  }
  update() {
    this.acceleration.add(this.gravity);
    this.velocity.add(this.acceleration);
    this.velocity.mult(1.0 - this.friction);
    this.location.add(this.velocity);
    this.acceleration.set(0, 0, 0);
  }
  draw() {
    this.p.push();
    this.p.translate(this.location.x, this.location.y, this.location.z);
    this.p.fill(this.col);
    this.p.ellipse(
      0,
      0,
      this.mass * this.radius * 2,
      this.mass * this.radius * 2
    );
    this.p.pop();
  }
  addForce(force) {
    // F = m * a
    force.div(this.mass); // a = F(force) / m(this.mass)
    this.acceleration.add(force);
  }
  attract(center, _mass) {
    // locationとマウスの距離
    let distance = p5.Vector.dist(center, this.location);
    // 影響範囲を設定
    distance = this.p.constrain(distance, this.min, this.max);
    // 引力 F = (m * M) / (r * r)
    const strength = (this.G * (this.mass * _mass)) / (distance * distance);
    // マウスとlocationの間に働くベクトルを各々の位置ベクトルから算出
    const force = p5.Vector.sub(center, this.location);
    // 正規化
    force.normalize();
    // 引力を割り当て
    force.mult(strength);
    this.addForce(force);
  }
  bounceOfWalls() {
    if (this.location.x > this.max.x) {
      this.location.x = this.max.x;
      this.velocity.x *= -1.0;
    }
    if (this.location.x < this.min.x) {
      this.location.x = this.min.x;
      this.velocity.x *= -1.0;
    }
    if (this.location.y > this.max.y) {
      this.location.y = this.max.y;
      this.velocity.y *= -1.0;
    }
    if (this.location.y < this.min.y) {
      this.location.y = this.min.y;
      this.velocity.y *= -1.0;
    }
    if (this.location.z > this.max.z) {
      this.location.z = this.max.z;
      this.velocity.z *= -1.0;
    }
    if (this.location.z < this.min.z) {
      this.location.z = this.min.z;
      this.velocity.z *= -1.0;
    }
  }
}
const p5_mouseAttractForceVec3 = () => {
  return new p5(sketch);

  function sketch(p) {
    const NUM = 300;
    const particles = [];
    p.setup = () => {
      p.createCanvas(cw, ch, p5.p3D, Canvas.canvas);
      console.log(Canvas.canvas)
      if(Canvas.canvas.style.width) Canvas.canvas.style.width = null;
      if(Canvas.canvas.style.height) Canvas.canvas.style.height = null;
      p.frameRate(60);
      p.background(0);

      for (let i = 0; i < NUM; i++) {
        const newParticle = new ParticleVec3(p);
        newParticle.location.set(p.random(cw), p.random(ch), p.random(ch / 2));
        newParticle.gravity.set(0.0, 0.0, 0.0);
        newParticle.friction = 0.01;
        newParticle.radius = 2.0;
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
        particle.attract(mouseLocation, 200);
      });
    };
    return p;
  }
};
export default p5_mouseAttractForceVec3;
