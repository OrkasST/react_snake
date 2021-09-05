export class Cube {
    constructor(color='#FF0000', size=10, x=120, y=120, spawnLimit = 20, spawnDiameter = 600, spawnInterval = 2500) {
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
    }

    spawnCube() {
        console.log('cube created');
        console.log(this);
        if(this.body.length < this.spawnLimit) {
            this.body.push({
                x: Math.floor(Math.random()*this.spawnDiameter-(this.spawnDiameter/2)),
                y: Math.floor(Math.random()*this.spawnDiameter-(this.spawnDiameter/2))
            })
        }
    }
}