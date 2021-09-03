const render = (camera, screen, data) => {
  screen.clear();
  screen.draw(camera, data.player);
  screen.draw(camera, data.cube);
}

const update = (camera, data, direction) => {
  data.player.update(camera, direction);
}

export const Game = (camera, screen, data) => {
  update(camera, data);
  render(camera, screen, data);
}
