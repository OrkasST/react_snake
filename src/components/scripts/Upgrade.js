import { Cube } from "./Cube";

export class Upgrade extends Cube {
    constructor({GS, type}) {
        super({GS : GS});
        this.type = type;
        this.size = 42 * GS;
    }

    deleteUpgrade() {
        this.body = [];
    }
}
