import Canvas from "../Canvas.js";

const commandPattern ={};
commandPattern.name = 'commandPattern';
commandPattern.renderer = '2d'
commandPattern.func = async () => {
  Canvas.drawBG(Canvas.randomRGBA(0.2));

  class DisplayElement {
    constructor() {}
    update(){}
    render(){}
    _isMouseEnteredIn(e) {
      const ratioX = Canvas.defaultCanvasSize.w / Canvas.canvas.clientWidth;
      const ratioY = Canvas.defaultCanvasSize.h / Canvas.canvas.clientHeight;
      const mouseX =
        (Canvas.getTouchPosition(e).x - Canvas.canvas.offsetLeft) * ratioX;
      const mouseY =
        (Canvas.getTouchPosition(e).y - Canvas.canvas.offsetTop) * ratioY;
      if (!mouseX || !mouseY) return false;

      if (this.x - this.r <= mouseX && mouseX <= this.x + this.r) {
        if (this.y - this.r <= mouseY && mouseY <= this.y + this.r) {
          return true;
        }
      }
      return false;
    }
  }

  class Button extends DisplayElement {
    constructor(x, y, r, color, equipSlot, item) {
      super();
      this.r = r;
      this.x = x;
      this.y = y;
      this.initialColor = color; // 固定値として保持しておく
      this.color = color;
      this.activeColor = 'lightgray'
      this.equipSlot = equipSlot;
      this.item = item;
    }
    render() {
      Canvas.drawArc(this.x, this.y, this.r, this.color);
      Canvas.ctx.font = "14px sans-serif";
      const textPositionX = this.x - Canvas.measureText(this.item.name) / 2;
      const textPositionY = this.y + 7;
      Canvas.drawText(this.item.name, textPositionX, textPositionY, "white");
    }
    update(){
      console.log('update')
    }
    judgeClicked(e) {
      if (this._isMouseEnteredIn(e)) {
        this.equipSlot.changeItem(this.item);
      }
    }
    judgeEntered(e) {
      if (this._isMouseEnteredIn(e)) {
        // console.log("entered");
        this.color = 'red';
        this.render()
      } else {
        this.color = this.initialColor
        this.render()
      }
    }
  }

  class EquipSlot extends DisplayElement {
    constructor(x, y, r, item, messageBox) {
      super();
      this.initialColor = "darkgray";
      this.color = this.initialColor;
      this.x = x;
      this.y = y;
      this.r = r;
      this.item = item;
      this.messageBox = messageBox;
    }

    render() {
      Canvas.drawArc(this.x, this.y, this.r, this.color);
      const text = this.item ? this.item.name : "装備なし";
      Canvas.ctx.font = "30px sans-serif";
      const textPositionX = this.x - Canvas.measureText(text) / 2;
      const textPositionY = this.y + 15;

      Canvas.drawText(text, textPositionX, textPositionY, "#222222");
    }
    update(){
      console.log('update')
    }
    judgeClicked(e) {
      if (this._isMouseEnteredIn(e)) {
        this.fire();
      }
    }
    judgeEntered(e) {
      if (this._isMouseEnteredIn(e)) {
        this.color = "#eeeeee"
        this.render()
      }else {
        this.color = this.initialColor;
        this.render()
      }
    }
    fire() {
      if (!this.item) {
        const message = "アイテムを装備していない！";
        console.log(message);
        this.messageBox.setMessage(message);
        this.messageBox.render();
        return;
      }
      this.item.execute();
    }
    changeItem(item) {
      this.item = item;
      this.render();
      const message = `${this.item.name}を装備した！`;
      console.log(message);
      this.messageBox.setMessage(message);
      this.messageBox.render();
    }
  }

  class Item {
    constructor(name, messageBox) {
      this.name = name;
      this.messageBox = messageBox;
    }
    execute = function () {
      const message = `${this.name}で攻撃！`;
      console.log(message);
      messageBox.setMessage(message);
      messageBox.render();
    };
  }

  class MessageBox {
    constructor(x, y, w, h, color, textColor, message) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.color = color;
      this.textColor = textColor;
      this.message = message;
    }
    render() {
      Canvas.drawRect(this.x, this.y, this.w, this.h, this.color);
      Canvas.ctx.font = "30px sans-serif";
      Canvas.drawText(this.message, this.x + 15, this.y + 30, this.textColor);
    }
    setMessage(message) {
      this.message = message;
    }
  }

  const messageBox = new MessageBox(
    50,
    500,
    500,
    90,
    "#3333ff",
    "white",
    "アイテムを選択してください"
  );
  const slot = new EquipSlot(400, 250, 200, "", messageBox);
  const b1 = new Button(
    50,
    50,
    50,
    "#333333",
    slot,
    new Item("Axe", messageBox)
  );
  const b2 = new Button(
    50,
    150,
    50,
    "#333333",
    slot,
    new Item("Bow", messageBox)
  );
  const b3 = new Button(
    50,
    250,
    50,
    "#333333",
    slot,
    new Item("CrossBow", messageBox)
  );
  b1.render();
  b2.render();
  b3.render();
  slot.render();
  messageBox.render();

  Canvas.registerCanvasEvent(
    Canvas.deviceTrigger().start,
    (e) => {
      b1.judgeClicked(e);
      b2.judgeClicked(e);
      b3.judgeClicked(e);
      slot.judgeClicked(e);
    },
    {
      passive: false,
    }
  );

  Canvas.registerCanvasEvent("mousemove", (e) => {
    b1.judgeEntered(e);
    b2.judgeEntered(e);
    b3.judgeEntered(e);
    slot.judgeEntered(e);
  });
};

export default commandPattern;
