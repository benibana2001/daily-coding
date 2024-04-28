import { CommandController } from "./CommandController.js";
import particle from "./canvases/particleSnow.js";
import dotPattern from "./canvases/dotPattern.js";
import yasumijikan from "./canvases/yasumijikan.js";
import p5_P2DRender from "./canvases/p5_p2dRender.js";
import commandPattern from "./canvases/commandPattern.js";
import { DisplayDOM } from "./DisplayDOM.js";
import p5_ray from "./canvases/p5_ray.js";
import p5_mouseParticle from "./canvases/p5_mouseParticle.js";
import p5_perlinNoise from "./canvases/p5_perlinNoise.js";
import p5_mouseAttractForceVec3 from "./canvases/p5_mouseAttractForceVec3.js";
import p5_imgEdit from "./canvases/p5_img.js";
import p5_video from "./canvases/p5_video.js";
import p5_randomSquare from "./canvases/p5_randomSquare.js";

const commands = [
  particle,
  dotPattern,
  yasumijikan,
  p5_P2DRender,
  commandPattern,
  p5_ray,
  p5_mouseParticle,
  p5_mouseAttractForceVec3,
  p5_perlinNoise,
  p5_imgEdit,
  p5_video,
  p5_randomSquare
];

const commandController = new CommandController();
commandController.addCommands(commands);
const displayDOM = new DisplayDOM(commandController);
displayDOM.createButtons();

const lastCommand = commandController.getLastCommand() // 最後に追加されたコマンド
const initialCommand = location.search ? location.search.slice(1) : lastCommand // 初回実行コマンドを決定

commandController.execute(initialCommand)
displayDOM.activateButton(initialCommand)