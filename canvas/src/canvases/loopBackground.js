import Canv from '../CanvWriter.js'
import img_perse from '../assets/snow_perse.png'

const loopBackground = async () => {
  const imgPerse = Canv.createImg(img_perse) // w:360, h:180
  await Canv.waitResolveImgs()

  Canv.drawBG('black')
  Canv.canvas.width = 720
  Canv.fitBackgroundScale(360, 2)

  const size = { w: 360, h: 180 }

  const drawFunction = drawMoveImage()

  Canv.loop(drawFunction)

  function drawMoveImage() {
    let vx = 0
    const speed = 0.1

    return () => {
      vx += speed
      if (vx >= 360) {
        vx = 0
        console.log('finish a round')
      }

      const position = {
        fore: { x: -vx, y: 0 },
        back: { x: 360 - vx, y: 0 },
      }

      Canv.drawImage(
        imgPerse,
        { x: 0, y: 0, ...size },
        { ...position.fore, ...size }
      )

      Canv.drawImage(
        imgPerse,
        { x: 0, y: 0, ...size },
        { ...position.back, ...size }
      )
    }
  }
}

export default loopBackground
