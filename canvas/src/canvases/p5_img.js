import p5 from "p5";
import Canvas from "../Canvas";
import img_sunset from "../assets/sunset.jpg";

const p5_imgEdit = {
  name: "p5_imgEdit",
  renderer: "2d",
  func: () => {
    const cw = 600;
    const ch = 400;
    return new p5(sketch);

    function sketch(p) {
      const img = p.loadImage(img_sunset);
      const defaultValue = 10;
      const slider = p.createSlider(10, 100, defaultValue);

      p.setup = () => {
        p.createCanvas(cw, ch, p.p2d, Canvas.canvas);
        Canvas.canvas.style.width = null;
        Canvas.canvas.style.height = null;

        // sliderの位置をCanvas上に設定
        const rect = Canvas.canvas.getBoundingClientRect();
        slider.size(200);
        const offsetLeft = 10;
        const offsetheight = 10;

        p.frameRate(10);
        slider.position(rect.left + offsetLeft, rect.top + offsetheight);
      };
      p.draw = () => {
        p.background(0);

        const step = slider.value();
        // stepの値に応じてモザイク片のサイズを変更
        for (let j = 0; j < ch; j += step) {
          for (let i = 0; i < cw; i += step) {
            const col = img.get(i, j);
            p.fill(col);
            p.rect(i, j, step, step);
          }
        }
      };
    }
  },
};

export default p5_imgEdit;
