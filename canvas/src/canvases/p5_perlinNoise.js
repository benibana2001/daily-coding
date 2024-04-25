import p5 from "p5";
import Canvas from "../Canvas";

let cw = 800,
  ch = 400;

class ParticleVec3 {
  constructor(p) {
    this.p = p;

    this.radius = 8.0;
    this.mass = 1.0;
    this.friction = 0.0;
    this.location = new p5.Vector(0.0, 0.0, 0.0);
    this.velocity = new p5.Vector(0.0, 0.0, 0.0);
    this.acceleration = new p5.Vector(0.0, 0.0, 0.0);
    this.gravity = new p5.Vector(0.0, 0.0, 0.0);
    this.min = new p5.Vector(0, 0, 0);
    this.max = new p5.Vector(cw, ch, ch / 2);
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
  attract(center, _mass, min, max) {
    // locationとマウスの距離 float
    let distance = p5.Vector.dist(center, this.location);
    // 影響範囲を設定
    distance = this.p.constrain(distance, min, max);
    // 引力 F = (m * M) / (r * r)
    const strength = (9 * (this.mass * _mass)) / (distance * distance);
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

  throughWalls() {
    if(this.location.x < this.min.x){
      this.location.x = this.max.x
    }
    if(this.location.y < this.min.y){
      this.location.y = this.max.y
    }
    if(this.location.z < this.min.z){
      this.location.z = this.max.z
    }
    if(this.location.x > this.max.x){
      this.location.x = this.min.x
    }
    if(this.location.y > this.max.y){
      this.location.y = this.min.y
    }
    if(this.location.z > this.max.z){
      this.location.z = this.min.z
    }
  }
}

const p5_perlinNoise = {};
p5_perlinNoise.name = "p5_perlinNoise";
p5_perlinNoise.renderer = "2d";
p5_perlinNoise.func = () => {
  const NUM = 100;
  const noiseScale = 0.0005;
  const noiseStrength = 0.1;
  return new p5(sketch);


  function sketch(p) {
    const particles = [];
    const BG_COLOR = [30, 40, 120];
    p.setup = () => {
      p.createCanvas(cw, ch, p.p2d, Canvas.canvas);
      Canvas.canvas.style.width = null;
      Canvas.canvas.style.height = null;
      for (let i = 0; i < NUM; i++) {
        particles.push(new ParticleVec3(p));
        particles[i].location.set(p.random(cw), p.random(ch), p.random(ch / 2));
        particles[i].min.set(0, 0, 0);
        particles[i].max.set(cw, ch, ch / 2);
        particles[i].gravity.set(0, 0, 0);
        particles[i].friction = 0.1;
        particles[i].radius = 1.0;
      }

      p.frameRate(120)
      p.background(...BG_COLOR)
    };

    p.draw = () => {
      p.noStroke();

      p.fill(255, 10); 

      for (let i = 0; i < NUM; i++) {
        const force = new p5.Vector();
        force.x = p.cos(
          p.noise(
            particles[i].location.x * noiseScale,
            particles[i].location.y * noiseScale,
            particles[i].location.z * noiseScale
          ) *
            p.PI *
            4.0
        );

        force.y = p.sin(
          p.noise(
            particles[i].location.x * noiseScale,
            particles[i].location.y * noiseScale,
            particles[i].location.z * noiseScale
          ) *
            p.PI *
            4.0
        )

        force.mult(noiseStrength)

        particles[i].addForce(force)
        particles[i].update()
        particles[i].draw()
        particles[i].throughWalls()
      }
    };
    p.mousePressed = () => {
      p.noiseSeed(p.round(p.random(1000)))
      for(let i = 0; i < NUM; i++){
        particles[i].location.set(p.random(cw), p.random(ch), p.random(ch / 2))
      }
      p.background(...BG_COLOR)
    }
    return p;
  }
};
export default p5_perlinNoise;
