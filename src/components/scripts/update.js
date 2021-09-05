export const update = (camera, data, direction) => {
    data.player.update(camera, direction, data.cube);
}