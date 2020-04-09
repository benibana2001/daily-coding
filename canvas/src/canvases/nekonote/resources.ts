class Resources {
    private imgs: Map<string, HTMLImageElement> = new Map()
    private loadingItems: Promise<boolean>[] = []
    private loadingPromise = (imgItem: { name: string, url: string }): Promise<boolean> => {
        return new Promise(resolve => {
            const imageElem = new Image()
            imageElem.src = imgItem.url
            imageElem.onload = () => {
                this.imgs.set(imgItem.name, imageElem)
                console.log(`resolved: ${imgItem.name, imgItem.url}`)
                resolve(true)
            }
        })
    }
    public loadImages = async (imgItems: { name: string, url: string }[]) => {
        for (let item of imgItems) {
            this.loadingItems.push(this.loadingPromise(item))
        }
        await Promise.all(this.loadingItems)
    }
    public getimg = (name: string) => this.imgs.get(name)
}

export default Resources