import Canvas from "../Canvas.js";
import cigarFrameData from "../assets/cigar.js";
import personFrameData from "../assets/person.js";
import img_cigar from "../assets/cigar.png";
import img_person from "../assets/person.png";
import img_looftop from "../assets/looftop.png";
import img_birds from "../assets/birds.png";
import { KeyDownHandler, KeyUpHandler } from "../KeyboardHandler.js";

const yasumijikan = async () => {
  // prepare images
  const imgPerson = Canvas.createImg(img_person);
  const imgCigar = Canvas.createImg(img_cigar);
  const imgLooftop = Canvas.createImg(img_looftop); //  w:200, h: 180
  const imgBirds = Canvas.createImg(img_birds);

  await Canvas.waitResolveImgs();
  const imgPersonFlip = Canvas.flipImage(imgPerson);

  // parse Aseprite frame data
  const cigarSpritesFrames = Canvas.parseAsperiteJSON(cigarFrameData);
  const personSpritesFrames = Canvas.parseAsperiteJSON(personFrameData);

  const sourceLooftop = {
    x: 0,
    y: 0,
    w: imgLooftop.width,
    h: imgLooftop.height,
  };

  Canvas.setCanvas(sourceLooftop.w * 2, sourceLooftop.h * 2);

  const sourceBirds = {
    x: 0,
    y: 0,
    w: imgBirds.width,
    h: imgBirds.height,
  };

  // Person size calculate
  const cigarFrameSize = {
    w: cigarSpritesFrames[0].w,
    h: cigarSpritesFrames[0].h,
  };

  const personFrameSize = {
    w: personSpritesFrames[0].w,
    h: personSpritesFrames[0].h,
  };
  //
  // birds object
  let birdsObject = Canvas.moveObj()();
  let birdsVelocity = {};

  const birdsStartPosition = () => ({
    x: -(imgBirds.width + 30),
    y: (() => 40 * Math.random())(),
  });

  const endPosition = sourceLooftop.w;

  const initialBirdsObj = () => {
    return Canvas.moveObj(birdsStartPosition())({
      w: sourceBirds.w,
      h: sourceBirds.h,
    });
  };

  const initialBirdsVelocity = () => ({
    x: 0.4 + 0.6 * Math.random(),
    y: -0.06 + 0.09 * Math.random(),
  });

  birdsObject = initialBirdsObj();
  birdsVelocity = initialBirdsVelocity();

  // Set context scale
  const scale = Canvas.fitBackgroundScale(200, 3);

  // draw bird and background
  const backgroundLoop = () => {
    Canvas.drawImage(imgLooftop, sourceLooftop);

    const birdsOutput = birdsObject(birdsVelocity);

    if (birdsOutput.x > endPosition) {
      birdsObject = initialBirdsObj();
      birdsVelocity = initialBirdsVelocity();
    }

    Canvas.drawImage(imgBirds, sourceBirds, birdsOutput);
  };

  // Person frame
  const frameCalc = (statusObj) => (tick) => {
    const so = statusObj;
    const current = tick % (so.frameLength * so.frameSpeed);

    for (let i = 0; i < so.frameLength; i++) {
      const currentFrame = so.reverse ? so.head - i : so.head + i;
      if (current < (i + 1) * so.frameSpeed) return so.sprites[currentFrame];
    }
  };

  // Person status Actions
  const status = {
    cigar: {
      image: imgCigar,
      velocity: { x: 0, y: 0 },
      sprites: cigarSpritesFrames,
      frameLength: 5,
      frameSpeed: 80,
      head: 0,
      reverse: false,
      frameSize: cigarFrameSize,
    },
    constantLeft: {
      image: imgPerson,
      velocity: { x: 0, y: 0 },
      sprites: personSpritesFrames,
      frameLength: 2,
      frameSpeed: 20,
      head: 0,
      frameSize: personFrameSize,
    },
    constantRight: {
      image: imgPersonFlip,
      velocity: { x: 0, y: 0 },
      sprites: personSpritesFrames,
      frameLength: 2,
      frameSpeed: 20,
      head: 9,
      reverse: true,
      frameSize: personFrameSize,
    },
    runRight: {
      image: imgPersonFlip,
      velocity: { x: 1, y: 0 },
      sprites: personSpritesFrames,
      frameLength: 8,
      frameSpeed: 6,
      head: 7,
      reverse: true,
      frameSize: personFrameSize,
    },
    runLeft: {
      image: imgPerson,
      velocity: { x: -1, y: 0 },
      sprites: personSpritesFrames,
      frameLength: 8,
      frameSpeed: 6,
      head: 2,
      frameSize: personFrameSize,
    },
  };

  // Person state
  let tickPerson = 0;
  const resetTick = () => (tickPerson = 0);

  let cigarActions = {
    doCigar: () => {
      resetTick();
      detachCharaEvents();
    },

    afterCigar: () => {
      attachCharaEvents();
    },

    endTickTime: status.cigar.frameLength * status.cigar.frameSpeed,
  };

  const initialPosition = { x: 102, y: 102 };

  const outputCigar = Canvas.moveObj(initialPosition);

  // Loop function
  let currentOutput = {}; //  For Read

  const loopAnimation = (state, nextLoop = null) => {
    Canvas.loop(() => {
      backgroundLoop();

      currentOutput = outputCigar(state.frameSize)(state.velocity);

      Canvas.drawImage(state.image, frameCalc(state)(tickPerson), currentOutput);

      tickPerson++;

      if (nextLoop && nextLoop.trigger()) nextLoop.afterFunc();
    });
  };

  const cigarLoop = () => {
    cigarActions.doCigar();

    loopAnimation(status.cigar, {
      afterFunc: () => {
        cigarActions.afterCigar();
        loopAnimation(status.constantLeft);
      },

      trigger: () => tickPerson === cigarActions.endTickTime,
    });
  };

  // Event handler
  const charaWidth = personFrameSize.w * scale[0];
  const currentCharaX = () => currentOutput.x * scale[0];
  const canvasPosition = document
    .querySelector("canvas")
    ?.getBoundingClientRect();

  const deviceStartHandler = (e) => {
    e.preventDefault();

    const touchedX = canvasPosition
      ? Canvas.getTouchPosition(e).x - canvasPosition?.x
      : Canvas.getTouchPosition(e).x;

    if (touchedX < currentCharaX()) loopAnimation(status.runLeft);
    if (currentCharaX() < touchedX && touchedX < currentCharaX() + charaWidth)
      cigarLoop();
    if (currentCharaX() + charaWidth < touchedX) loopAnimation(status.runRight);
  };

  const deviceEndHandler = (e) => {
    const removedX = canvasPosition
      ? Canvas.getTouchPosition(e).x - canvasPosition?.x
      : Canvas.getTouchPosition(e).x;

    if (removedX < currentCharaX()) loopAnimation(status.constantLeft);
    if (removedX > currentCharaX()) loopAnimation(status.constantRight);
  };

  // Attach Event handler
  const attachCharaEvents = () => {
    Canvas.registerCanvasEvent(Canvas.deviceTrigger().start, deviceStartHandler, {
      passive: false,
    });
    Canvas.registerCanvasEvent(Canvas.deviceTrigger().end, deviceEndHandler);
    Canvas.registerEvent("keydown", (e) => {
      KeyDownHandler(
        {
          right: () => loopAnimation(status.runRight),
          left: () => loopAnimation(status.runLeft),
          space: (e) => {
            e.preventDefault();
            cigarLoop();
          },
        },
        e
      );
    });

    Canvas.registerEvent("keyup", (e) => {
      KeyUpHandler(
        {
          right: () => loopAnimation(status.constantRight),
          left: () => loopAnimation(status.constantLeft),
        },
        e
      );
    });
  };

  const detachCharaEvents = () => {
    Canvas.removeCanvasEvents();
    Canvas.removeEvents();
  };

  attachCharaEvents();

  // Execute loop
  loopAnimation(status.constantLeft);
};

export default yasumijikan;
