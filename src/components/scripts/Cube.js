export class Cube {
    constructor(GS, color='#FF0000', size=20, health=1) {
        this.color = color;
        this.size = size * GS;
        this.spawnLimit = 20;
        this.spawnDiameter = 600 * GS;
        this.spawnInterval = 2500;
        this.spawnSpeed = 1;
        this.spawnPoint = {
            initial: {
                x: 120 * GS,
                y: 120 * GS
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

    setSpawnPoint(GS, x, y, player, diameter = this.spawnDiameter, limit = this.spawnLimit, speed = this.spawnSpeed) {
        this.spawnPoint.initial.x = player.spawnPoint.x > 0
            ? (x - player.spawnPoint.x) * GS
            : (x - player.defaultX) * GS;
        this.spawnPoint.initial.y = player.spawnPoint.y > 0
        ? (y - player.spawnPoint.y) * GS
        : (y - player.defaultY) * GS;
        this.spawnPoint.initial.diameter = diameter * GS;
        this.spawnPoint.initial.limit = limit;
        this.spawnPoint.initial.speed = speed;
        this.spawnPoint.initial.toSpawn = speed;
    }

    setSpawnPapams(GS, name, diameter, limit, speed) {
        this.spawnPoint[name].limit = limit;
        this.spawnPoint[name].diameter = diameter * GS;
        this.spawnPoint[name].speed = speed;
    }

    setApawnInterval( interval) {
        this.spawnInterval = interval;
    }

    addSpawnPoint(GS, name, x, y, player, diameter = this.spawnDiameter, limit = this.spawnLimit, speed = this.spawnSpeed) {
        this.spawnPoint[name] = {};
        this.spawnPoint[name].x = player.spawnPoint.x > 0
            ? (x - player.spawnPoint.x) * GS
            : (x - player.defaultX) * GS;
        this.spawnPoint[name].y = player.spawnPoint.y > 0
        ? (y - player.spawnPoint.y) * GS
        : (y - player.defaultY) * GS;
        this.spawnPoint[name].diameter = diameter * GS;
        this.spawnPoint[name].limit = limit;
        this.spawnPoint[name].speed = speed;
        this.spawnPoint[name].toSpawn = speed;
    }

    setImage(img) {
        this.image = img;
    }
}
