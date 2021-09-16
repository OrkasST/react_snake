import { Player } from './Player';
import { Screen } from './Screen';
import { Game } from './Game';
import { Camera } from './Camera';
import { UI } from './UI';
import { ImageLoader } from './ImageLoader';
import { MapCreator } from './mapCreator';
import { Food } from './Apple';
import { Enemy } from './Enemy';
import { Upgrade } from './Upgrade';
import { Spawner } from './spawner';

const start = (Cnv, WorldMap) => {
  let viewArea = Cnv;
  let ctx = viewArea.getContext('2d');
  viewArea.classList.remove('_hidden');
  WorldMap.classList.remove('_hidden');
  let screen = new Screen({viewArea, ctx});
  screen.setScreenSize();
  screen.onLoading();
  let GlobalScale = 1;

  if (screen.height <= 700) {
    GlobalScale = 0.5;
  }

  //player
  let player = screen.height <= 700
   ? new Player(GlobalScale, screen.width/2, 150)
   : new Player(GlobalScale, screen.width/2, screen.height/2);
  player.setSpawnPoint(2004, 1536);

  //map
  screen.setMapPosition(GlobalScale, player);

  //camera
  let camera = new Camera();

  //food
  let apple = new Food(GlobalScale);
  
  //enemies
  let ant = new Enemy(GlobalScale);

  let bigAnt = new Enemy(GlobalScale, '#000000', 10, 5, 2, 40, 80);

  let scorpio = new Enemy(GlobalScale, '#FF00FF', 40, 11, 5, 97, 120);

  //upgrades
  let attackUpgrade = new Upgrade(GlobalScale, 'attackUpgrade');
  attackUpgrade.addSpawnPoint({
    GS: GlobalScale, 
    name: 'initial', 
    x: player.spawnPoint.x, 
    y: player.spawnPoint.y, 
    mapXY : {x: screen.mapX, y: screen.mapY}, 
    diameter: 800, 
    limit: 1, 
    speed: 0
  });

  let armorUpgrade = new Upgrade(GlobalScale, 'armorUpgrade');
  armorUpgrade.addSpawnPoint({
    GS: GlobalScale, 
    name: 'initial', 
    x: player.spawnPoint.x, 
    y: player.spawnPoint.y, 
    mapXY : {x: screen.mapX, y: screen.mapY}, 
    diameter: 800, 
    limit: 1, 
    speed: 0
  });


  //UI
  let ui = new UI(screen.width);
    
  //images
  let images = {};
  let loader = new ImageLoader({
    //food
    apple : '/images/apple.png',

    //map
    map_tiles: '/images/tiles.png',

    //enemies
    ant: '/images/ant.png',
    bigAnt: '/images/big-ant.png',
    scorpio: '/images/scorpio.png',

    //player
    player_head: '/images/snake-head.png',
    player_body: '/images/snake-body_n.png',
    player_tail: '/images/snake-tail.png',

    //upgrades
    attackUp: '/images/attack.png',
    armorUp: '/images/armor.png'
  });
  
  loader.loadImages().then(names => {
    images = Object.assign(images, loader.images)
    apple.setImage(images['apple']);
    ant.setImage(images['ant']);
    bigAnt.setImage(images['bigAnt']);
    scorpio.setImage(images['scorpio']);
    attackUpgrade.setImage(images['attackUp']);
    armorUpgrade.setImage(images['armorUp']);
    player.setImages(images['player_head'], images['player_body'], images['player_tail']);
    let map = MapCreator(GlobalScale, images, WorldMap, screen);

    map.spawnPoints.AppleSpawnPoints.forEach((point, i) => {
      apple.addSpawnPoint({
        GS: GlobalScale,
        name: i, 
        x: point.x, 
        y: point.y, 
        mapXY: {x: screen.mapX, y: screen.mapY},
        limit: 20,
        speed: 2
      });
    });
    map.spawnPoints.AntsSpawnPoints.forEach((point, i) => {
      ant.addSpawnPoint({
        GS: GlobalScale,
        name: i, 
        x: point.x, 
        y: point.y, 
        mapXY: {x: screen.mapX, y: screen.mapY},
        limit: 20,
        speed: 3
      });
    });
    map.spawnPoints.BigAntsSpawnPoints.forEach((point, i) => {
      bigAnt.addSpawnPoint({
        GS: GlobalScale,
        name: i, 
        x: point.x, 
        y: point.y, 
        mapXY: {x: screen.mapX, y: screen.mapY},
        limit: 15,
        speed: 5
      });
    });
    map.spawnPoints.ScorpiosSpawnPoints.forEach((point, i) => {
      scorpio.addSpawnPoint({
        GS: GlobalScale,
        name: i, 
        x: point.x, 
        y: point.y, 
        mapXY: {x: screen.mapX, y: screen.mapY},
        limit: 10,
        speed: 40
      });
    });

    setInterval( () => {
      Spawner([apple, ant, bigAnt, scorpio]);
    }, 2000);

    setTimeout(()=>{
      Game(camera, screen, {player, apple, ui, map, ant, bigAnt, scorpio, attackUpgrade, armorUpgrade});
    }, 2000);
  }).catch(error => {
    console.error(error);
  });
}

export default start;
