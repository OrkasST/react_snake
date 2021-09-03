export class Cube {
    constructor(color='#FF0000', size=10, x=120, y=120) {
        this.color = color;
        this.size = size;
        this.body = {
            x: x,
            y: y
        }
    }
}