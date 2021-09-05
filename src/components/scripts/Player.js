export class Player {
  constructor(
    x=100,
    y=100,
    speed=2,
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
    if(!this.checkForCollision(this.body[0], this.size, obj)) {
      this.body.pop();
    }
  }

  checkForCollision(head, size, clsnObj) {
    if(!Array.isArray(clsnObj.body)) {
      if(
        head.x <= clsnObj.body.x + clsnObj.size &&
        head.x + size >= clsnObj.body.x &&
        head.y <= clsnObj.body.y + clsnObj.size &&
        head.y + size >= clsnObj.body.y
      ) {
        //score += clsnObj.health
        //if(this.injured === true) {
          //this.currentHealth += clsnObj.health;
        //}
        // alert('');
        return true;
      } else {
        return false;
      }
    } else {
      //let forDestruction = [];
      let grow = false;
      clsnObj.body.forEach( (obj, i) => {
        if(
          head.x <= obj.x + clsnObj.size &&
          head.x + size >= obj.x &&
          head.y <= obj.y + clsnObj.size &&
          head.y + size >= obj.y
        ) {
          clsnObj.body.splice(i, 1);
          grow = true;
          //score += clsnObj.health
          //if(this.injured === true) {
            //this.currentHealth += clsnObj.health;
          //}
        }
      });
      return grow;
    }
  }


}

