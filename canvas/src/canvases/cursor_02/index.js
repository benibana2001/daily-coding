import Canv from '../../CanvWriter.js'
import personData from './2020-03-24.js'
import personImage from '../../assets/2020-03-24.png'

const cursor_02 = async () => {
  const pathPerson = personImage
  const imgPerson = Canv.createImg(pathPerson)
  await Canv.waitResolveImgs()
  const imgPersonFlip = Canv.flipImage(imgPerson)
  // parse json data
  const framesData = Canv.parseAsperiteJSON(personData)
  const size = {
    w: framesData[0].w,
    h: framesData[0].h,
  }
  const defaultPosition = { x: 50, y: 50 }
  const output = Canv.moveObj({ ...defaultPosition })({ ...size })

  const status = {
    constantLeft: {
      image: imgPerson,
      velocity: { x: 0, y: 0 },
      frame: (tick) => Canv.frameCalc(framesData, 2, 20, 0)(tick),
    },
    constantRight: {
      image: imgPersonFlip,
      velocity: { x: 0, y: 0 },
      frame: (tick) => Canv.frameCalc(framesData, 2, 20, 9, true)(tick),
    },
    runRight: {
      image: imgPersonFlip,
      velocity: { x: 1, y: 0 },
      frame: (tick) => Canv.frameCalc(framesData, 8, 6, 7, true)(tick),
    },
    runLeft: {
      image: imgPerson,
      velocity: { x: -1, y: 0 },
      frame: (tick) => Canv.frameCalc(framesData, 8, 6, 2)(tick),
    },
  }
  let tick = 0
  let currentOutput = {} //  READONLY
  const loopAnimation = (state) => {
    Canv.loop(() => {
      Canv.drawBG('black')
      currentOutput = output(state.velocity)
      // console.log(currentOutput)
      Canv.drawImage(state.image, state.frame(tick), currentOutput)
      tick++
    })
  }
  //
  const scale = [3, 3]
  Canv.ctx.scale(...scale)
  loopAnimation(status.constantLeft)
  //
  Canv.registerEvent(
    'keydown',
    Canv.arrowKeydownHandler({
      right: () => loopAnimation(status.runRight),
      left: () => loopAnimation(status.runLeft),
    })
  )
  Canv.registerEvent(
    'keyup',
    Canv.keyupHandler((e) => {
      switch (e.key) {
        case 'ArrowRight':
          loopAnimation(status.constantRight)
          break
        case 'ArrowLeft':
          loopAnimation(status.constantLeft)
          break
      }
    })
  )
  //
  Canv.registerCanvasEvent(
    Canv.deviceTrigger().start,
    (e) => {
      e.preventDefault()
      const currentCharaX = (currentOutput.x + size.w / 2) * scale[0]
      if (Canv.getTouchPosition(e).x > currentCharaX)
        loopAnimation(status.runRight)
      if (Canv.getTouchPosition(e).x < currentCharaX)
        loopAnimation(status.runLeft)
    },
    { passive: false }
  )
  Canv.registerCanvasEvent(Canv.deviceTrigger().end, (e) => {
    const currentCharaX = (currentOutput.x + size.w / 2) * scale[0]
    if (Canv.getTouchPosition(e).x > currentCharaX)
      loopAnimation(status.constantRight)
    if (Canv.getTouchPosition(e).x < currentCharaX)
      loopAnimation(status.constantLeft)
  })
}
//
export default cursor_02
