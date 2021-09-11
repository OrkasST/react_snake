import { SpriteSheet } from './sprite-sheet';

export const MapCreator = (images, WorldMap, spawnPoint, screen) => {
    let tiles = new SpriteSheet({
        imageName: 'map_tiles',
        imageWidth: 640,
        imageHeight: 640
      });
      const mapData = require('../maps/world_map.json');
    return screen.createMap('world_map', mapData, tiles, images, WorldMap, spawnPoint);
}

//'world_map', mapData, tiles, images, WorldMap, player.spawnPoint