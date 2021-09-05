export class Screen {
  constructor(viewArea, ctx, width = window.outerWidth, height = window.outerHeight) {
    this.viewArea = viewArea;
    this.ctx = ctx;
    this.width = width;
    this.height = height;
  }

  setScreenSize(width, height) {
    this.viewArea.width = width;
    this.viewArea.height = height;
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
      this.ctx.fillRect(body.x + camera.x, body.y + camera.y, obj.size, obj.size);
    }
    this.ctx.closePath();
  }
  drawUI(UI, currentMlP, MlPtoGrow) {
    this.ctx.beginPath();
    this.ctx.fillStyle = UI.borderColor;
    this.ctx.fillRect(UI.border.x, UI.border.y, UI.maxAmmount*10 + 2, UI.border.size);
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.fillStyle = UI.healthColor;
    this.ctx.fillRect(UI.x, UI.y, UI.ammount*10, UI.size);
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.fillStyle = UI.textColor;
    this.ctx.font = '20px serif';
    this.ctx.fillText(`${UI.ammount} / ${UI.maxAmmount}`, UI.border.x + UI.maxAmmount*10 + 20, UI.y + UI.border.size);
    this.ctx.fillText(`${currentMlP} / ${MlPtoGrow}`, UI.x, UI.textY);
    this.ctx.closePath();
  }

  clear() {
    this.ctx.fillStyle = '#000000';
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}
