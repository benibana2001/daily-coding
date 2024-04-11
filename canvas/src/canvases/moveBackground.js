import Canvas from "../Canvas.js";
import img_perse from "../assets/snow_perse.png";

const moveBackground = async () => {
  const imgPerse = Canvas.createImg(img_perse); // w:360, h:180
  await Canvas.waitResolveImgs();

  Canvas.canvas.width = window.innerWidth > 720 ? 720 : window.innerWidth;

  Canvas.fitBackgroundScale(360, 2);

  const size = { w: 360, h: 180 };

  const drawMoveBackground = drawMoveImage(0.1);
  const drawNotMoveBackground = drawMoveImage(0);

  let startX = 0;
  let tick2 = 0;
  let particles2 = []

  drawNotMoveBackground();

  startSnow();

  attachEvents();

  // Snow
  function startSnow() {
    let tick = 0;
    let particles = [];

    Canvas.loop(() => {
      createParticles();

      updateParticles();

      drawParticles();
    });

    function createParticles(amount, tickSpan) {
      checkAmount();
      checkTick();

      particles.push(particle());

      function checkAmount() {
        if (particles.length < amount) return false;
      }

      function checkTick() {
        if (tick % tickSpan !== 0) return false;
      }

      function particle() {
        return {
          x: Math.random() * Canvas.canvas.width,
          y: 0,

          speed: 2 + Math.random() * 3,
          radius: 5 + Math.random() * 8,
          color: "white",
        };
      }
    }

    function drawParticles() {
      for (let particle of particles) {
        Canvas.drawArc(particle.x, particle.y, particle.radius, particle.color);
      }
    }

    function updateParticles() {
      for (let particle of particles) {
        particle.y += particle.speed;

        if (particle.y > size.h) particle.y = 0;
      }

      tick++;
    }
  }
  // Event
  function keydownHandler(e) {
    Canvas.arrowKeydownHandler({
      right: () => {
        Canvas.loop(drawMoveBackground);
      },
    })(e);
  }

  function keyupHandler(e) {
    Canvas.arrowKeyUpHandler({
      right: () => {
        Canvas.loop(drawNotMoveBackground);
      },
    })(e);
  }

  function attachEvents() {
    Canvas.registerEvent("keydown", keydownHandler);
    Canvas.registerEvent("keyup", keyupHandler);
  }

  function drawMoveImage(speed) {
    return () => {
      startX += speed;

      updatePosition();

      const position = {
        O: { x: 0, y: 0 },
        fore: { x: -startX, y: 0 },
        back: { x: 360 - startX, y: 0 },
      };

      const defaultSource = { ...position.O, ...size };
      drawLoopImage(position, defaultSource);

      function drawLoopImage(position, defaultSource) {
        Canvas.drawImage(imgPerse, defaultSource, { ...position.fore, ...size });
        Canvas.drawImage(imgPerse, defaultSource, { ...position.back, ...size });
      }
    };

    function updatePosition() {
      if (startX >= 360) {
        startX = 0;
        console.log("finish a round");
      }
    }
  }
};

export default moveBackground;
