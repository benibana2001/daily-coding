class Resources {
  private imgs: Map<string, HTMLImageElement> = new Map()

  private loadingItems: Promise<boolean>[] = []

  private loadingPromise = (imgItem: {
    name: string
    url: string
  }): Promise<boolean> => {
    return new Promise((resolve) => {
      const imageElem = new Image()
      imageElem.src = imgItem.url
      imageElem.onload = () => {
        this.imgs.set(imgItem.name, imageElem)
        console.log(`resolved: ${(imgItem.name, imgItem.url)}`)
        resolve(true)
      }
    })
  }

  public loadImages = async (imgItems: { name: string; url: string }[]) => {
    for (let item of imgItems) {
      this.loadingItems.push(this.loadingPromise(item))
    }
    await Promise.all(this.loadingItems)
  }

  public getimg = (name: string) => this.imgs.get(name)

  public createVoidImage = async (
    size: number,
    name: string,
    color: string,
    offset = 0
  ) => {
    const imgItem = {
      name: name,
      url: createVoidImage(size, color, offset),
    }

    this.loadingItems.push(this.loadingPromise(imgItem))
    await Promise.all(this.loadingItems)
  }
}

const createVoidImage = (size: number, color: string, offset = 0): string => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const voidImage = new Image()

  canvas.width = canvas.height = size
  ctx.fillStyle = color
  ctx.fillRect(offset, offset, size - offset * 2, size - offset * 2)

  const url = canvas.toDataURL()
  return url

  // voidImage.src = canvas.toDataURL()
  // return voidImage
}

export default Resources
