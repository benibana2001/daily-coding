import box01 from "./box01";
import box02 from "./box02";
import { WebGLRenderer } from "three";

const canvasSize = {
  w: window.innerWidth,
  h: window.innerHeight,
};

const renderer = createRenderer();
document.body.appendChild(createButton("btn01", () => box01(renderer)));
document.body.appendChild(createButton("btn02", () => box02(renderer)));


function createRenderer() {
  const renderer = new WebGLRenderer();
  renderer.setSize(canvasSize.w, canvasSize.h);
  document.body.appendChild(renderer.domElement);
  return renderer;
}

function createButton(name: string, func: EventListener) {
  const button = document.createElement("button");
  button.innerText = name;
  button.addEventListener("click", func);
  return button;
}
