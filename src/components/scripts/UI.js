export class UI {
  constructor(width, x=100, y=50, ammount=10, maxAmmount=10, size=10) {
    this.ammount = ammount;
    this.maxAmmount = maxAmmount;
    this.x = width < 1000 ? 30 : x;
    this.y = width < 1000 ? 30 : y;
    this.size = size;
    this.healthColor='#FF0000';
    this.borderColor = '#FFFFFF';
    this.textColor = '#FFFFFF';
    this.border = {
        x: this.x-1,
        y: this.y-1,
        size: this.size+2
    }
    this.textY = this.y + 32;
    this.dist = 32;
    this.upgradePoints = 0;
    this.attack = 1;
    this.armor = 1;
  }

  updateUI(maxHealth, health, upgradePoints, attack, armor) {
    this.maxAmmount = maxHealth;
    this.ammount = health;
    this.upgradePoints = upgradePoints;
    this.attack = attack;
    this.armor = armor;
  }

}
