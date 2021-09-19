export class Cube {
    constructor({GS, color='#FF0000', size=20, health=1, name=''}) {
        this.color = color;
        this.size = size * GS;
        this.spawnLimit = 20;
        this.spawnDiameter = 600 * GS;
        this.spawnInterval = 2500;
        this.spawnSpeed = 1;
        this.spawnPoint = {};
        this.body = [];
        this.health = health;
        this.image = null;
        this.name = name;
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

    setSpawnPapams(GS, name, diameter, limit, speed) {
        this.spawnPoint[name].limit = limit;
        this.spawnPoint[name].diameter = diameter * GS;
        this.spawnPoint[name].speed = speed;
    }

    setApawnInterval(interval) {
        this.spawnInterval = interval;
    }

    addSpawnPoint({GS, name, x, y, mapXY, diameter = this.spawnDiameter, limit = this.spawnLimit, speed = this.spawnSpeed}) {
        this.spawnPoint[name] = {};
        this.spawnPoint[name].x = mapXY.x + x*GS;
        this.spawnPoint[name].y = mapXY.y + y*GS;
        this.spawnPoint[name].diameter = diameter * GS;
        this.spawnPoint[name].limit = limit;
        this.spawnPoint[name].speed = speed;
        this.spawnPoint[name].toSpawn = speed;
    }

    setImage(img) {
        this.image = img;
    }
}
