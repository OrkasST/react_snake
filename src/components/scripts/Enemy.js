import { Cube } from "./Cube";

export class Enemy extends Cube {
    constructor(color = '#000000', health = 5, attack = 1.5, armor = 0, width = 20, height = 40) {
        super(color, null, health);
        this.type = 'enemy';
        //this.currentHealth = health;
        this.armor = armor;
        this.attack = attack;
        this.width = width;
        this.height = height;
    }

    spawnEnemy(name = 'initial', x, y) {
        if ((this.spawnPoint[name].limit < this.body.length)
         && (this.spawnPoint[name].toSpawn === 0)) {
            this.body.push({
                x: this.spawnPoint[name].x
                    + Math.floor(
                        Math.random() * this.spawnPoint[name].diameter - (this.spawnPoint[name].diameter / 2)
                    ) || x,
                y: this.spawnPoint[name].y
                    + Math.floor(
                        Math.random() * this.spawnPoint[name].diameter - (this.spawnPoint[name].diameter / 2)
                    ) || y,
                health: this.health
            })
        } else if (this.spawnPoint[name].toSpawn > 0) {
            this.spawnPoint[name].toSpawn--;
        }
    }
}
