import { direction, speedUp } from './controls';
import { render } from './render';
import { update } from './update';
let log = true;
let id;
let backUpScreen, backUpCamera, backUpData;

export let pause;

export const Game = (camera, screen, data) => {
  update(camera, data, direction, speedUp);
  render(camera, screen, data);
  if (log) {
    console.log(data.player);
    console.log(data.apple);
    log = false;
  }

  if(pause) {
    Pause(camera, screen, data);
  }
  
  id = requestAnimationFrame(() => { Game(camera, screen, data) });
}

export const Pause = (camera, screen, data) => {
  if (!pause) {
    pause = true;
  } else {
    backUpScreen = screen;
    backUpCamera = camera;
    backUpData = data;
    cancelAnimationFrame(id);
  }
}

export const Resume = () => {
  pause = false;
  Game(backUpCamera, backUpScreen, backUpData);
}