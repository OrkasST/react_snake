import { Cube } from "./Cube";

export class Upgrade extends Cube {
    constructor(type) {
        super();
        this.type = type;
        this.size = 42;
    }

    deleteUpgrade() {
        this.body = [];
    }
}