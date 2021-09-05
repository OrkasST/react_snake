export const render = (camera, screen, data) => {
    screen.clear();
    screen.draw(camera, data.player);
    screen.draw(camera, data.cube);
    screen.drawUI(data.ui, data.player.mealPoints, data.player.pointsToGrow);
}
