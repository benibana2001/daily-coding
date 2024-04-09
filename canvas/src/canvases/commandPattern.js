import Canv from "../CanvWriter.js";

const commandPattern = async () => {
  Canv.drawBG(Canv.randomRGBA(0.2));

  class Button {
    constructor(x, y, r, color, equipSlot, item) {
      this.r = r;
      this.x = x;
      this.y = y;
      this.color = color;
      this.equipSlot = equipSlot;
      this.item = item;
    }
    render() {
      Canv.drawArc(this.x, this.y, this.r, this.color);
      Canv.ctx.font = '14px sans-serif'
      const textPositionX = this.x - Canv.measureText(this.item.name) / 2;
      const textPositionY = this.y + 7
      Canv.drawText(this.item.name, textPositionX, textPositionY, "white");
    }
    judgeClick(e) {
      if (this.isClicked(e)) {
        this.equipSlot.changeItem(this.item);
      }
    }
    isClicked(e) {
      const ratioX = Canv.defaultCanvasSize.w / Canv.canvas.clientWidth;
      const ratioY = Canv.defaultCanvasSize.h / Canv.canvas.clientHeight;
      const touchedX =
        (Canv.getTouchPosition(e).x - Canv.canvas.offsetLeft) * ratioX;
      const touchedY =
        (Canv.getTouchPosition(e).y - Canv.canvas.offsetTop) * ratioY;
      if (!touchedX || !touchedY) return false;

      /** 領域内をクリックしたとき */
      if (this.x - this.r <= touchedX && touchedX <= this.x + this.r) {
        if (this.y - this.r <= touchedY && touchedY <= this.y + this.r) {
          return true;
        }
      }
      return false;
    }
  }

  class EquipSlot {
    color = "darkgray";
    constructor(x, y, r, item, messageBox) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.item = item;
      this.messageBox = messageBox
    }
    isClicked(e) {
      const ratioX = Canv.defaultCanvasSize.w / Canv.canvas.clientWidth;
      const ratioY = Canv.defaultCanvasSize.h / Canv.canvas.clientHeight;
      const touchedX =
        (Canv.getTouchPosition(e).x - Canv.canvas.offsetLeft) * ratioX;
      const touchedY =
        (Canv.getTouchPosition(e).y - Canv.canvas.offsetTop) * ratioY;
      if (!touchedX || !touchedY) return false;

      /** 領域内をクリックしたとき */
      if (this.x - this.r <= touchedX && touchedX <= this.x + this.r) {
        if (this.y - this.r <= touchedY && touchedY <= this.y + this.r) {
          return true;
        }
      }
      return false;
    }
    render() {
      Canv.drawArc(this.x, this.y, this.r, this.color);
      const text = this.item ? this.item.name : '装備なし'
      Canv.ctx.font = '30px sans-serif'
      const textPositionX = this.x - Canv.measureText(text) / 2;
      const textPositionY = this.y + 15
      
      Canv.drawText(text, textPositionX, textPositionY, "#222222");
    }
    judgeClick(e) {
      if (this.isClicked(e)) {
        this.fire();
      }
    }
    fire() {
      if (!this.item) {
        const message = "アイテムを装備していない！"
        console.log(message)
        this.messageBox.setMessage(message)
        this.messageBox.render()
        return;
      }
      this.item.execute();
    }
    changeItem(item) {
      this.item = item;
      this.render()
      const message = `${this.item.name}を装備した！`
      console.log(message)
      this.messageBox.setMessage(message)
      this.messageBox.render()
    }
  }

  class Item {
    constructor(name, messageBox) {
      this.name = name;
      this.messageBox = messageBox
    }
    execute = function () {
      const message = `${this.name}で攻撃！`
      console.log(message)
      messageBox.setMessage(message)
      messageBox.render()
    };
  }

  class MessageBox {
    constructor(x, y, w, h, color, textColor, message){
      this.x = x
      this.y = y
      this.w = w
      this.h = h
      this.color = color
      this.textColor = textColor
      this.message = message 
    }
    render(){
      Canv.drawRect(this.x, this.y, this.w, this.h, this.color)
      Canv.ctx.font = '30px sans-serif'
      Canv.drawText(this.message, this.x + 15, this.y + 30,this.textColor)
    }
    setMessage(message){
      this.message = message
    }
  }

  const messageBox = new MessageBox(50, 500, 500, 90, '#3333ff', 'white', 'アイテムを選択してください')
  const slot = new EquipSlot(400, 250, 200, "", messageBox);
  const b1 = new Button(50, 50, 50, "#333333", slot, new Item("Axe", messageBox));
  const b2 = new Button(50, 150, 50, "#333333", slot, new Item("Bow", messageBox));
  const b3 = new Button(50, 250, 50, "#333333", slot, new Item("CrossBow", messageBox));
  b1.render();
  b2.render();
  b3.render();
  slot.render()
  messageBox.render()

  Canv.registerCanvasEvent(
    Canv.deviceTrigger().start,
    (e) => {
      b1.judgeClick(e);
      b2.judgeClick(e);
      b3.judgeClick(e);
      slot.judgeClick(e);
    },
    {
      passive: false,
    }
  );
};

export default commandPattern;
