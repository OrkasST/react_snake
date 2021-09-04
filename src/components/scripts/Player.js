export class Player { constructor(x=100, y=100, speed=20, size=20,
  color='green', headColor='black', direction='left') {
    this.head = {x: x, y: y, direction: direction};
    this.body = [this.head];
    this.speed = speed;
    this.size = size;
    this.color = color;
    this.headColor = headColor;
  }

  update(camera, direction) {
    let Head = this.body[0];
    let x = Head.x;
    let y = Head.y;
    switch(direction || Head.direction) {
      case 'left':
        x -= this.speed;
        camera.x += this.speed;
        break;
      case 'right':
        x += this.speed;
        camera.x -= this.speed;
        break;
      case 'down':
        y += this.speed;
        camera.y -= this.speed;
        break;
      case 'up':
        y -= this.speed;
        camera.y += this.speed;
        break;
      default:
        break;
    }
    this.body.unshift({
      x: x,
      y: y,
      direction: direction || Head.direction
    });
    while(this.body.length > 2) {
      this.body.pop();
    }
  }

  checkForCollision(head, clsnObj) {
    //data
    if(head.x === clsnObj.x && head.y === clsnObj.y) {
      //score += clsnObj.health
      if(this.injured === true) {
        this.currentHealth += clsnObj.health;
      }
    }
  }
}
