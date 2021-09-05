export const render = (camera, screen, data) => {
    screen.clear();
    screen.draw(camera, data.player);
    screen.draw(camera, data.cube);
}