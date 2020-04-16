import Canv from '../CanvWriter.js'
const gravity = () => {
  const size = 3
  const o = { x: 0 + size, y: 0 }
  const mass = 1
  const particle = Canv.moveParticle(o)(size)('white')
  let acceleration = 9.8 / 60
  let v = () => ({ x: 0, y: 0 + acceleration })
  Canv.loop(() => {
    Canv.drawBG('black')
    const p = particle({ x: v().x, y: v().y })
    Canv.drawArc(...p)
  })
}
export default gravity
