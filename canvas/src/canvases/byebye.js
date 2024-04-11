import Canvas from '../Canvas.js'
const byebye = (c) => {
  const Ps = (() => {
    let ps = []
    const row = 10
    const sz = Canvas.canvas.height / (row * 2) / 2
    const col = Canvas.canvas.width / sz
    const dencity = 2
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        const o = { x: (sz * 2 * j * dencity), y: (sz * i * 2 * dencity) + (sz) }
        const color = Canvas.randomRGBA(0.4)
        const p = Canvas.moveParticle(o)(sz)(color)
        ps.push(p)
      }
    }
    return ps
  })()
  let frame = 0
  let tick = 0
  //
  const vx = (frame) => {
    let byebye = Math.random() * 100
    switch (frame % 10) {
      case 0: return 1
      case 1: return 0
      case 2: return -1
      case 3: return 0
      case 4: return 0
      case 5: return byebye
      case 6: return 0
      case 7: return 0
      case 8: return -byebye
      case 9: return 0
    }
  }
  const vy = (frame) => {
    let byebye = Math.random() * 100
    switch (frame % 10) {
      case 0: return 0
      case 1: return 1
      case 2: return 0
      case 3: return -1
      case 4: return 0
      case 5: return byebye
      case 6: return 0
      case 7: return 0
      case 8: return -byebye
      case 9: return 0
    }
  }
  const updateCounter = () => {
    tick++
    if (tick % 40 === 0) frame++
  }
  const bgcolor = Canvas.randomRGBA(0.3)
  Canvas.loop(() => {
    Canvas.drawBG(bgcolor)
    updateCounter()
    Ps.forEach((p, i) => {
      if(i % 2 === 0) Canvas.drawArc(...p({ x: vx(frame), y: vy(frame) }))
      if(i % 2 === 1) Canvas.drawArc(...p({ x: -1 * vx(frame), y: -1 * vy(frame) }))
    })
  })
}

export default byebye