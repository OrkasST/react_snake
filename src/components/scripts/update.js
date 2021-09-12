export const update = (camera, data, direction, speedUp) => {
    data.player.update(camera, direction, data.apple, speedUp);
    data.ui.updateUI(data.player.maxHealth, data.player.health);
}