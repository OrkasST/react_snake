export const update = (camera, data, direction, speedUp, magicAtk) => {
    data.ant.update();
    data.bigAnt.update();
    data.scorpio.update();
    data.player.update(camera, direction, [data.apple, data.ant, data.bigAnt, data.scorpio, data.attackUpgrade, data.armorUpgrade, data.magicUpgrade], speedUp, magicAtk);
    if(data.player.availableLength > 10) {
      if (data.attackUpgrade.body.length === 0) data.attackUpgrade.spawnCube();
      if (data.armorUpgrade.body.length === 0) data.armorUpgrade.spawnCube();
      if (data.magicUpgrade.body.length === 0) data.magicUpgrade.spawnCube();
    } else {
      data.attackUpgrade.deleteUpgrade();
      data.armorUpgrade.deleteUpgrade();
      data.magicUpgrade.deleteUpgrade();
    }
    data.ui.updateUI(data.player.maxHealth, data.player.health, Math.floor((data.player.availableLength - 10)/4), data.player.attack, data.player.armor);
}
