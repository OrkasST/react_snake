export const render = (GS, camera, screen, data) => {
    screen.clear();
    screen.draw(GS, camera, data.map);
    screen.draw(GS, camera, data.apple);
    screen.draw(GS, camera, data.ant);
    screen.draw(GS, camera, data.bigAnt);
    screen.draw(GS, camera, data.scorpio);
    screen.draw(GS, camera, data.player);
    screen.draw(GS, camera, data.attackUpgrade);
    screen.draw(GS, camera, data.armorUpgrade);
    screen.drawEnemyHealth(camera, data.ant);
    screen.drawEnemyHealth(camera, data.bigAnt);
    screen.drawEnemyHealth(camera, data.scorpio);
    screen.drawUI(data.ui, data.player.mealPoints, data.player.pointsToGrow);
}
