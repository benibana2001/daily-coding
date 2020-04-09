import Canv from '../CanvWriter.js'
import cigarFrameData from '../assets/cigar.js'
import personFrameData from '../assets/person.js'
import img_cigar from '../assets/cigar.png'
import img_person from '../assets/person.png'
import img_looftop from '../assets/looftop.png'
import img_birds from '../assets/birds.png'
const yasumijikan = async () => {
  // prepare images
  const imgPerson = Canv.createImg(img_person)
  const imgCigar = Canv.createImg(img_cigar)
  const imgLooftop = Canv.createImg(img_looftop) //  w:200, h: 180
  const imgBirds = Canv.createImg(img_birds)
  await Canv.waitResolveImgs()
  const imgPersonFlip = Canv.flipImage(imgPerson)
  // parse Aseprite frame data
  const cigarSpritesFrames = Canv.parseAsperiteJSON(cigarFrameData)
  const personSpritesFrames = Canv.parseAsperiteJSON(personFrameData)
  const sourceLooftop = { x: 0, y: 0, w: imgLooftop.width, h: imgLooftop.height }
  const sourceBirds = { x: 0, y: 0, w: imgBirds.width, h: imgBirds.height }
  // Person size calculate
  const cigarFrameSize = { w: cigarSpritesFrames[0].w, h: cigarSpritesFrames[0].h }
  const personFrameSize = { w: personSpritesFrames[0].w, h: personSpritesFrames[0].h }
  //
  // birds object
  let birdsObject = Canv.moveObj()()
  let birdsVelocity = {}
  const birdsStartPosition = () => ({
    x: -(imgBirds.width + 30),
    y: (() => 40 * Math.random())()
  })
  const endPosition = sourceLooftop.w
  const initialBirdsObj = () => Canv.moveObj(birdsStartPosition())({ w: sourceBirds.w, h: sourceBirds.h })
  const initialBirdsVelocity = () => ({
    x: 0.4 + 0.6 * Math.random(),
    y: -0.06 + 0.09 * Math.random()
  })
  birdsObject = initialBirdsObj()
  birdsVelocity = initialBirdsVelocity()
  // Set context scale
  const scale = Canv.fitBackgroundScale(200, 3)
  // draw bird and background
  const backgroundLoop = () => {
    Canv.drawImage(imgLooftop, sourceLooftop)
    const birdsOutput = birdsObject(birdsVelocity)
    if (birdsOutput.x > endPosition) {
      birdsObject = initialBirdsObj()
      birdsVelocity = initialBirdsVelocity()
    }
    Canv.drawImage(
      imgBirds,
      sourceBirds,
      birdsOutput
    )
  }
  // Person frame
  const frameCalc = statusObj => tick => {
    const so = statusObj
    const current = tick % (so.frameLength * so.frameSpeed)
    for (let i = 0; i < so.frameLength; i++) {
      const currentFrame = so.reverse ? so.head - i : so.head + i
      if (current < (i + 1) * so.frameSpeed) return so.sprites[currentFrame]
    }
  }
  // Person status Actions
  const status = {
    cigar: {
      image: imgCigar,
      velocity: { x: 0, y: 0 },
      sprites: cigarSpritesFrames,
      frameLength: 5,
      frameSpeed: 80,
      head: 0,
      reverse: false,
      frameSize: cigarFrameSize
    },
    constantLeft: {
      image: imgPerson,
      velocity: { x: 0, y: 0 },
      sprites: personSpritesFrames,
      frameLength: 2,
      frameSpeed: 20,
      head: 0,
      frameSize: personFrameSize
    },
    constantRight: {
      image: imgPersonFlip,
      velocity: { x: 0, y: 0 },
      sprites: personSpritesFrames,
      frameLength: 2,
      frameSpeed: 20,
      head: 9,
      reverse: true,
      frameSize: personFrameSize,
    },
    runRight: {
      image: imgPersonFlip,
      velocity: { x: 1, y: 0 },
      sprites: personSpritesFrames,
      frameLength: 8,
      frameSpeed: 6,
      head: 7,
      reverse: true,
      frameSize: personFrameSize,
    },
    runLeft: {
      image: imgPerson,
      velocity: { x: -1, y: 0 },
      sprites: personSpritesFrames,
      frameLength: 8,
      frameSpeed: 6,
      head: 2,
      frameSize: personFrameSize,
    }
  }
  // Person state
  let tickPerson = 0
  const resetTick = () => tickPerson = 0
  let cigaring = false
  let cigarActions = {
    doCigar: () => {
      resetTick()
      cigaring = true
      detachCharaEvents()
    },
    afterCigar: () => {
      cigaring = true
      attachCharaEvents()
    },
    endTickTime: status.cigar.frameLength * status.cigar.frameSpeed,
  }
  const initialPosition = { x: 102, y: 102 }
  const outputCigar = Canv.moveObj(initialPosition)
  // Loop function
  let currentOutput = {} //  For Read
  const loopAnimation = (state, nextLoop = null) => {
    Canv.loop(() => {
      backgroundLoop()
      currentOutput = outputCigar(state.frameSize)(state.velocity)
      Canv.drawImage(state.image, frameCalc(state)(tickPerson), currentOutput)
      tickPerson++
      if (nextLoop && nextLoop.trigger()) nextLoop.afterFunc()
    })
  }
  const cigarLoop = () => {
    cigarActions.doCigar()
    loopAnimation(status.cigar, {
      afterFunc: () => {
        cigarActions.afterCigar()
        loopAnimation(status.constantLeft)
      },
      trigger: () => tickPerson === cigarActions.endTickTime
    })
  }
  // Event handler
  const charaWidth = personFrameSize.w * scale[0]
  const currentCharaX = () => currentOutput.x * scale[0]
  const deviceStartHandler = e => {
    e.preventDefault()
    const touchedX = Canv.getTouchPosition(e).x
    if (touchedX < currentCharaX()) loopAnimation(status.runLeft)
    if (currentCharaX() < touchedX && touchedX < currentCharaX() + charaWidth) cigarLoop()
    if (currentCharaX() + charaWidth < touchedX) loopAnimation(status.runRight)
  }
  const deviceEndHandler = e => {
    const removedX = Canv.getTouchPosition(e).x
    if (removedX < currentCharaX()) loopAnimation(status.constantLeft)
    if (removedX > currentCharaX()) loopAnimation(status.constantRight)
  }
  const spaceKeyHandler = e => {
    if (e.key === ' ') {
      e.preventDefault()
      cigarLoop()
    }
  }
  const keydownHandler = e => {
    spaceKeyHandler(e)
    Canv.arrowKeydownHandler({
      right: () => loopAnimation(status.runRight),
      left: () => loopAnimation(status.runLeft)
    })(e)
  }
  const keyupHandler = e => {
    Canv.arrowKeyUpHandler({
      right: () => loopAnimation(status.constantRight),
      left: () => loopAnimation(status.constantLeft)
    })(e)
  }
  // Attach Event handler
  const attachCharaEvents = () => {
    Canv.registerCanvasEvent(Canv.deviceTrigger().start, deviceStartHandler, { passive: false })
    Canv.registerCanvasEvent(Canv.deviceTrigger().end, deviceEndHandler)
    Canv.registerEvent('keydown', keydownHandler)
    Canv.registerEvent('keyup', keyupHandler)
  }
  const detachCharaEvents = () => {
    Canv.removeCanvasEvents()
    Canv.removeEvents()
  }
  attachCharaEvents()
  // Execute loop
  loopAnimation(status.constantLeft)
}
export default yasumijikan