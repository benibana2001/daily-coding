import Canvas from "./Canvas";

export class CommandController {
  constructor() {
    this.commands = new Map(); // 実行する関数を格納する
    this.Canvas = Canvas;
  }
  addCommands(commandArray) {
    for (const command of commandArray) {
      const name = command.name;
      this.commands.set(name, {
        func: command.func,
        renderer: command.renderer,
      });
    }
  }
  execute(name) {
    Canvas.removeCanvas();
    Canvas.cancelCurrentCommand();

    const command = this.commands.get(name) || null;

    if (command) {
      // コマンドのレンダラーを元にCanvasを作成する
      // webgl | 2d
      const renderer = command.renderer;
      if (renderer !== "webgl" && renderer !== "2d") {
        console.warn('Canvas renderer is not "webgl" or "2d" ');
        return;
      }
      console.log(`renderer: ${renderer}`)
      Canvas.setCanvas(null, null, renderer);

      // コマンド実行
      const p5Instance = command.func();
      // p5.jsのイベントループを外から停止できるように参照を渡しておく
      Canvas.setP5Instance(p5Instance);

    } else {
      console.warn("No Command was Executed.");
    }
  }

  defaultCommand(name) {
    name = location.search ? location.search.slice(1) : name;
    if (!name) {
      console.warn(`コマンド名：${name} はありません`);
      return null;
    }
    return name;
  }

  getLastCommand() {
    return Array.from(this.commands.keys()).pop();
  }
}
