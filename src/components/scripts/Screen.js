//import { TileMap } from "./tile-map";

export class Screen {
  constructor({ viewArea, ctx, width = window.innerWidth, height = window.innerHeight }) {
    this.viewArea = viewArea;
    this.ctx = ctx;
    this.width = width;
    this.height = height;
  }

  setScreenSize(width = this.width, height = this.height) {
    this.viewArea.width = width;
    this.viewArea.height = height;
  }

  draw(camera, obj) {
    this.ctx.beginPath();
    this.ctx.fillStyle = obj.color;
    if (Array.isArray(obj.body)) {
      obj.body.forEach((part) => {
        obj.image ? this.ctx.drawImage(obj.image, part.x + camera.x, part.y + camera.y, obj.width || obj.size, obj.height || obj.size)
          : this.ctx.fillRect(part.x + camera.x, part.y + camera.y, obj.width || obj.size, obj.height || obj.size);
      });
    } else {
      let body = obj.body;
      obj.image ? this.ctx.drawImage(obj.image, body.x + camera.x, body.y + camera.y, obj.width || obj.size, obj.height || obj.size)
        : this.ctx.fillRect(body.x + camera.x, body.y + camera.y, obj.width || obj.size, obj.height || obj.size);
    }
    this.ctx.closePath();
  }

  drawUI(UI, currentMlP, MlPtoGrow) {
    this.ctx.beginPath();
    this.ctx.fillStyle = UI.borderColor;
    this.ctx.fillRect(UI.border.x, UI.border.y, UI.maxAmmount * 10 + 2, UI.border.size);
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.fillStyle = UI.healthColor;
    this.ctx.fillRect(UI.x, UI.y, UI.ammount * 10, UI.size);
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.fillStyle = UI.textColor;
    this.ctx.font = '20px serif';
    this.ctx.fillText(`${UI.ammount} / ${UI.maxAmmount}`, UI.border.x + UI.maxAmmount * 10 + 20, UI.y + UI.border.size);
    this.ctx.fillText(`${currentMlP} / ${MlPtoGrow}`, UI.x, UI.textY);
    this.ctx.closePath();
  }

  drawEnemyHealth(camera, enemy) {
    let offsetX = 20; 
    let offsetY = 20;
    enemy.body.forEach(part => {
      //if (part.x + part.width >= 0 && part.x <= this.width && part.y + part.height >= 0 && part.y <= this.height) {
        this.ctx.beginPath();
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillRect(part.x - offsetX + camera.x, part.y - offsetY + camera.y, enemy.health * (50 / enemy.health) + 2, 10);
        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.fillStyle = '#FF0000';
        this.ctx.fillRect(part.x - (offsetX - 1) + camera.x, part.y - (offsetY - 1) + camera.y, part.health * (50 / enemy.health), 8);
        this.ctx.closePath();
      //}
    });
  }


onLoading() {
  this.ctx.beginPath();
  this.ctx.fillStyle = '#FFFFFF';
  this.ctx.font = '25px serif';
  this.ctx.fillText('Loading...', 100, 100);
  this.ctx.closePath();
}

clear() {
  this.ctx.fillStyle = '#000000';
  this.ctx.clearRect(0, 0, this.width, this.height);
}

createMap(name, mapData, tileset, images, mapScreen, playerSpawnPoint) {
  //const mapImage = document.createElement('canvas');
  mapScreen.width = mapData.width * mapData.tilewidth;
  mapScreen.height = mapData.height * mapData.tileheight;
  const mapContext = mapScreen.getContext('2d');
  const hitboxes = [];
  let row, col;
  mapData.layers.forEach(layer => {
    if (layer.type === "tilelayer") {
      row = 0;
      col = 0;
      layer.data.forEach(index => {
        if (index > 0) {
          mapContext.drawImage(images[tileset.imageName],
            tileset.getSourceX(index), tileset.getSourceY(index),
            mapData.tilewidth, mapData.tileheight,
            col * mapData.tilewidth, row * mapData.tileheight,
            mapData.tilewidth, mapData.tileheight
          );
        }
        col++;
        if (col > (mapData.width - 1)) {
          col = 0;
          row++;
        }
      });
    }
    if (layer.type === "objectgroup") {
      hitboxes.push(...layer.objects.map(obj => ({ x1: obj.x, x2: obj.x + obj.width, y1: obj.y, y2: obj.y + obj.height })));
    }
  });

  images[name] = mapScreen;
  // return new TileMap({
  //     imageName: name,
  //     sourceX: 0,
  //     sourceY: 0,
  //     width: mapScreen.width,
  //     height: mapScreen.height,
  //     hitboxes: hitboxes
  // });

  return {
    body: {
      x: playerSpawnPoint.x > 0
        ? 0 - playerSpawnPoint.x
        : 0 - mapScreen.width / 3,
      y: playerSpawnPoint.y > 0
        ? 0 - playerSpawnPoint.y
        : 0 - mapScreen.height / 3
    },
    image: mapScreen,
    width: mapScreen.width,
    height: mapScreen.height
  }
}
}
