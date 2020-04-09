import Canv from '../CanvWriter.js'

const moveBox = (c) => {
  const cw = Canv.canvas.width
  const ch = Canv.canvas.height
  let ox = 0
  let toggle = 1
  const box = { w: 200, h: 100, spd: cw / 100 }
  Canv.loop(() => {
    console.log('moveBox')
    c.clearRect(0, 0, cw, ch)
    c.fillRect(ox, 100, box.w, box.h)
    if (toggle === 1) ox += box.spd
    if (toggle === 0) ox -= box.spd
    if (ox >= (cw - box.w)) toggle = 0
    if (ox <= 0) toggle = 1
  })
}

export default moveBox