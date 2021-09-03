const render = (camera, screen, data) => {
  screen.clear();
  screen.draw(camera, data.player);
}

const update = (camera, data) => {
  data.player.update(camera);
}

export const Game = (camera, screen, data) => {
  update(camera, data);
  render(camera, screen, data);
  alert(data.player.body);
}
