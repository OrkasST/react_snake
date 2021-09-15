import { SpriteSheet } from './sprite-sheet';

export const MapCreator = (GS, images, WorldMap, spawnPoint, playerDefaultX, playerDefaultY, screen) => {
    let tiles = new SpriteSheet({
        imageName: 'map_tiles',
        imageWidth: 640,
        imageHeight: 640
      });
      const mapData = require('../maps/world_map.json');
    return screen.createMap(GS, 'world_map', mapData, tiles, images, WorldMap, spawnPoint, playerDefaultX, playerDefaultY);
}

//'world_map', mapData, tiles, images, WorldMap, player.spawnPoint