import Canv from '../CanvWriter.js'
import cigarFrameData from '../assets/cigar.js'
import personFrameData from '../assets/person.js'
import personImage from '../assets/person.png'
import cigarImage from '../assets/cigar.png'
const cigarettes = async () => {
  const imgPerson = Canv.createImg(personImage)
  const imgCigar = Canv.createImg(cigarImage)
  await Canv.waitResolveImgs()
  const imgCigarFlip = Canv.flipImage(imgCigar)
  const imgPersonFlip = Canv.flipImage(imgPerson)
  // parse
  const cigarSpritesFrames = Canv.parseAsperiteJSON(cigarFrameData)
  const personSpritesFrames = Canv.parseAsperiteJSON(personFrameData)
  const cigarFrameSize = {
    w: cigarSpritesFrames[0].w,
    h: cigarSpritesFrames[0].h,
  }
  const personFrameSize = {
    w: personSpritesFrames[0].w,
    h: personSpritesFrames[0].h,
  }
  // Draw, Loop
  const frameCalc = (statusObj) => (tick) => {
    const so = statusObj
    const current = tick % (so.frameLength * so.frameSpeed)
    for (let i = 0; i < so.frameLength; i++) {
      const currentFrame = so.reverse ? so.head - i : so.head + i
      if (current < (i + 1) * so.frameSpeed) return so.sprites[currentFrame]
    }
  }
  // Status
  const status = {
    cigar: {
      image: imgCigar,
      velocity: { x: 0, y: 0 },
      sprites: cigarSpritesFrames,
      frameLength: 5,
      frameSpeed: 80,
      head: 0,
      reverse: false,
      frameSize: cigarFrameSize,
    },
    constantLeft: {
      image: imgPerson,
      velocity: { x: 0, y: 0 },
      sprites: personSpritesFrames,
      frameLength: 2,
      frameSpeed: 20,
      head: 0,
      frameSize: personFrameSize,
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
    },
  }
  //
  let tick = 0
  const resetTick = () => (tick = 0)
  let cigaring = false
  let cigarAction = {
    doCigar: () => {
      resetTick()
      cigaring = true
      removeCharaEvent()
    },
    afterCigar: () => {
      cigaring = true
      attachCharaEvent()
    },
    endTick: status.cigar.frameLength * status.cigar.frameSpeed,
  }
  const initialPosition = { x: 0, y: 0 }
  const outputCigar = Canv.moveObj(initialPosition)
  const scale = Canv.fitBackgroundScale(200, 3)
  // Loop function
  let currentOutput = {} //  For Read
  const loopAnimation = (state, nextLoop = null) => {
    Canv.loop(() => {
      Canv.drawBG('black')
      currentOutput = outputCigar(state.frameSize)(state.velocity)
      Canv.drawImage(state.image, frameCalc(state)(tick), currentOutput)
      tick++
      if (nextLoop) {
        if (nextLoop.trigger()) {
          nextLoop.payload()
          loopAnimation(nextLoop.state)
        }
      }
    })
  }
  loopAnimation(status.constantLeft)
  const cigarLoop = () => {
    cigarAction.doCigar()
    loopAnimation(status.cigar, {
      state: status.constantLeft,
      payload: () => cigarAction.afterCigar(),
      trigger: () => tick === cigarAction.endTick,
    })
  }
  // Event handler
  const charaWidth = personFrameSize.w * scale[0]
  const currentCharaX = () => currentOutput.x * scale[0]
  const deviceStartHandler = (e) => {
    e.preventDefault()
    const touchedX = Canv.getTouchPosition(e).x
    if (touchedX < currentCharaX()) loopAnimation(status.runLeft)
    if (currentCharaX() < touchedX && touchedX < currentCharaX() + charaWidth)
      cigarLoop()
    if (currentCharaX() + charaWidth < touchedX) loopAnimation(status.runRight)
  }
  const deviceEndHandler = (e) => {
    const removedX = Canv.getTouchPosition(e).x
    if (removedX < currentCharaX()) loopAnimation(status.constantLeft)
    if (removedX > currentCharaX()) loopAnimation(status.constantRight)
  }
  const spacekeyHandler = (e) => {
    if (e.key === ' ') {
      e.preventDefault()
      cigarLoop()
    }
  }
  const keydownHandler = (e) => {
    spacekeyHandler(e)
    Canv.arrowKeydownHandler({
      right: () => loopAnimation(status.runRight),
      left: () => loopAnimation(status.runLeft),
    })(e)
  }
  const keyupHandler = (e) => {
    Canv.arrowKeyUpHandler({
      right: () => loopAnimation(status.constantRight),
      left: () => loopAnimation(status.constantLeft),
    })(e)
  }
  // Attach Event
  const attachCharaEvent = () => {
    Canv.registerCanvasEvent(Canv.deviceTrigger().start, deviceStartHandler, {
      passive: false,
    })
    Canv.registerCanvasEvent(Canv.deviceTrigger().end, deviceEndHandler)
    Canv.registerEvent('keydown', keydownHandler)
    Canv.registerEvent('keyup', keyupHandler)
  }
  const removeCharaEvent = () => {
    Canv.removeCanvasEvents()
    Canv.removeEvents()
  }
  attachCharaEvent()
}
export default cigarettes
