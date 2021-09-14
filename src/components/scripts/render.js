export const render = (camera, screen, data) => {
    screen.clear();
    screen.draw(camera, data.map);
    screen.draw(camera, data.apple);
    screen.draw(camera, data.ant);
    screen.draw(camera, data.bigAnt);
    screen.draw(camera, data.scorpio);
    screen.draw(camera, data.player);
    screen.draw(camera, data.attackUpgrade);
    screen.draw(camera, data.armorUpgrade);
    screen.drawEnemyHealth(camera, data.ant);
    screen.drawEnemyHealth(camera, data.bigAnt);
    screen.drawEnemyHealth(camera, data.scorpio);
    screen.drawUI(data.ui, data.player.mealPoints, data.player.pointsToGrow);
}
