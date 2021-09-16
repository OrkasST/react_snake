import { SpriteSheet } from './sprite-sheet';

export const MapCreator = (GS, images, WorldMap, screen) => {
    let tiles = new SpriteSheet({
        imageName: 'map_tiles',
        imageWidth: 640,
        imageHeight: 640
      });
      const mapData = require('../maps/new_world_map.json');
    return screen.createMap(GS, 'world_map', mapData, tiles, images, WorldMap);
}

//'world_map', mapData, tiles, images, WorldMap, player.spawnPoint