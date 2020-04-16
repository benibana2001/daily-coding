import Canv from '../../CanvWriter.js'
import catData from './cat.js'
import catImage from '../../assets/cat.png'

const sprite = async (c) => {
  const imgCat = Canv.createImg(catImage)
  await Canv.waitResolveImgs()

  let tickC = 0
  //
  const sizeC = catData.frames['cat 0.aseprite'].spriteSourceSize.w
  let frameC = 0
  let xC = 0

  Canv.loop(() => {
    xC = frameC * sizeC
    const sourceC = [xC, 0, sizeC, sizeC]
    const displayAreaC = [0, 0, sizeC, sizeC]
    c.drawImage(imgCat, ...sourceC, ...displayAreaC)

    updateSprite()
  })
  const updateSprite = () => {
    tickC++
    if (tickC % 20 === 0) frameC++
    if (frameC >= 3) {
      tickC = 0
      frameC = 0
    }
  }
}
export default sprite
