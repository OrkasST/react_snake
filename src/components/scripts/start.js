import { Player } from './Player';
import { Screen } from './Screen';
import { Game } from './Game';
import { Camera } from './Camera';
import { Cube } from './Cube';
import { UI } from './UI';
import { ImageLoader } from './ImageLoader';
import { SpriteSheet } from './sprite-sheet';

const start = (Cnv, WorldMap) => {
  let viewArea = Cnv;
  let ctx = viewArea.getContext('2d');
  viewArea.classList.remove('_hidden');
  WorldMap.classList.remove('_hidden');
  let screen = new Screen({viewArea, ctx});
  screen.setScreenSize();
  screen.onLoading();
  //player
  let player = screen.height <= 700 ? new Player(screen.width/2, 150) : new Player(screen.width/2, screen.height/2);
  //player.setSpawnPoint(25, 25);
  //camera
  let camera = new Camera();
  //food
  let cube = new Cube();
  while(cube.body.length < cube.spawnLimit/2) {
    cube.spawnCube();
  }
  //UI
  let ui = new UI(screen.width);
  setInterval( () => {cube.spawnCube()}, cube.spawnInterval);
  //images
  let images = {};
  let loader = new ImageLoader({
    apple : '/images/apple.png',
    map_tiles: '/images/tiles.png'
  });
  
  
  loader.loadImages().then(names => {
    images = Object.assign(images, loader.images)
    cube.setImage(images['apple']);
    let tiles = new SpriteSheet({
      imageName: 'map_tiles',
      imageWidth: 640,
      imageHeight: 640
    });
    const mapData = require('../maps/world_map.json');
    let map = screen.createMap('world_map', mapData, tiles, images, WorldMap, player.spawnPoint);
    setTimeout(()=>{
      Game(camera, screen, {player, cube, ui, map});
    }, 2000);
  }).catch(error => {
    console.error(error);
  });
}

export default start;
