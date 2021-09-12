import { direction, speedUp } from './controls';
import { render } from './render';
import { update } from './update';
let log = true;

export const Game = (camera, screen, data) => {
  update(camera, data, direction, speedUp);
  render(camera, screen, data);
  if (log) {
    console.log(data.player);
    console.log(data.apple);
    log = false;
  }
  
  requestAnimationFrame(() => { Game(camera, screen, data) });
}
