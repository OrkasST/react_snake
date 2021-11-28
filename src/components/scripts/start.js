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

const start = (Cnv, WorldMap, data) => {
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
  player.setSpawnPoint(data.playerSpawnPointX, data.playerSpawnPointY);
  if (data.gameSaved) player.loadBody(data.playerBody);

  //map
  screen.setMapPosition(GlobalScale, player);

  //camera
  let camera = new Camera(data.cameraX, data.cameraY);

  //food
  let apple = new Food({GS : GlobalScale, name: 'apple'});
  apple.body = data.apples;
  
  //enemies
  let ant = new Enemy({GS : GlobalScale, name: 'ant'});
  ant.body = data.ants;

  let bigAnt = new Enemy({GS: GlobalScale, 
    color: '#000000', 
    health: 10, 
    attack: 5, 
    armor: 2, 
    width: 40, 
    height: 80,
    name: 'bigAnt'
  });
  bigAnt.body = data.bigAnts;

  let scorpio = new Enemy({
    GS: GlobalScale, 
    color: '#FF00FF', 
    health: 40, 
    attack: 11, 
    armor: 5, 
    width: 97, 
    height: 120
  });
  scorpio.body = data.scorpios;

  //upgrades
  let attackUpgrade = new Upgrade({
    GS: GlobalScale, 
    type: 'attackUpgrade'
  });

  let armorUpgrade = new Upgrade({
    GS: GlobalScale,
    type: 'armorUpgrade'
  });

  let magicUpgrade = new Upgrade({
    GS: GlobalScale,
    type: 'magicUpgrade'
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
    player_body: '/images/snake-body_nn.png',
    player_tail: '/images/snake-tail.png',
    magic_ball:  '/images/Magic_ball.png',

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
    player.setImages(images['player_head'], images['player_body'], images['player_tail'], images['magic_ball']);
    let map = MapCreator(GlobalScale, images, WorldMap, screen);

    map.spawnPoints.PlayerSpawnPoint.forEach((point, i) => {
      player.setSpawnPoint(point.x, point.y);
    });
    screen.setMapPosition(GlobalScale, player);

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

    map.spawnPoints.UpgradeSpawnPoint.forEach((point, i) => {
      attackUpgrade.addSpawnPoint({
        GS: GlobalScale,
        name: 'initial', 
        x: point.x, 
        y: point.y, 
        mapXY: {x: screen.mapX, y: screen.mapY},
        diameter: 800,
        limit: 1,
        speed: 0
      });
    });

    map.spawnPoints.UpgradeSpawnPoint.forEach((point, i) => {
      armorUpgrade.addSpawnPoint({
        GS: GlobalScale,
        name: 'initial', 
        x: point.x, 
        y: point.y, 
        mapXY: {x: screen.mapX, y: screen.mapY},
        diameter: 800,
        limit: 1,
        speed: 0
      });
    });

    map.spawnPoints.UpgradeSpawnPoint.forEach((point, i) => {
      magicUpgrade.addSpawnPoint({
        GS: GlobalScale,
        name: 'initial', 
        x: point.x, 
        y: point.y, 
        mapXY: {x: screen.mapX, y: screen.mapY},
        diameter: 800,
        limit: 1,
        speed: 0
      });
    });

    setInterval( () => {
      Spawner([apple, ant, bigAnt, scorpio]);
    }, 2000);
    console.log(ant.GS);

    setTimeout(()=>{
      Game(GlobalScale, camera, screen, {player, apple, ui, map, ant, bigAnt, scorpio, attackUpgrade, armorUpgrade, magicUpgrade});
    }, 2000);
  }).catch(error => {
    console.error(error);
  });
}

export default start;
