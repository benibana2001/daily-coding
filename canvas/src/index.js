import Canv from "./CanvWriter.js";
import particle from "./canvases/particleSnow.js";
import dotPattern from "./canvases/dotPattern.js";
import yasumijikan from "./canvases/yasumijikan.js";
import p5_P2DRender from "./canvases/image_mosaic.js";
import commandPattern from "./canvases/commandPattern.js";

const commands = [
  particle,
  dotPattern,
  yasumijikan,
  p5_P2DRender,
  commandPattern,
];
Canv.addCommands(commands);
