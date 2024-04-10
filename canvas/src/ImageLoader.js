export class ImageLoader {
  imgLoaded = []
  constructor(){}
  clearImageLoaded(){
    this.imgLoaded = []
  }
  async waitResolveImgs(){
    await Promise.all(this.imgLoaded)
  }
  createImg(path) {
    const img = new Image();
    const promise = new Promise((resolve) => {
      img.src = path;
      img.onload = () => resolve(true);
      console.log(`resolved: ${path}`);
    });
    this.imgLoaded.push(promise);
    return img;
  }
}