export class AI {
    constructor () {
        // this.x = object.x;
        // this.y = object.y;
        // this.direction = 'stop';
        this.stepsCount = 0;
    }

    move(ent) {
        if (this.stepsCount <= 0) {
            this.chooseDirection(ent);
            this.chooseStepsCount();
        } else {
            this.stepsCount--;
        }

        switch(ent.direction) {
            case 'up':
                ent.y -= ent.speed;
                break;
            case 'right':
                ent.x += ent.speed;
                break;
            case 'down':
                ent.y += ent.speed;
                break;
            case 'left':
                ent.x -= ent.speed;
                break;
            default:
                break;
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