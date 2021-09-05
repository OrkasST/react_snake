import { Player } from './Player';
import { Screen } from './Screen';
import { Game } from './Game';
import { Camera } from './Camera';
import { Cube } from './Cube';
import { UI } from './UI';

const start = (Cnv) => {
  let viewArea = Cnv;
  let ctx = viewArea.getContext('2d');
  viewArea.classList.remove('_hidden');
  let screen = new Screen(viewArea, ctx);
  screen.setScreenSize(screen.width, screen.height);
  let player = screen.height <= 700 ? new Player(screen.width/2, 150) : new Player(screen.width/2, screen.height/2);
  let camera = new Camera();
  let cube = new Cube();
  let ui = new UI();
  while(cube.body.length < cube.spawnLimit/2) {
    cube.spawnCube();
  }
  setInterval( () => {cube.spawnCube()}, cube.spawnInterval);
  Game(camera, screen, {player, cube, ui});
}

export default start;
