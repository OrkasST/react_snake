export class Soul {
    constructor(GS) {
        this.GS = GS;
        this.body = [];
        this.width = 64 * GS;
        this.height = 64 * GS;
        this.image = null;
        this.type = 'soul';
    }

    spawnSoul(x, y, health) {
        this.body.push({
            x: x,
            y: y,
            health: health
        });
    }

    setImage(img) {
        this.image = img;
    }
}