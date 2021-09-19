import { Cube } from "./Cube";

export class Food extends Cube{
    constructor({GS, color='#FF0000', size=20, health=1, name}) {
        super({GS, color, size, health, name});
        this.type = 'food';
    }
}
