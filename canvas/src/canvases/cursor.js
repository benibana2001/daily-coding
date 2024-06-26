import Canvas from '../Canvas.js'
const cursor = () => {
  const p = Canvas.moveParticle({ x: 100, y: 100 })(30)('white')
  const move = ((speed) => ({
    up: { x: 0, y: -speed },
    down: { x: 0, y: speed },
    right: { x: speed, y: 0 },
    left: { x: -speed, y: 0 },
    constant: { x: 0, y: 0 }
  }))(8)
  let direction = move.constant
  Canvas.loop(() => {
    Canvas.drawBG('black')
    Canvas.drawArc(...p(direction))
  })
  const downHandler = (e) => {
    const isArwKey = e => e.key.slice(0, 5) === 'Arrow'
    console.log(e)
    if (isArwKey(e)) e.preventDefault()
    switch (e.key) {
      case 'ArrowUp':
        direction = move.up; break
      case 'ArrowDown':
        direction = move.down; break
      case 'ArrowRight':
        direction = move.right; break
      case 'ArrowLeft':
        direction = move.left; break
    }
  }
  Canvas.registerEvent('keydown', downHandler)
  Canvas.registerEvent('keyup', () => {direction = move.constant})
}

export default cursor