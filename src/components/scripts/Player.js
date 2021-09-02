export class Player {
  constructor(x=100, y=100, speed=20, size=20, color='green', headColor='black', direction='left') {
    this.head = {x: x, y: y, direction: direction};
    this.body = [this.head];
    this.speed = speed;
    this.size = size;
    this.color = color;
    this.headColor = headColor;
  }

  update(camera) {
    let newHead = this.head;
    switch(newHead.direction) {
      case 'left':
        //newHead.x -= this.speed;
        camera.x += this.speed;
        break;
      case 'right':
        //newHead.x += this.speed;;
        camera.x -= this.speed;
        break;
      case 'down':
        //newHead.y += this.speed;;
        camera.y -= this.speed;
        break;
      case 'down':
        //newHead.y -= this.speed;;
        camera.y += this.speed;
        break;
      default:
        break;
    }
    if(newHead.x < 0) {
        newHead.x = 200-this.size;
    }
    this.body.unshift(newHead);
    this.body.pop();
  }
}
