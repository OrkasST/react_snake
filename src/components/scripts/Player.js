import { updateApples, updateDeaths } from '../../redux/reducers/statistic-reducer';
import { updateLevel, updateAttack, updateArmor, updateMaxHP, updateMaxMP, updateMagicAttack, updateConcentration } from '../../redux/reducers/playerInfo-reducer';
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
    mealPoints = 0,
    maxMana = 10
  ) {
    this.head = { x: x, y: y, direction: direction, sx: 0 };
    this.defaultX = x;
    this.defaultY = y;
    this.body = [this.head];
    this.speed = speed * GS;
    this.size = size * GS;
    this.color = color;
    this.headColor = headColor;
    this.maxHealth = maxHealth;
    this.health = maxHealth;
    this.maxMana = maxMana;
    this.mana = maxMana;
    this.armor = 1;
    this.attack = 1;
    this.level = 1;
    this.magicAttack = 1;
    this.speedUpAvailable = true;
    this.mealPoints = mealPoints;
    this.pointsToGrow = 2;
    this.availableLength = 10;
    this.head_img = null;
    this.body_img = null;
    this.tail_img = null;
    this.magic = {
      body : [],
      ball: {
        img : null,
        speed : 8 * GS,
        time : 80,
        damageFactor : 1
      },
      size : 64 * GS,
      control: false
    }
    this.UpgradeAtt = true;
    this.UpgardeArm = true;
    this.UpgardeMag = true;
    this.spawnPoint = {
      x: 0,
      y: 0
    }
    this.log = true;
    this.toLog = 1000;
    //statistic
    this.applesEaten = 0;
    this.deaths = 0;
  }

  update(camera, direction, chknObjects, speed, magicAtk, souls) {
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
    if (direction !== 'stop') {
      this.body.unshift({
        x: x,
        y: y,
        direction: direction || Head.direction,
        sx: sx,
        sy: sy
      });
    }
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
    this.body.forEach((part, i) => this.bindImages(part, i));
    if (magicAtk && this.magic.control === false){
      this.magic.control = true;
      this.newMagicAttack('ball');
    }
    if (!magicAtk) this.magic.control = false;
    if (this.magic.body.length > 0) this.updateMagic(chknObjects, souls);
  }

  setImages(headImg, bodyImg, tailImg, magicBallImg) {
    this.head_img = headImg;
    this.body_img = bodyImg;
    this.tail_img = tailImg;
    this.magic.ball.img = magicBallImg;
  }

  bindImages(part, i) {
    if (i === 0) {
      part.image = this.head_img;
      part.draw = true;
    } else if (i === this.body.length - 1) {
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
        head.x <= obj.x + (clsnObj.width || clsnObj.size) &&
        head.x + size >= obj.x &&
        head.y <= obj.y + (clsnObj.height || clsnObj.size) &&
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
        } else if (clsnObj.type === 'soul') {
          clsnObj.body.splice(i, 1);
          grow = true;
          // this.applesEaten++;
          // store.dispatch(updateApples(this.applesEaten));
          this.mealPoints += obj.health;

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
        } else if (clsnObj.type === 'magicUpgrade') {
          clsnObj.body.splice(i, 1);
          if (this.availableLength > 1) {
            this.upgradeMagic();
            this.availableLength -= 4;
            this.UpgradeMag = false;
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
    this.deaths += 1;
    store.dispatch(updateDeaths(this.deaths));
    store.dispatch(updateMaxHP(this.maxHealth));
  }

  isAbleToGrow() {
    if (this.mealPoints >= this.pointsToGrow) {
      this.mealPoints -= this.pointsToGrow;
      this.pointsToGrow = this.pointsToGrow < 100
        ? Math.floor(this.pointsToGrow * 1.5)
        : Math.floor(this.pointsToGrow * 1.2)
      this.availableLength += 4;
      this.maxHealth++;
      store.dispatch(updateMaxHP(this.maxHealth));
      this.isAbleToGrow();
    }
    return false;
  }

  loadBody(loadedBody) {
    this.body = loadedBody;
  }

  newMagicAttack(type) {
    this.magic.body.push({
      type: type,
      image: this.magic[type].img,
      x: this.body[0].x + (this.size/2) - (this.magic.size/2),
      y: this.body[0].y + (this.size/2) - (this.magic.size/2),
      direction: this.body[0].direction,
      time: this.magic[type].time
    })

    console.log(this.magic);
  }
 
  updateMagic(chknObjects, souls) {
    this.magic.body.forEach( (el, i) => {
      let speed = this.magic[el.type].speed;
      switch (el.direction) {
        case 'up' :
          el.y -= speed;
          break;
        case 'down' :
          el.y += speed;
          break;
        case 'left' :
          el.x -= speed;
          break;
        case 'right' :
          el.x += speed;
          break;
      }
      el.time--;
      if(el.time <= 0) {
        this.magic.body.splice(i, 1);
      }
    });
    this.chkMagicCollisions(chknObjects, souls);
  }

  chkMagicCollisions(chknObjects, souls) {
    let size = this.magic.size;
    chknObjects.forEach(clsnObj => {
      clsnObj.body.forEach((obj, i) => {
        this.magic.body.forEach( (el, ei) => {
          if (
            el.x + 16 <= obj.x + (clsnObj.width || clsnObj.size) &&
            el.x + size - 16 >= obj.x &&
            el.y + 16 <= obj.y + (clsnObj.height || clsnObj.size) &&
            el.y + size - 16 >= obj.y
          ) {
            this.magic.body.splice(ei, 1);
            if (clsnObj.type === 'enemy') {
              obj.health -= Math.max(0, ((this.magicAttack * this.magic[el.type].damageFactor) - clsnObj.armor));
              if (obj.health <= 0) {
                souls.spawnSoul(obj.x, obj.y, Math.floor(clsnObj.health/2));
                clsnObj.body.splice(i, 1);
                //this.mealPoints += clsnObj.health/2;
                // grow = true;
                // if (this.health < this.maxHealth) {
                //   this.restoreHealth(Math.floor(clsnObj.health / 3));
                // }
              }     
            }
          }
        });
      });
    });
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
    this.level++;
    store.dispatch(updateAttack(this.attack));
    store.dispatch(updateLevel(this.level));
  }
  upgradeArmor() {
    this.armor++;
    this.level++;

    store.dispatch(updateArmor(this.armor));
    store.dispatch(updateLevel(this.level));
  }
  upgradeMagic() {
    this.magicAttack++;
    this.level++;

    store.dispatch(updateMagicAttack(this.magicAttack));
    store.dispatch(updateLevel(this.level));
  }

}

