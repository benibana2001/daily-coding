import box01 from "./box01";
import { WebGLRenderer } from "three";

const canvasSize = {
  w: window.innerWidth,
  h: window.innerHeight,
};

const renderer = createRenderer();

box01(renderer);

function createRenderer() {
  const renderer = new WebGLRenderer();
  renderer.setSize(canvasSize.w, canvasSize.h);
  document.body.appendChild(renderer.domElement);
  return renderer;
}
