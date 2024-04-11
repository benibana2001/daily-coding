import Canvas from '../Canvas.js'
const gravity = () => {
  const size = 3
  const o = { x: 0 + size, y: 0 }
  const mass = 1
  const particle = Canvas.moveParticle(o)(size)('white')
  let acceleration = 9.8 / 60
  let v = () => ({x: 0, y: 0 + acceleration })
  Canvas.loop(() => {
    Canvas.drawBG('black')
    const p = particle({ x: v().x, y: v().y })
    Canvas.drawArc(...p)
  })
}
export default gravity