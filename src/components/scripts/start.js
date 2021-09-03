import { Player } from './Player';
import { Screen } from './Screen';
import { Game } from './Game';
import { Camera } from './Camera';
import { Cube } from './Cube';

const start = (e) => {
  let player = new Player();
  let viewArea = e.target;
  let ctx = viewArea.getContext('2d');
  let screen = new Screen(viewArea, ctx);
  let camera = new Camera();
  let cube = new Cube();
  Game(camera, screen, {player, cube});
  setInterval( () => { Game(camera, screen, {player, cube}) }, 1000)
  if(player && screen && ctx) {
    alert('start data created');
  }
}

export default start;
