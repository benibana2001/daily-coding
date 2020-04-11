import Canv from '../CanvWriter.js'
import img_perse from '../assets/snow_perse.png'

const loopBackground = async() => {
  const imgPerse = Canv.createImg(img_perse) // w:360, h:180

  await Canv.waitResolveImgs()

  Canv.drawBG('black')
  Canv.fitBackgroundScale(360, 3)
  Canv.drawImage(
    imgPerse,
    {x: 0, y: 0, w: 360, h: 180},
    {x: 0, y: 0, w: 360, h: 180}
  )
}

export default loopBackground