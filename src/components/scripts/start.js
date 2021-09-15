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
  //player.setSpawnPoint(150, 150);

  //camera
  let camera = new Camera();

  //food
  let apple = new Food(GlobalScale);
  apple.setSpawnPoint(GlobalScale, 20, 20, player);
  apple.addSpawnPoint(GlobalScale, 'more_apples', 1200, 1200, player);
  apple.addSpawnPoint(GlobalScale, 'alotofapples', 2000, 2000, player);
  
  while(apple.body.length < apple.spawnLimit/2) {
    for(let name in apple.spawnPoint) apple.spawnCube(name);
  }


  //enemies
  let ant = new Enemy(GlobalScale);
  ant.setSpawnPoint(GlobalScale, 2000, 20, player, 800, 15, 2);
  while(ant.body.length < 10) {
    for(let name in ant.spawnPoint) ant.spawnEnemy(name);
  }

  let bigAnt = new Enemy(GlobalScale, '#000000', 10, 5, 2, 40, 80);
  bigAnt.setSpawnPoint(GlobalScale, 10, 1500, player, 1200, 15, 2);
  while(bigAnt.body.length < 10) {
    for(let name in bigAnt.spawnPoint) bigAnt.spawnEnemy(name);
  }

  let scorpio = new Enemy(GlobalScale, '#FF00FF', 40, 11, 5, 97, 120);
  scorpio.setSpawnPoint(GlobalScale, 120, 100, player, 800, 10, 10);
  while(scorpio.body.length < 5) {
    for(let name in scorpio.spawnPoint) scorpio.spawnEnemy(name);
  }

  //upgrades
  let attackUpgrade = new Upgrade(GlobalScale, 'attackUpgrade');
  attackUpgrade.setSpawnPoint(GlobalScale, 100, 100, player, 800, 1, 0);

  let armorUpgrade = new Upgrade(GlobalScale, 'armorUpgrade');
  armorUpgrade.setSpawnPoint(GlobalScale, 100, 100, player, 800, 1, 0);


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
    let map = MapCreator(GlobalScale, images, WorldMap, player.spawnPoint, player.defaultX, player.defaultY, screen);

    setTimeout(()=>{
      Game(camera, screen, {player, apple, ui, map, ant, bigAnt, scorpio, attackUpgrade, armorUpgrade});
    }, 2000);
  }).catch(error => {
    console.error(error);
  });
}

export default start;
