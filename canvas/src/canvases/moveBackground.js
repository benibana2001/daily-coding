import Canv from '../CanvWriter.js'
import img_perse from '../assets/snow_perse.png'

const moveBackground = async () => {
  const imgPerse = Canv.createImg(img_perse) // w:360, h:180
  await Canv.waitResolveImgs()

  Canv.canvas.width = (window.innerWidth > 720)
    ? 720 :
    window.innerWidth

  Canv.fitBackgroundScale(360, 2)

  const size = { w: 360, h: 180 }

  const drawMoveBackground = drawMoveImage(0.1)
  const drawNotMoveBackground = drawMoveImage(0)

  let startX = 0
  drawNotMoveBackground()

  attachEvents()

  // Event
  function keydownHandler(e) {
    Canv.arrowKeydownHandler({
      right: () => {
        Canv.loop(drawMoveBackground)
      }

    })(e)
  }

  function keyupHandler(e) {
    Canv.arrowKeyUpHandler({
      right: () => {
        Canv.loop(drawNotMoveBackground)
      }
    })(e)
  }

  function attachEvents() {
    Canv.registerEvent('keydown', keydownHandler)
    Canv.registerEvent('keyup', keyupHandler)
  }

  function drawMoveImage(speed) {
    return () => {
      startX += speed

      updatePosition()

      const position = {
        O: { x: 0, y: 0 },
        fore: { x: -startX, y: 0 },
        back: { x: 360 - startX, y: 0 }
      }

      const defaultSource = ({ ...position.O, ...size })

      Canv.drawImage(
        imgPerse,
        defaultSource,
        { ...position.fore, ...size }
      )

      Canv.drawImage(
        imgPerse,
        defaultSource,
        { ...position.back, ...size }
      )
    }

    function updatePosition() {
      if (startX >= 360) {
        startX = 0
        console.log('finish a round')
      }
    }

  }
}

export default moveBackground