import Canvas from "./Canvas";

export class CommandController {
  constructor() {
    this.commands = new Map(); // 実行する関数を格納する
    this.Canvas = Canvas;
  }
  addCommands(commandArray) {
    for (const func of commandArray) {
      const name = func.name;
      this.commands.set(name, func);
    }
  }
  execute(name, canvasCtx) {
    Canvas.removeCanvas();
    Canvas.cancelCurrentCommand();
    Canvas.setCanvas();

    const command = this.commands.get(name) || null;
    if (command) {
      const p5Instance = command(canvasCtx);
      // p5.jsのイベントループを外から停止できるように参照を渡しておく
      Canvas.setP5Instance(p5Instance)
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
