import { Dummy } from "./Dummy";

export class Ordinary extends Dummy {
    constructor(GS, space = 30) {
        super(GS);
        this.space = space * GS;
    }

    playerSeen(ent, player) {
        if (player.body[0].x <= ent.x + this.space
            && player.body[0].x >= ent.x - this.space
            && player.body[0].y <= ent.y + this.space
            && player.body[0].y >= ent.y - this.space
        ) {
            return true;
        } else {
            return false;
        }
    }

    prepare(ent, player) {
        if (this.playerSeen(ent, player)) {
            
        }
    }
}
