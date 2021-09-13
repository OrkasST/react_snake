export const update = (camera, data, direction, speedUp) => {
    data.player.update(camera, direction, [data.apple, data.ant, data.bigAnt, data.attackUpgrade, data.armorUpgrade], speedUp);
    const updateUpgrades = (points) => {
      if (points > 1) {
        data.attackUpgrade.show(100, 100);
        data.armorUpgrade.show(180, 100);
      }
    }

    updateUpgrades(data.player.availableLength);
    data.ui.updateUI(data.player.maxHealth, data.player.health, data.player.availableLength - 1, data.player.attack, data.player.armor);
}
