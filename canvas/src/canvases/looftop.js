import Canvas from '../Canvas.js'
import looftopImage from '../assets/looftop.png'
import birdsImage from '../assets/birds.png'
const looftop = async () => {
  const imgLooftop = Canvas.createImg(looftopImage) //  w:200, h: 180
  const imgBirds = Canvas.createImg(birdsImage)
  await Canvas.waitResolveImgs()
  //
  const sourceLooftop = { x: 0, y: 0, w: imgLooftop.width, h: imgLooftop.height }
  const sourceBirds = { x: 0, y: 0, w: imgBirds.width, h: imgBirds.height }
  let birdsObject = Canvas.moveObj()()
  let birdsVelocity = {}
  const birdsStartPosition = () => ({
    x: -(imgBirds.width + 30),
    y: (() => 40 * Math.random())()
  })
  const endPosition = sourceLooftop.w
  const initialBirdsObj = () => Canvas.moveObj(birdsStartPosition())({ w: sourceBirds.w, h: sourceBirds.h })
  const initialBirdsVelocity = () => ({
    x: 0.4 + 0.6 * Math.random(),
    y: -0.06 + 0.09 * Math.random()
  })
  birdsObject = initialBirdsObj()
  birdsVelocity = initialBirdsVelocity()
  Canvas.drawBG('black')
  Canvas.fitBackgroundScale(200, 3)
  //
  Canvas.loop(() => {
    Canvas.drawImage(imgLooftop, sourceLooftop)
    const birdsOutput = birdsObject(birdsVelocity)
    if (birdsOutput.x > endPosition) {
      birdsObject = initialBirdsObj()
      birdsVelocity = initialBirdsVelocity()
    }
    Canvas.drawImage(
      imgBirds,
      sourceBirds,
      birdsOutput
    )
  })
}

export default looftop