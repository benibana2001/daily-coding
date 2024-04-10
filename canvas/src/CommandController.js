import Canv from "./CanvWriter";

export class CommandController {
  constructor() {
    this.commands = new Map(); // 実行する関数を格納する
    this.Canv = Canv;
  }
  addCommands(commandArray) {
    for (const func of commandArray) {
      const name = func.name;
      this.commands.set(name, func);
    }
  }
  execute(name, canvasCtx) {
    Canv.removeCanvas();
    Canv.cancelCurrentCommand();
    Canv.setCanvas();

    const command = this.commands.get(name) || null;
    if (command) {
      command(canvasCtx);
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
