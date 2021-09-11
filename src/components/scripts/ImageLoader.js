export class ImageLoader {
    constructor(imagesToLoad) {
        this.imagesToLoad = imagesToLoad;
        this.images = {};
    }

    loadImages() {
        let promises = [];
        for (let name in this.imagesToLoad) {
            promises.push(this.load(name, this.imagesToLoad[name]))
        }
        return Promise.all(promises);
    }

    load(name, src) {
        return new Promise( (resolve, reject) => {
            const img = new Image();
            this.images[name] = img;
            img.onload = () => resolve(name); 
            img.onerror = (error) => reject(error);
            img.src = window.location.origin + src;
        } );
    }

}   