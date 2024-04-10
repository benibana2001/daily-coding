import Canv from "./CanvWriter";

export class DisplayDOM {
  constructor(commandController) {
    this.commandController = commandController;
    this.buttonRoot = document.getElementById("button-list");
  }
  createButtons() {
    const createButton = (name, func) => {
      const wrapper = document.createElement("button");
      const nameArea = document.createElement("div");
      wrapper.setAttribute("data-func", name);
      nameArea.innerText = name;
      wrapper.addEventListener("click", func);
      wrapper.appendChild(nameArea);
      this.buttonRoot.appendChild(wrapper);
    };

    const buttonHandler = (name) => {
      this.commandController.execute(name, Canv.ctx);
      this.activateButton(name);
    };

    for (let command of this.commandController.commands) {
      console.log(command);
      const name = command[0];
      createButton(name, buttonHandler.bind(null, name));
    }
  }

  activateButton(name) {
    const buttons = document.querySelectorAll(`[data-func]`);
    buttons.forEach((elem) => {
      elem.classList.remove("button-active");
    });
    document
      .querySelector(`[data-func="${name}"]`)
      ?.classList.add("button-active");
  }
}
