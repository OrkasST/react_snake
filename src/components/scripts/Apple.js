import { Cube } from "./Cube";

export class Food extends Cube{
    constructor(GS, color='#FF0000', size=20, health=1) {
        super(GS, color, size, health);
        this.type = 'food';
    }
}
