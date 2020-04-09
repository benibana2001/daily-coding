import Canv from '../CanvWriter.js'
/**
 * 
 * @param {CanvasRenderingContext2D} c 
 */
const aroundBox = (c) => {
  const cw = Canv.canvas.width
  const ch = Canv.canvas.height
  let ox = 0
  let oy = 0
  let toggle = 1
  const box = { w: 200, h: 100, spd: cw / 100 }

  c.fillStyle = 'blue'
  Canv.loop(() => {
    console.log('yeah')
    c.clearRect(0, 0, cw, ch)
    c.fillRect(ox, oy, box.w, box.h)
    if (toggle === 1) {
      ox += box.spd
      if (ox >= (cw - box.w)) toggle = 2
    }
    if (toggle === 2) {
      oy += box.spd
      if (oy >= (ch - box.h)) toggle = 3
    }
    if (toggle === 3) {
      ox -= box.spd
      if (ox <= 0) toggle = 4
    }
    if (toggle === 4) {
      oy -= box.spd
      if (oy <= 0) toggle = 1
    }
  })
}

export default aroundBox