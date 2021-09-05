export class Player {
  constructor(
    x=100,
    y=100,
    speed=2,
    size=20,
    color='green',
    headColor='black',
    direction='left',
    maxHealth=10,
    mealPoints=0,
    pointsToGrow=2,
    availableLength=1
  ) {
    this.head = {x: x, y: y, direction: direction};
    this.body = [this.head];
    this.speed = speed;
    this.size = size;
    this.color = color;
    this.headColor = headColor;
    this.maxHealth = maxHealth;
    this.health = maxHealth;
    this.speedUpAvailable = true;
    this.mealPoints = mealPoints;
    this.pointsToGrow = pointsToGrow;
    this.availableLength = availableLength;
  }

  update(camera, direction, obj, speed) {
    let Head = this.body[0];
    let x = Head.x;
    let y = Head.y;
    if(speed) {
      this.speedUp();
    }
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
    if(!this.checkForCollision(this.body[0], this.size, obj) && this.body.length > this.availableLength) {
      this.body.pop();
    } else if(!this.isAbleToGrow()) {
      if(this.body.length > this.availableLength) this.body.pop();
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
        this.mealPoints += clsnObj.health;
        if(this.health < this.maxHealth) {
          this.restoreHealth(clsnObj.health);
        }
        return true;
      } else {
        return false;
      }
    } else {
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
          this.mealPoints += clsnObj.health;
          if(this.health < this.maxHealth) {
            this.restoreHealth(clsnObj.health);
          }
        }
      });
      return grow;
    }
  }

  isAbleToGrow() {
    if(this.mealPoints >= this.pointsToGrow) {
      this.mealPoints -= this.pointsToGrow;
      this.pointsToGrow = Math.floor(this.pointsToGrow * 1.5);
      this.availableLength++;
      this.maxHealth++;
      this.isAbleToGrow();
    }
    return false;
  }

  speedUp() {
    this.speed = 4;
    setTimeout( () => {
      this.speed = 2;
      this.speedUpAvailable = false;
      setTimeout( () => {
        this.speedUpAvailable = true;
      }, 2000);
    }, 1000);
  }

  restoreHealth(mealHealth) {
    let CAP = this.maxHealth;
    this.health += mealHealth;
    if(this.health > CAP) this.health = CAP;
  }

}

