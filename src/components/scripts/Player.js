export class Player {
  constructor(
    x=100,
    y=100,
    speed=20,
    size=20,
    color='green',
    headColor='black',
    direction='left',
    maxHealth=10
  ) {
    this.head = {x: x, y: y, direction: direction};
    this.body = [this.head];
    this.speed = speed;
    this.size = size;
    this.color = color;
    this.headColor = headColor;
  }

  checkForCollision(head, size, clsnObj) {
    if(
      (head.x <= clsnObj.x + (clsnObj.size/2) &&
      head.y <= clsnObj.y + (clsnObj.size/2) &&
      head.x + size >= clsnObj.x + (clsnObj.size/2) &&
      head.y + size<= clsnObj.y + (clsnObj.size/2))
    ) {
      //score += clsnObj.health
      //if(this.injured === true) {
        //this.currentHealth += clsnObj.health;
      //}
      return true;
    } else {
      return false;
    }
  }

  update(camera, direction, obj) {
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
    if(!this.checkForCollision(Head, this.size, obj)) {
      this.body.pop();
    }
  }


}

