import { Cube } from "./Cube";

export class Apple extends Cube{
    constructor(color='#FF0000', size=20, health=1) {
        super(color, size, health);
        this.type = 'food';
    }
}