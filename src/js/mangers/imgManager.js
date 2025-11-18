class ImagesManager {
    constructor (){
        this.images = {};
        this.mapLayerSrc = {};
    }
    loadImage(key, src){
            const img = new Image();
            img.src = src;
            img.onload = () => {
                this.images[key] = img;
                this.success("Image successfully loaded");
            }
    }
    getImage(key){
        return this.images[key];
    }
    loadMap(key,layersArr){
        this.mapLayerSrc[key] = [];
        layersArr.forEach((layerSrc) => {
            const layer = new Image();
            layer.src = layerSrc;
            this.mapLayerSrc[key].push(layer);
        });
        this.success("Map successfully loaded");
    }
    success(M){
        console.log(M);
    }
}

export default new ImagesManager();
