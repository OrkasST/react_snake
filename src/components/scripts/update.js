export const update = (camera, data, direction, speedUp) => {
    data.player.update(camera, direction, [data.apple, data.ant, data.bigAnt, data.attackUpgrade, data.armorUpgrade], speedUp);
    data.ui.updateUI(data.player.maxHealth, data.player.health, data.player.availableLength - 1, data.player.attack, data.player.armor);
}
