import { Spider, Worm, Ghost } from "../entities/enemies.js";

const GAME_CONFIG = 
{
    WIDTH: 500,
    HEIGHT: 720,
    FPS: 60,
    timeInterval: 3000, 
};

const ENEMY_CONFIG = 
{
    Types : [
                {
                    src: "src/assets/images/enemies/enemy_spider.png",
                    key: "spider",
                    classRef: Spider,
                    color: "purple",
                    weight: 0.1,
                    spriteWidth: 310,
                    spriteHeight: 175,
                    frames:6
                },
                {
                    src: "src/assets/images/enemies/enemy_worm.png",
                    key: "worm",
                    classRef: Worm,
                    color: "red",
                    weight: 0.3,
                    spriteWidth: 229,
                    spriteHeight: 171,
                    frames:6
                },
                {
                    src: "src/assets/images/enemies/enemy_ghost.png",
                    key: "ghost",
                    classRef: Ghost,
                    color: "black",
                    weight: 1,
                    spriteWidth: 261,
                    spriteHeight: 209,
                    frames:6
                }
            ],
};

const MAP_CONFIG = [
    {
        key : "lev1",
        layerSrc : [
            "src/assets/images/map/1_game_background/layers/1.png",
            "src/assets/images/map/1_game_background/layers/2.png",
            "src/assets/images/map/1_game_background/layers/3.png",
            "src/assets/images/map/1_game_background/layers/4.png",
            "src/assets/images/map/1_game_background/layers/5.png",
            "src/assets/images/map/1_game_background/layers/6.png",
            "src/assets/images/map/1_game_background/layers/7.png"
        ], 
        speedModifier : [ 0,0.1, 0.2, 0.4, 0.6, 0.8, 1],
    },

];

export  {GAME_CONFIG, ENEMY_CONFIG, MAP_CONFIG};