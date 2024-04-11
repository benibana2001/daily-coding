import Canvas from '../../Canvas.js'
import catData from './cat.js'
import catImage from '../../assets/cat.png'

const sprite_2 = async (c) => {
  const imgCat = Canvas.createImg(catImage)
  await Canvas.waitResolveImgs()

  class Asep {
    static parse = (data) => {
      const frames = data.frames
      const frametoary = (frameObj) => [frameObj.x, frameObj.y, frameObj.w, frameObj.h]
      let ary = []
      for(let key of Object.keys(frames)) {
        ary.push(frametoary(frames[key].frame))
      }
      return ary
    }
    static frames = data => Asep.parse(data)
  }

  // TODO: frames と displaySize をひとつのオブジェクトで返すように
  const frames = Asep.frames(catData)
  const displayArea = [0, 0]
  const displaySize = [frames[0][2], frames[0][3]]

  let tick = 0
  Canvas.loop(() => {
    draw()
    updateSprite()
  })

  const draw = () => {
    let f = tick % 100
    let source
    if (0 <= f && f < 20) source = frames[0]
    if (20 <= f && f < 40) source = frames[1]
    if (40 <= f && f < 100) source = frames[2]
    c.drawImage(imgCat, ...source, ...displayArea, ...displaySize)
  }
  const updateSprite = () => tick++
}
export default sprite_2