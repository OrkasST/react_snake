export class Cube {
    constructor(x=120, y=120, color='#FF0000', size=20, spawnLimit = 20, spawnDiameter = 600, spawnInterval = 2500, health=1, image = null) {
        this.color = color;
        this.size = size;
        this.spawnLimit = spawnLimit;
        this.spawnDiameter = spawnDiameter;
        this.spawnInterval = spawnInterval;
        this.spawnPoint = {
            x: x,
            y: y
        }
        this.body = [];
        this.health = health;
        this.image = image;
    }

    spawnCube() {
        if(this.body.length < this.spawnLimit) {
            this.body.push({
                x: Math.floor(Math.random()*this.spawnDiameter-(this.spawnDiameter/2)),
                y: Math.floor(Math.random()*this.spawnDiameter-(this.spawnDiameter/2))
            })
        }
    }

    setSpawnPoint(x, y) {
        this.spawnPoint.x = x;
        this.spawnPoint.y = y;
    }

    setSpawnPapams(diameter, limit, interval) {
        this.spawnLimit = limit;
        this.spawnDiameter = diameter;
        this.spawnInterval = interval;
    }

    setImage(img) {
        this.image = img;
    }
}