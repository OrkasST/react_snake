export class Screen {
  constructor(viewArea, ctx, width=200, height=200) {
    this.viewArea = viewArea;
    this.ctx = ctx;
    this.width = width;
    this.height = height;
  }
  draw(camera, obj) {
    this.ctx.beginPath();
    this.ctx.fillStyle = obj.color;
    if(Array.isArray(obj.body)) {
      obj.body.forEach( (part) => {
        this.ctx.fillRect(part.x + camera.x, part.y + camera.y, obj.size, obj.size);
      });
    } else {
      let body = obj.body;
      this.ctx.fillRect(body.x, body.y, obj.size, obj.size);
    }
    this.ctx.closePath();
  }
  clear() {
    this.ctx.fillStyle = '#000000';
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}
