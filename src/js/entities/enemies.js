import { GAME_CONFIG, ENEMY_CONFIG } from "../core/config.js";
import  imgManager  from "../mangers/imgManager.js";

class Enemy 
{
    constructor(game)
    {
        this.game = game;
        this.gameWidth = GAME_CONFIG.WIDTH;
        this.gameHeight = GAME_CONFIG.HEIGHT;
        this.enemyConfig = ENEMY_CONFIG;
        this.frame = 0;
        this.frameCounter = 0;
        this.frameStager = 5;
        this.sxFrame = 0;
        this.syFrame = 0;
        this.direction = 1;
    }
    update()
    {
        this.delOutScope();
        this.frameManger();
        this.moveDirection();
    }
    draw()
    {
        this.game.ctx.strokeStyle = this.color;
        this.game.ctx.strokeRect(this.x, this.y, this.enemyWidth, this.enemyHeight);
        this.game.ctx.drawImage(this.image,
            this.sxFrame, this.syFrame,
            this.spriteWidth, this.spriteHeight,
            this.x, this.y,
            this.enemyWidth, this.enemyHeight);

    }
    moveDirection()
    {
        if(this.verticalDirection)
        {
            this.y += this.speed * this.direction;
            if(this.y > this.gameHeight - this.enemyHeight)
                this.direction = -1;
        }
        else
            this.x -= this.speed;
        
    }
    frameManger()
    {
        this.frame = Math.floor(this.frameCounter / this.frameStager) % this.spriteFrame;
        this.frameCounter++;
        this.sxFrame = this.frame * this.spriteWidth;
    }
    delOutScope()
    {
        if(this.verticalDirection)
        {
            if(this.y < 0 - this.gameHeight)
                this.markedForDeletion = true;
        }
        else
        {
            if (this.x < 0 - (this.gameWidth / 4))
                this.markedForDeletion = true;
        }
    }
    getEnemyConfigs(enemyKey)
    {
        return this.enemyConfig.Types.find(enemy => enemy.key === enemyKey);
    }
}

class Spider extends Enemy
{
    constructor(game)
    {
        super(game);
        this.spider = this.getEnemyConfigs("spider");
        this.key = this.spider.key;
        this.image = imgManager.getImage(this.key);
        this.color = this.spider.color;
        this.spriteWidth = this.spider.spriteWidth;
        this.spriteHeight = this.spider.spriteHeight;
        this.enemyWidth = this.spriteWidth * 0.3;
        this.enemyHeight = this.spriteHeight * 0.3;
        this.spriteFrame = this.spider.frames;
        this.x = Math.random() * (this.gameWidth - this.enemyWidth);
        this.y = 0 - this.spriteHeight;
        this.speed = 2;
        this.verticalDirection = true;
        this.markedForDeletion = false;
    }
}

class Worm extends Enemy
{
    constructor(game)
    {
        super(game);
        this.worm = this.getEnemyConfigs("worm");
        this.key = this.worm.key;
        this.image = imgManager.getImage(this.key);
        this.color = this.worm.color;
        this.spriteWidth = this.worm.spriteWidth;
        this.spriteHeight = this.worm.spriteHeight;
        this.enemyWidth = this.spriteWidth * 0.3;
        this.enemyHeight = this.spriteHeight * 0.3;
        this.spriteFrame = this.worm.frames;
        this.x = this.gameWidth;
        this.y = this.gameHeight - this.spriteHeight;
        this.speed = 2;
        this.verticalDirection = false;
        this.markedForDeletion = false;
    }
}

class Ghost extends Enemy
{
    constructor(game)
    {
        super(game);
        this.ghost = this.getEnemyConfigs("ghost");
        this.key = this.ghost.key;
        this.image = imgManager.getImage(this.key);
        this.color = this.ghost.color;
        this.spriteWidth = this.ghost.spriteWidth;
        this.spriteHeight = this.ghost.spriteHeight;
        this.enemyWidth = this.spriteWidth * 0.3;
        this.enemyHeight = this.spriteHeight * 0.3;
        this.spriteFrame = this.ghost.frames;
        this.x = this.gameWidth;
        this.y = Math.random() * (this.gameHeight - 300);
        this.speed = 2;
        this.verticalDirection = false;
        this.markedForDeletion = false;
    }
}

export {Spider, Worm, Ghost};