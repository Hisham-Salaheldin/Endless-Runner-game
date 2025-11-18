import { MAP_CONFIG, GAME_CONFIG } from "../core/config.js";

export default class Map {
    constructor(ctx, key, img, index, gameSpeed)
    {
        this.ctx = ctx;
        this.img = img;
        this.map = this.getMapConfig(key);
        this.width = GAME_CONFIG.WIDTH;
        this.height = GAME_CONFIG.HEIGHT;
        this.x = 0;
        this.y = 0;
        this.speedModefier = this.map.speedModifier[index];
        this.speed = gameSpeed * this.speedModefier;
    }
    update()
    {
        if(this.x <= 0 - this.width)
            this.x = 0;
        this.x -= this.speed;
    }
    draw()
    {
        this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        this.ctx.drawImage(this.img, this.x + this.width, this.y, this.width, this.height);
    }
    getMapConfig(key){
        return MAP_CONFIG.find(map => map.key === key);
    }
}