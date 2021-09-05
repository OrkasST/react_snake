import { direction } from './controls';
import { render } from './render';
import { update } from './update';

export const Game = (camera, screen, data) => {
  update(camera, data, direction);
  render(camera, screen, data);
  requestAnimationFrame(() => { Game(camera, screen, data) });
}
