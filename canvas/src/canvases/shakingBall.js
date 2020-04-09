import Canv from '../CanvWriter.js'

const shakingBall = (c) => {
  const moveParticle = O => size => col => V => {
    O.x += V.x
    O.y += V.y
    return [O.x, O.y, size, col]
  }
  const createParticle = (p) => {
    Canv.drawArc(...p)
  }

  const o = { x: 0, y: 100 }
  const s = 10
  const col = Canv.randomRGBA(0.2)
  const baseVerocity = Canv.canvas.width / 500
  // we difine verocity as a function since that will be assign in a loop fnction
  const vx = () => Math.random() > 0.1 ? baseVerocity : - baseVerocity
  const vy = () => Math.random() > 0.5 ? 1 : - 1
  const particle = moveParticle(o)(s)(col)
  const bgcolor = Canv.randomRGBA('0.1')
  //
  // 
  Canv.loop(() => {
    Canv.drawBG(bgcolor)
    // calucurate and assgin verocity property
    const p = particle({ x: vx(), y: vy()})
    createParticle(p)
  })
}

export default shakingBall