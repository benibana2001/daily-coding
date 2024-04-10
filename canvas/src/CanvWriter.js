import { ImageLoader } from "./ImageLoader";
const imageLoader = new ImageLoader();

export default class Canv {
  static canvas = document.querySelector("#canvas-root canvas");
  static canvasRoot = document.querySelector("#canvas-root");
  static buttonRoot = document.getElementById("button-list");
  static ctx;
  static defaultCanvasSize = {
    w: 600,
    h: 600,
  };

  static commands = new Map();
  static currentCommandID;

  static events = [];
  static eventsCanvas = [];

  static createButton = (node, name, func) => {
    const wrapper = document.createElement("button");
    const nameArea = document.createElement("div");
    wrapper.setAttribute("data-func", name);
    nameArea.innerText = name;
    wrapper.addEventListener("click", func);
    wrapper.appendChild(nameArea);
    node.appendChild(wrapper);
  };

  static addCommands = (commands) => {
    for (const c of commands) {
      const name = c.name;
      Canv.commands.set(name, c);
      Canv.createButton(this.buttonRoot, name, () => Canv.execute(name));
    }
    Canv.defaultCommand(commands[commands.length - 1].name);
  };

  static defaultCommand = (name) => {
    name = location.search ? location.search.slice(1) : name;
    Canv.execute(name);
  };

  static waitResolveImgs = async () => await imageLoader.waitResolveImgs();
  static createImg = (path) => imageLoader.createImg(path);

  static execute = (name) => {
    Canv.removeOldData();
    Canv.setCanvas();
    if (Canv.canvas) Canv.ctx = Canv.canvas.getContext("2d");
    // Exec commands
    if (Canv.commands.get(name)) Canv.commands.get(name)(Canv.ctx);

    // button-active
    const buttons = document.querySelectorAll(`[data-func]`);
    buttons.forEach((elem) => {
      elem.classList.remove("button-active");
    });
    document
      .querySelector(`[data-func="${name}"]`)
      ?.classList.add("button-active");
  };

  static removeOldData = () => {
    // Remove old function, imgPromises, Events
    if (Canv.currentCommandID) {
      cancelAnimationFrame(Canv.currentCommandID);
      Canv.currentCommandID = 0;
    }

    imageLoader.clearImageLoaded();

    if (Canv.events) Canv.removeEvents();
    if (Canv.eventsCanvas) Canv.removeCanvasEvents();

    // REMOVE CANVAS ELEMENT
    /* p5.jsでCreateCanvasするとインラインにstyleの
     * widthが強制的に書かれて他の関数実行に影響を及ぼすため
     * canvasごと削除するのが合理的 */
    if (Canv.canvas) {
      Canv.canvas.remove();
      Canv.canvas = null;
    }
  };

  static setCanvas = (
    w = Canv.defaultCanvasSize.w,
    h = Canv.defaultCanvasSize.h
  ) => {
    if (!Canv.canvas) {
      Canv.canvas = document.createElement("canvas");
      if (Canv.canvasRoot) Canv.canvasRoot.appendChild(Canv.canvas);
    }
    setCanvSize(Canv.canvas)(w)(h);
  };

  static cancelLoop = () => {
    if (Canv.currentCommandID) cancelAnimationFrame(Canv.currentCommandID);
  };

  // Wrapper func for loop animation
  static loop = (f) => {
    if (Canv.currentCommandID) cancelAnimationFrame(Canv.currentCommandID);

    const requestAnimFrame = (() =>
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      ((callback) => window.setTimeout(callback, 1000 / 60)))();

    const repeat = () => {
      Canv.currentCommandID = requestAnimFrame(repeat);
      f();
    };

    Canv.currentCommandID = requestAnimFrame(repeat);
  };

  // Add event listner
  static registerEvent = (type, func, options = null) => {
    Canv.events.push([type, func]);
    window.addEventListener(type, func, options);
  };
  static removeEvents = () => {
    for (let e of Canv.events) {
      window.removeEventListener(e[0], e[1]);
    }
  };

  static registerCanvasEvent = (type, func, options = null) => {
    Canv.eventsCanvas.push([type, func]);
    Canv.canvas.addEventListener(type, func, options);
  };

  static removeCanvasEvents = () => {
    for (let e of Canv.eventsCanvas) {
      Canv.canvas.removeEventListener(e[0], e[1]);
    }
  };

  static drawBG = (color, clear = true) => {
    const canvas = Canv.ctx.canvas;
    const clearBG = () => Canv.ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (clear) clearBG();
    Canv.ctx.fillStyle = color;
    Canv.ctx.fillRect(0, 0, canvas.width, canvas.height);
  };
  static drawArc = (x, y, r, color) => {
    const context = Canv.ctx;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2);
    context.closePath();
    context.fillStyle = color;
    context.fill();
  };

  static drawRect = (x, y, w, h, color) => {
    const context = Canv.ctx;
    context.beginPath();
    context.rect(x, y, w, h);
    context.closePath();
    context.fillStyle = color;
    context.fill();
  };

  static drawText = (text, x, y, color) => {
    const context = Canv.ctx;
    context.fillStyle = color;
    context.fillText(text, x, y);
  };

  static measureText = (text) => Canv.ctx.measureText(text).width;

  static moveParticle = (O) => (size) => (col) => (V) => {
    O.x += V.x;
    O.y += V.y;
    return [O.x, O.y, size, col];
  };

  static moveObj = (O) => (Size) => (V) => {
    O.x += V.x;
    O.y += V.y;
    return { x: O.x, y: O.y, w: Size.w, h: Size.h };
  };
  static randomColor = () => Math.random() * 255;

  static randomRGBA = (opacity) =>
    `rgba(${Canv.randomColor()},${Canv.randomColor()},${Canv.randomColor()}, ${opacity})`;
  // Parse a json file generated by Aseprite
  //   Default: create each frame as a object, and generate a array with all frames.
  static parseAsperiteJSON = (data, toArray = false) =>
    parseAsperiteJSON(data, toArray);

  static drawImage = (source, inputFrame, outputImage = inputFrame) => {
    Canv.ctx.drawImage(
      source,
      ...[inputFrame.x, inputFrame.y, inputFrame.w, inputFrame.h],
      ...[outputImage.x, outputImage.y, outputImage.w, outputImage.h]
    );
  };

  // how to flip image: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/scale
  static flipImage = (image) => {
    const canv = document.createElement("canvas");
    const ctx = canv.getContext("2d");
    const newImage = new Image();
    canv.width = image.width;
    canv.height = image.height;

    if (!ctx) return;
    ctx.scale(-1, 1);
    ctx.drawImage(image, -image.width, 0);
    newImage.src = canv.toDataURL();
    return newImage;
  };

  static fitBackgroundScale = (imgOriginalWidth, maxScale) => {
    const context = Canv.ctx;
    const canvas = context.canvas;
    const cw = canvas.width;
    const x =
      cw / imgOriginalWidth <= maxScale ? cw / imgOriginalWidth : maxScale;
    const y = x;
    context.scale(x, y);
    return [x, y];
  };

  static frameCalc =
    (framesData, frameLength, speed, head, reverse = false) =>
    (tick) =>
      frameCalc(framesData, frameLength, speed, head, reverse)(tick);

  static deviceTrigger = () => deviceTrigger();
  static getTouchPosition = (e) => getTouchPosition(e);
}

const setCanvSize = (canvas) => (x) => (y) => {
  if (x) canvas.width = x;
  if (y) canvas.height = y;
};

function parseAsperiteJSON(data, toArray = false) {
  const frames = data.frames;
  let ary = [];
  const frametoary = (frameObj) => [
    frameObj.x,
    frameObj.y,
    frameObj.w,
    frameObj.h,
  ];
  for (let key of Object.keys(frames)) {
    let eachFrame = frames[key].frame;
    if (toArray) eachFrame = frametoary(eachFrame);
    ary.push(eachFrame);
  }
  return ary;
}

// TODO: Aseprite の関数群として一つにまとめるか
const frameCalc =
  (framesData, frameLength, speed, head, reverse = false) =>
  (tick) => {
    const current = tick % (frameLength * speed);
    for (let i = 0; i < frameLength; i++) {
      const currentFrame = reverse ? head - i : head + i;
      if (current < (i + 1) * speed) return framesData[currentFrame];
    }
  };


const deviceTrigger = () => ({
  start: isTouchDevice ? "touchstart" : "mousedown",
  end: isTouchDevice ? "touchend" : "mouseup",
});

const getTouchPosition = (e) => ({
  x: isTouchDevice ? e.changedTouches[0].pageX : e.pageX,
  y: isTouchDevice ? e.changedTouches[0].pageY : e.pageY,
});

const isTouchDevice = "ontouchend" in document;
