import { Dummy } from "./Dummy";

export class Ordinary extends Dummy {
    constructor(GS, min = 0, space = 200) {
        super(GS, min);
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

    createPath(ent, player) {
        if (Math.abs(ent.x - player.body[0].x) > Math.abs(ent.y - player.body[0].y)) {
            ent.direction = ent.x - player.body[0].x < 0
            ? 'right'
            : 'left'
        } else {
            ent.direction = ent.y - player.body[0].y < 0
            ? 'down'
            : 'up'
        }
    }

    prepare(ent, player) {
        if (this.playerSeen(ent, player)) {
            this.createPath(ent, player);
        } else {
            this.chooseDirection(ent);
            this.chooseStepsCount(ent);
        }
    }
}
