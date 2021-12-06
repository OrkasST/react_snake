export class AI {
    constructor (GS) {
        // this.x = object.x;
        // this.y = object.y;
        // this.direction = 'stop';
        this.stepsCount = 0;
        this.GS = GS;
    }

    move(ent) {
        this.prepare(ent);
        switch(ent.direction) {
            case 'up':
                ent.y -= (ent.speed * this.GS);
                break;
            case 'right':
                ent.x += (ent.speed * this.GS);
                break;
            case 'down':
                ent.y += (ent.speed * this.GS);
                break;
            case 'left':
                ent.x -= (ent.speed * this.GS);
                break;
            default:
                break;
        }
    }

    prepare(ent) {
        if (this.stepsCount <= 0) {
            this.chooseDirection(ent);
            this.chooseStepsCount();
        } else {
            this.stepsCount--;
        }

    }

    chooseDirection(ent) {
        let ind = Math.floor(Math.random()*5);
        switch (ind) {
            case 0:
                ent.direction = 'stop';
                break;
            case 1:
                ent.direction = 'up';
                break;
            case 2:
                ent.direction = 'right';
                break;
            case 3:
                ent.direction = 'down';
                break;
            case 4:
                ent.direction = 'left';
                break;
        }
    }

    chooseStepsCount() {
        let ind = Math.floor(Math.random()*15);
        this.stepsCount = ind;
    }
}