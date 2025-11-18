import { canvas,ctx } from "./const.js";
import Map  from "../entities/map.js";
import { GAME_CONFIG,ENEMY_CONFIG,MAP_CONFIG } from "./config.js";
import imgManager from "../mangers/imgManager.js";
import spawn from "./spawner.js"

class   Game 
{
    constructor ()
    {
        this.canvas = canvas;
        this.ctx = ctx;
        this.enemyConfig = ENEMY_CONFIG;
        this.width = GAME_CONFIG.WIDTH;
        this.height = GAME_CONFIG.HEIGHT;
        this.timeInterval = GAME_CONFIG.timeInterval;
        this.timeCounter = 0;
        this.lastTime = 0;
        this.deltaTime = 0;
        this.maplayers = [];
        this.enemies = [];
        this.enemyTypes = this.enemyConfig.Types;
        this.enemyClass = null;
        this.speed = 5;
        this.isRuning = false;
    }
    start ()
    {
        this.isRuning = true;
        this.loadAssets();
        this.mapManager();
        this.loop(this.lastTime);
    }
    loop (timestamp)
    {
        if(!this.isRuning) return;
        this.ctx.clearRect(0,0,this.width,this.height);
        this.deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;
        this.update(this.deltaTime);
        this.render(); 
        requestAnimationFrame((timestamp) => this.loop(timestamp));
    }
    update (deltaTime)
    {
        this.timeSpawn(deltaTime);
        [...this.maplayers, ...this.enemies].forEach(obj => obj.update());
        this.filterEnemies();
    }
    render ()
    {
        [...this.maplayers, ...this.enemies].forEach(obj => obj.draw());
    }
    mapManager()
    {
        imgManager.mapLayerSrc["lev1"].forEach((layer,index) => {
            this.maplayers.push( new Map(this.ctx, "lev1", layer, index, this.speed));
        });
    }
    timeSpawn(deltaTime)
    {
        if(this.timeCounter > this.timeInterval)
        {
            this.#addEnemey();
            this.timeCounter = 0;
        }
        this.timeCounter += deltaTime;
    }
    filterEnemies()
    {
        this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
    }
    loadAssets(){
        this.enemyTypes.forEach(img => {
            imgManager.loadImage(img.key, img.src)
        });
        MAP_CONFIG.forEach(map => {
            imgManager.loadMap(map.key, map.layerSrc);   
        });
    }
    #addEnemey ()
    {
        this.enemyClass = spawn.random(this.enemyTypes, this.enemies);
        this.enemies.push(new this.enemyClass(this));
    }
}
export default new Game();