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

  //player
  let player = screen.height <= 700
   ? new Player(screen.width/2, 150)
   : new Player(screen.width/2, screen.height/2);
  //player.setSpawnPoint(25, 25);

  //camera
  let camera = new Camera();

  //food
  let apple = new Food();
  apple.setSpawnPoint(20, 20, player.spawnPoint);
  apple.addSpawnPoint('more_apples', 1200, 1200, player.spawnPoint);
  apple.addSpawnPoint('alotofapples', 2000, 2000, player.spawnPoint);
  
  while(apple.body.length < apple.spawnLimit/2) {
    for(let name in apple.spawnPoint) apple.spawnCube(name);
  }


  //enemies
  let ant = new Enemy();
  ant.setSpawnPoint(2000, 20, player.spawnPoint, 800, 15, 2);

  while(ant.body.length < 10) {
    for(let name in ant.spawnPoint) ant.spawnEnemy(name);
  }

  let bigAnt = new Enemy('#000000', 10, 5, 2, 40, 80);
  bigAnt.setSpawnPoint(10, 1500, player.spawnPoint, 1200, 15, 2);

  while(bigAnt.body.length < 10) {
    for(let name in bigAnt.spawnPoint) bigAnt.spawnEnemy(name);
  }

  //upgrades
  let attackUpgrade = new Upgrade('attackUpgrade');
  attackUpgrade.setSpawnPoint(100, 100, player.spawnPoint, 800, 1, 0);

  let armorUpgrade = new Upgrade('armorUpgrade');
  armorUpgrade.setSpawnPoint(100, 100, player.spawnPoint, 800, 1, 0);


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
    apple : '/images/apple.png',
    map_tiles: '/images/tiles.png',
    ant: '/images/ant.png',
    bigAnt: '/images/big-ant.png',
    player_head: '/images/snake-head.png',
    player_body: '/images/snake-body.png',
    player_tail: '/images/snake-tail.png',
    attackUp: '/images/attack.png',
    armorUp: '/images/armor.png'
  });
  
  
  loader.loadImages().then(names => {
    images = Object.assign(images, loader.images)
    apple.setImage(images['apple']);
    ant.setImage(images['ant']);
    bigAnt.setImage(images['bigAnt']);
    attackUpgrade.setImage(images['attackUp']);
    armorUpgrade.setImage(images['armorUp']);
    let map = MapCreator(images, WorldMap, player.spawnPoint, screen);

    setTimeout(()=>{
      Game(camera, screen, {player, apple, ui, map, ant, bigAnt, attackUpgrade, armorUpgrade});
    }, 2000);
  }).catch(error => {
    console.error(error);
  });
}

export default start;
