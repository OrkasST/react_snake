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
  }

  updateUI(maxHealth, health) {
    this.maxAmmount = maxHealth;
    this.ammount = health;
  }

}
