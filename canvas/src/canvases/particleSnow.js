import Canvas from "../Canvas.js";

const particleSnow = {};
particleSnow.renderer = "2d";
particleSnow.name = "particleSnow";
particleSnow.func = () => {
  let particles = [];
  let tick = 0;
  Canvas.loop(() => {
    // 最大個数とparticle作成タイミング(frame)を指定
    createParticles(particles.length < 70 && tick % 40 === 0);
    updateParticles();
    killParticles();
    Canvas.drawBG("black");
    drawParticles();
  });

  const createParticles = (condition) => {
    if (condition) particles.push(particle());
  };
  const particle = () => ({
    x: Math.random() * Canvas.canvas.width,
    y: 0,
    speed: 2 + Math.random() * 3, //  2 ~ 5
    radius: 5 + Math.random() * 8,
    color: Canvas.randomRGBA(0.3 + Math.random() * 0.5),
  });
  const updateParticles = () => {
    for (let part of particles) {
      part.y += part.speed;
    }
    tick++;
  };
  const killParticles = () => {
    for (let part of particles) {
      if (part.y > Canvas.canvas.height) part.y = 0;
    }
  };
  const drawParticles = () => {
    for (let part of particles) {
      Canvas.drawArc(part.x, part.y, part.radius, part.color);
    }
  };
};

export default particleSnow;
