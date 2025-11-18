class   Spawn {
    constructor (){
        this.randomWeight = Math.random();
        this.acc = 0;
        this.enemyClass = null;
    }
    preventRepeat(enemyType, enemies)
    {
        let temp = enemyType.weight;
        return enemyType.weight = (enemies[enemies.length - 1] instanceof enemyType.classRef)
            && (enemies.length > 0)? 0 : temp;
    }
    random(enemyTypes,enemies){
        enemyTypes[1].weight = this.preventRepeat(enemyTypes[1], enemies);
        this.randomWeight = Math.random();
        this.acc = 0;
        for(let i = 0; i < enemyTypes.length; i++)
        {
            this.acc += enemyTypes[i].weight;
            if(this.randomWeight < this.acc)
                return this.enemyClass =  enemyTypes[i].classRef;
        }

    }
}

export default new Spawn();