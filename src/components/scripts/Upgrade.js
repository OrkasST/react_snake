import { Cube } from "./Cube";

export class Upgrade extends Cube {
    constructor(type) {
        super();
        this.type = type;
        this.size = 42;
    }
    show(x, y) {
      this.spawnCube(null, x, y);
    }

    deleteUpgrade() {
        this.body = [];
    }
}
