export class Cube {
    constructor(color='#FF0000', size=20, health=1) {
        this.color = color;
        this.size = size;
        this.spawnLimit = 20;
        this.spawnDiameter = 600;
        this.spawnInterval = 2500;
        this.spawnSpeed = 1;
        this.spawnPoint = {
            initial: {
                x: 120,
                y: 120
            }
        }
        this.body = [];
        this.health = health;
        this.image = null;
    }

    spawnCube(name = 'initial', x, y) {
        if (this.spawnPoint[name].toSpawn === 0) {
            if(this.body.length < this.spawnPoint[name].limit) {
                this.body.push({
                    x: x || this.spawnPoint[name].x + Math.floor(Math.random()*this.spawnPoint[name].diameter-(this.spawnPoint[name].diameter/2)),
                    y: y || this.spawnPoint[name].y + Math.floor(Math.random()*this.spawnPoint[name].diameter-(this.spawnPoint[name].diameter/2))
                });
                this.spawnPoint[name].toSpawn = this.spawnPoint[name].speed;
            }
        } else if(this.spawnPoint[name].toSpawn > 0) {
            this.spawnPoint[name].toSpawn--;
        }
    }

    setSpawnPoint(x, y, player, diameter = this.spawnDiameter, limit = this.spawnLimit, speed = this.spawnSpeed) {
        this.spawnPoint.initial.x = player.spawnPoint.x > 0
            ? x - player.spawnPoint.x
            : x - player.defaultX;
        this.spawnPoint.initial.y = player.spawnPoint.y > 0
        ? y - player.spawnPoint.y
        : y - player.defaultY;
        this.spawnPoint.initial.diameter = diameter;
        this.spawnPoint.initial.limit = limit;
        this.spawnPoint.initial.speed = speed;
        this.spawnPoint.initial.toSpawn = speed;
    }

    setSpawnPapams(name, diameter, limit, speed) {
        this.spawnPoint[name].limit = limit;
        this.spawnPoint[name].diameter = diameter;
        this.spawnPoint[name].speed = speed;
    }

    setApawnInterval( interval) {
        this.spawnInterval = interval;
    }

    addSpawnPoint(name, x, y, player, diameter = this.spawnDiameter, limit = this.spawnLimit, speed = this.spawnSpeed) {
        this.spawnPoint[name] = {};
        this.spawnPoint[name].x = player.spawnPoint.x > 0
            ? x - player.spawnPoint.x
            : x - player.defaultX;
        this.spawnPoint[name].y = player.spawnPoint.y > 0
        ? y - player.spawnPoint.y
        : y - player.defaultY;
        this.spawnPoint[name].diameter = diameter;
        this.spawnPoint[name].limit = limit;
        this.spawnPoint[name].speed = speed;
        this.spawnPoint[name].toSpawn = speed;
    }

    setImage(img) {
        this.image = img;
    }
}
