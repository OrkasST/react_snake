export const update = (camera, data, direction, speedUp) => {
    data.player.update(camera, direction, [data.apple, data.ant, data.bigAnt], speedUp);
    data.ui.updateUI(data.player.maxHealth, data.player.health);
}
