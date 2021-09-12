import { Cube } from "./Cube";

export class Enemy extends Cube {
    constructor(color='#000000', size=20, health=5, attack = 5) {
        super(color, size, health);
        this.type = 'enemy';
        this.currentHealth = health;
        this.armor = 1;
    }


}