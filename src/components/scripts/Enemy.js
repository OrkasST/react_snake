import { Dummy } from "./AI/Dummy";
import { Ordinary } from "./AI/Ordinary";
import { Cube } from "./Cube";

export class Enemy extends Cube {
  constructor({
    GS,
    color = "#000000",
    health = 5,
    attack = 1.5,
    armor = 0,
    width = 20,
    height = 40,
    name,
    speed = 2,
    AIType = "dummy",
    minSteps = 0,
  }) {
    super({ GS: GS, color: color, health: health, name: name });
    this.type = "enemy";
    //this.currentHealth = health;
    this.armor = armor;
    this.attack = attack;
    this.width = width * GS;
    this.height = height * GS;
    this.speed = speed;
    this.GS = GS;
    this.AIType = AIType;
    this.minSteps = minSteps;
  }

  spawnEnemy(name = "initial", x, y) {
    if (
      this.body.length < this.spawnPoint[name].limit &&
      this.spawnPoint[name].toSpawn === 0
    ) {
      this.body.push({
        x:
          this.spawnPoint[name].x +
            Math.floor(
              Math.random() * this.spawnPoint[name].diameter -
                this.spawnPoint[name].diameter / 2
            ) || x,
        y:
          this.spawnPoint[name].y +
            Math.floor(
              Math.random() * this.spawnPoint[name].diameter -
                this.spawnPoint[name].diameter / 2
            ) || y,
        health: this.health,
        direction: "stop",
        speed: this.speed,
        mind: this.addAI(),
      });
      this.spawnPoint[name].toSpawn = this.spawnPoint[name].speed;
    } else if (this.spawnPoint[name].toSpawn > 0) {
      this.spawnPoint[name].toSpawn--;
    }
  }

  update(player) {
    this.body.forEach((ent) => {
      ent.mind.move(ent, player);
    });
  }

  addAI() {
    switch (this.AIType) {
      case "dummy":
        return new Dummy(this.GS, this.minSteps);
      case "ordinary":
        return new Ordinary(this.GS, this.minSteps);
      default:
        break;
    }
  }
}
