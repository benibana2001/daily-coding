import p5 from "p5";
import Canvas from "../Canvas";

const p5_perlinNoise = () =>{
  let cw = 800, ch = 400;
  return new p5(sketch);

  function sketch(p) {
    p.setup = () => {
      p.createCanvas(cw, ch, p5.P2D, Canvas.canvas)
      Canvas.canvas.style.width = null;
      Canvas.canvas.style.height = null;
      p.background(255) 
      p.stroke(1);
      const step = 10;
      const noiseScale = 0.01
      for(let j = 0; j < ch; j+=step){
        for(let i = 0; i < cw; i+=step){
          const angle = p.noise(i * noiseScale, j * noiseScale) * p.PI * 2.0
          p.push()

          p.translate(i, j)
          p.rotate(angle)
          p.line(-step/2.0, 0, step/2.0, 0)

          p.pop()
        }
      }
    }
    // p.draw = () => {}
    return p;
  }
}
export default p5_perlinNoise