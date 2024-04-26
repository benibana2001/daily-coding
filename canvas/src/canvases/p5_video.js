import p5 from "p5";
import Canvas from "../Canvas";
import suyasuya from "../assets/suyasuya.mp4";

const p5_video = {
  name: "p5_video",
  renderer: "webgl",
  func: () => {
    const cw = 200;
    const ch = 200;

    return new p5(sketch);
    function sketch(p) {
      const slider = p.createSlider(1, 100, 20);

      const movie = p.createVideo(suyasuya);
      movie.hide();
      movie.x = Canvas.canvas.getBoundingClientRect().left;
      movie.y = Canvas.canvas.getBoundingClientRect().top;

      /**
       * VIMEOのソースをリンク表示
       */
      const linkUrl = "https://vimeo.com/883011589";
      const linkText = `Original Source: ${linkUrl}`;
      const videoLink = p.createA(linkUrl, linkText);

      // DOM表示
      movie.position(movie.x, movie.y);
      videoLink.parent(Canvas.canvasRoot);

      p.setup = () => {
        p.frameRate(1);
        p.createCanvas(cw, ch, p.WEBGL, Canvas.canvas);
        p.background(255);
        Canvas.canvas.style.width = null;
        Canvas.canvas.style.height = null;

        // sliderの位置をCanvas上に設定
        slider.size(200);

        // 表示
        const div = p.createDiv();
        slider.parent(div);
        div.parent(Canvas.canvasRoot);

        /**
         * Chromeのポリシー上、autoplayする際はミュートである必要がある
         */
        movie.elt.muted = true;

        movie.loop();
      };

      p.draw = () => {
        const step = slider.value();

        p.noStroke();

        /**
         * WEBGL表示は中心が(center, center)なので調整
         */
        p.translate(-cw / 2, -ch / 2);

        for (let j = 0; j < movie.height; j += step) {
          for (let i = 0; i < movie.width; i += step) {
            const col = movie.get(i, j);
            p.fill(col);
            p.ellipse(i, j, step, step);
          }
        }
      };
    }
  },
};

export default p5_video;
