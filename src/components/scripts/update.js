export const update = (camera, data, direction, speedUp) => {
    data.player.update(camera, direction, [data.apple, data.ant, data.bigAnt, data.scorpio, data.attackUpgrade, data.armorUpgrade], speedUp);
    if(data.player.availableLength > 10) {
      if (data.attackUpgrade.body.length === 0) data.attackUpgrade.spawnCube();
      if (data.armorUpgrade.body.length === 0) data.armorUpgrade.spawnCube();
    } else {
      data.attackUpgrade.deleteUpgrade();
      data.armorUpgrade.deleteUpgrade();
    }
    data.ui.updateUI(data.player.maxHealth, data.player.health, data.player.availableLength - 10, data.player.attack, data.player.armor);
}
