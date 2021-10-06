import { Cube } from "./Cube";

export class Food extends Cube{
    constructor({GS, color='#FF0000', size=20, health=1, name}) {
        super({
            GS : GS,
            color : color,
            size : size,
            health : health,
            name : name
        });
        this.type = 'food';
    }
}
