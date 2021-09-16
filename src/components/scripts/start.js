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
  attackUpgrade.addSpawnPoint(GlobalScale, 'initial', player.spawnPoint.x, player.spawnPoint.y, {x: screen.mapX, y: screen.mapY}, 800, 1, 0);

  let armorUpgrade = new Upgrade(GlobalScale, 'armorUpgrade');
  armorUpgrade.addSpawnPoint(GlobalScale, 'initial', player.spawnPoint.x, player.spawnPoint.y, {x: screen.mapX, y: screen.mapY}, 800, 1, 0);


  //UI
  let ui = new UI(screen.width);
  setInterval( () => {
    for(let name in apple.spawnPoint) apple.spawnCube(name);
  }, apple.spawnInterval);

  setInterval( () => {
    for(let name in ant.spawnPoint) ant.spawnEnemy(name);
  }, ant.spawnInterval);

  setInterval( () => {
    for(let name in bigAnt.spawnPoint) bigAnt.spawnEnemy(name);
  }, bigAnt.spawnInterval);

  setInterval( () => {
    for(let name in scorpio.spawnPoint) scorpio.spawnEnemy(name);
  }, scorpio.spawnInterval);

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
    player_body: '/images/snake-body.png',
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
    let map = MapCreator(GlobalScale, images, WorldMap, screen);

    map.spawnPoints.AppleSpawnPoints.forEach((point, i) => {
      apple.addSpawnPoint(GlobalScale, i, point.x, point.y, {x: screen.mapX, y: screen.mapY});
    });
    map.spawnPoints.AntsSpawnPoints.forEach((point, i) => {
      ant.addSpawnPoint(GlobalScale, i, point.x, point.y, {x: screen.mapX, y: screen.mapY});
    });
    map.spawnPoints.BigAntsSpawnPoints.forEach((point, i) => {
      bigAnt.addSpawnPoint(GlobalScale, i, point.x, point.y, {x: screen.mapX, y: screen.mapY});
    });
    map.spawnPoints.ScorpiosSpawnPoints.forEach((point, i) => {
      scorpio.addSpawnPoint(GlobalScale, i, point.x, point.y, {x: screen.mapX, y: screen.mapY});
    });

    setTimeout(()=>{
      Game(camera, screen, {player, apple, ui, map, ant, bigAnt, scorpio, attackUpgrade, armorUpgrade});
    }, 2000);
  }).catch(error => {
    console.error(error);
  });
}

export default start;
