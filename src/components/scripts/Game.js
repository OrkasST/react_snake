import { saveGame } from '../../redux/reducers/gameInfo-reducer';
import store from '../../redux/store';
import { direction, speedUp } from './controls';
import { render } from './render';
import { update } from './update';
// let log = true;
let id;
// let backUpScreen, backUpCamera, backUpData;
let save = false;

export let pause;

export const Game = (GS, camera, screen, data) => {
  update(camera, data, direction, speedUp);
  render(GS, camera, screen, data);
  // if (log) {
  //   console.log(data.player);
  //   console.log(data.apple);
  //   log = false;
  // }
  if (save) {
    window.cancelAnimationFrame(id);
    store.dispatch(saveGame(
      data.player.spawnPoint.x,
      data.player.spawnPoint.y,
      camera.x,
      camera.y,
      data.player.body,
      data.apple.body,
      data.ant.body,
      data.bigAnt.body,
      data.scorpio.body
    ))
    screen.clear();
    save = false;
  } else {
    id = requestAnimationFrame(() => { Game(GS, camera, screen, data) });
  }
}

export const SAVE = () => {
  save = true;
}