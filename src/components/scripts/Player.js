import { updateApples } from '../../redux/reducers/statistic-reducer';
import store from '../../redux/store';

export class Player {
  constructor(
    GS,
    x = 100,
    y = 100,
    speed = 2,
    size = 20,
    color = 'green',
    headColor = 'black',
    direction = 'left',
    maxHealth = 10,
    mealPoints = 0
  ) {
    this.head = { x: x, y: y, direction: direction, sx: 0};
    this.defaultX = x;
    this.defaultY = y;
    this.body = [this.head];
    this.speed = speed * GS;
    this.size = size * GS;
    this.color = color;
    this.headColor = headColor;
    this.maxHealth = maxHealth;
    this.health = maxHealth;
    this.armor = 1;
    this.attack = 1;
    this.speedUpAvailable = true;
    this.mealPoints = mealPoints;
    this.pointsToGrow = 2;
    this.availableLength = 10;
    this.head_img = null;
    this.body_img = null;
    this.tail_img = null;
    this.UpgradeAtt = true;
    this.UpgardeArm = true;
    this.spawnPoint = {
      x: 0,
      y: 0
    }
    this.log = true;
    this.toLog = 1000;
    //statistic
    this.applesEaten = 0;
  }

  update(camera, direction, chknObjects, speed) {
    let Head = this.body[0];
    let x = Head.x;
    let y = Head.y;
    let sx, sy;
    if (speed) {
      this.speedUp();
    }
    switch (direction || Head.direction) {
      case 'left':
        x -= this.speed;
        camera.x += this.speed;
        sx = 2; 
        this.body[0].direction === 'left'
          ? this.body[0].sy = 0
          : this.body[0].sy = 1
        break;
      case 'right':
        x += this.speed;
        camera.x -= this.speed;
        sx = 1;
        this.body[0].direction === 'right'
          ? this.body[0].sy = 0
          : this.body[0].sy = 2
        //this.body[0].sy = 2;
        break;
      case 'down':
        y += this.speed;
        camera.y -= this.speed;
        sx = 3;
        this.body[0].direction === 'down'
          ? this.body[0].sy = 0
          : this.body[0].sy = 1
        // this.body[0].sy = 1;
        break;
      case 'up':
        y -= this.speed;
        camera.y += this.speed;
        sx = 0;
        this.body[0].direction === 'up'
          ? this.body[0].sy = 0
          : this.body[0].sy = 2
        // this.body[0].sy = 2;
        break;
      default:
        break;
    }
    this.body.unshift({
      x: x,
      y: y,
      direction: direction || Head.direction,
      sx: sx,
      sy: sy
    });

    if (!chknObjects.every((object, i) => {
      return !this.checkForCollision(this.body[0], this.size, object, camera, i)
    })
      && this.body.length > this.availableLength) {
      this.body.pop();
    } else if (!this.isAbleToGrow()) {
      if (this.body.length > this.availableLength) {
        while (this.body.length > this.availableLength) {
          this.body.pop();
        }
      }
    }
    this.body.forEach( (part, i) => this.bindImages(part, i) );
  }

  setImages(headImg, bodyImg, tailImg) {
    this.head_img = headImg;
    this.body_img = bodyImg;
    this.tail_img = tailImg;
  }

  bindImages(part, i) {
    if (i === 0 ) {
      part.image = this.head_img;
      part.draw = true;
    } else if (i === this.body.length-1) {
      part.image = this.tail_img;
      part.draw = true;
    } else if (i % 4 === 0 && this.body.length - 1 - i >= 4) {
      part.draw = true;
      part.image = this.body_img;
    } else {
      part.draw = false;
    }
  }

  checkForCollision(head, size, clsnObj, camera, i) {
    let grow = false;
    clsnObj.body.forEach((obj, i) => {
      if (
        head.x <= obj.x + (clsnObj.size || clsnObj.width) &&
        head.x + size >= obj.x &&
        head.y <= obj.y + (clsnObj.size || clsnObj.height) &&
        head.y + size >= obj.y
      ) {
        if (clsnObj.type === 'food') {
          clsnObj.body.splice(i, 1);
          grow = true;
          this.applesEaten++;
          store.dispatch(updateApples(this.applesEaten));

          this.mealPoints += clsnObj.health;
          if (this.health < this.maxHealth) {
            this.restoreHealth(clsnObj.health);
          }
        } else if (clsnObj.type === 'attackUpgrade') {
          clsnObj.body.splice(i, 1);
          if (this.availableLength > 1) {
            this.upgradeAttack();
            this.availableLength -= 4;
          }
        } else if (clsnObj.type === 'armorUpgrade') {
          clsnObj.body.splice(i, 1);
          if (this.availableLength > 1) {
            this.upgradeArmor();
            this.availableLength -= 4;
            this.UpgradeArm = false;
          }
        } else if (clsnObj.type === 'enemy') {
          obj.health -= Math.max(0, (this.attack - clsnObj.armor));
          this.health -= Math.max(0, (clsnObj.attack - this.armor));
          if (obj.health <= 0) {
            clsnObj.body.splice(i, 1);
            this.mealPoints += clsnObj.health;
            grow = true;
            if (this.health < this.maxHealth) {
              this.restoreHealth(Math.floor(clsnObj.health / 3));
            }
          } else {
            this.health -= Math.max(0, (clsnObj.attack - this.armor));
          }
          if (this.health <= 0) {
            this.Death(camera);
          }

        }
      }
    });
    return grow;
  }

  Death(camera) {
    this.mealPoints = 0;
    this.availableLength = 10;
    this.maxHealth = 10;
    this.health = this.maxHealth;
    this.body[0].x = this.defaultX;
    this.body[0].y = this.defaultY;
    camera.x = 0;
    camera.y = 0;
  }

  isAbleToGrow() {
    if (this.mealPoints >= this.pointsToGrow) {
      this.mealPoints -= this.pointsToGrow;
      this.pointsToGrow = this.pointsToGrow < 100
        ? Math.floor(this.pointsToGrow * 1.5)
        : Math.floor(this.pointsToGrow * 1.2)
      this.availableLength += 4;
      this.maxHealth++;
      this.isAbleToGrow();
    }
    return false;
  }

  speedUp() {
    if (this.speedUpAvailable) {
      let defaultSpeed = this.speed;
      let speedUp = this.speed * 2;
      this.speed = speedUp;
      this.speedUpAvailable = false;
      setTimeout(() => {
        this.speed = defaultSpeed;
        setTimeout(() => {
          this.speedUpAvailable = true;
        }, 2000);
      }, 1000);
    }
  }

  restoreHealth(mealHealth) {
    let CAP = this.maxHealth;
    this.health += mealHealth;
    if (this.health > CAP) this.health = CAP;
  }

  setSpawnPoint(x, y) {
    this.spawnPoint.x = x;
    this.spawnPoint.y = y;
  }

  upgradeAttack() {
    this.attack++;
  }
  upgradeArmor() {
    this.armor++;
  }

}

