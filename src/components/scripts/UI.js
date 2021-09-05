export class UI {
  constructor(x=50, y=50, ammount=10, maxAmmount=10, size=5) {
    this.ammount = ammount;
    this.maxAmmount = maxAmmount;
    this.x = x;
    this.y = y;
    this.size = size;
    this.healthColor = '#FF0000',
    this.borderColor = '#FFFFFF',
    this.border = {
        x: this.x-1,
        y: this.y-1,
        length: this.maxAmmount+2,
        size: this.size+2
    }
  }

  //updateUI() {
    //this.health.ammount = currentHealth
  //}

}
