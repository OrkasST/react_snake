export const render = (camera, screen, data) => {
    screen.clear();
    screen.draw(camera, data.map);
    screen.draw(camera, data.cube);
    screen.draw(camera, data.player);
    screen.drawUI(data.ui, data.player.mealPoints, data.player.pointsToGrow);
}
