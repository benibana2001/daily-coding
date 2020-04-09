/**
 * 
 * @param { CanvasRenderingContext2D } c 
 */
const chart = (c) => {
  const bgSize = { x: 400, y: 300 }
  const data = [16, 68, 20, 30, 54]
  const offset = 30
  const span = 24
  const barW = (bgSize.x - offset * 2 - span * (data.length - 1)) / data.length
  c.fillStyle = 'gray'
  c.fillRect(0, 0, bgSize.x, bgSize.y)
  c.fillStyle = 'blue'
  for (let i = 0; i < data.length; i++) {
    c.fillRect(offset + i * (barW + span), offset, barW, data[i] * 3)
  }
}

export default chart