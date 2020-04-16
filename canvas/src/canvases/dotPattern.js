import Canv from '../CanvWriter.js'

const dotPattern = (c) => {
  const cw = Canv.canvas.width
  const ch = Canv.canvas.height
  const particle = () => {
    return [
      Math.random() * cw,
      Math.random() * ch,
      ch > cw ? (Math.random() * cw) / 5 : (Math.random() * ch) / 5,
      Canv.randomRGBA(Math.random() * 1.0),
    ]
  }

  const particles = () => {
    let ary = []
    for (let i = 0; i < 30; i++) {
      ary.push(particle())
    }
    return ary
  }

  const drawParticles = () => {
    for (let i = 0, ps = particles(); i < ps.length; i++) {
      Canv.drawArc(...ps[i])
    }
  }

  const draw = () => {
    Canv.drawBG(Canv.randomRGBA(0.1))
    drawParticles()
  }

  draw()
  // Canv.canvas.addEventListener('click', () => draw())
  Canv.registerCanvasEvent('click', () => draw())
}

export default dotPattern
