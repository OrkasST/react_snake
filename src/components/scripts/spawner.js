export const Spawner = (objects) => {
    objects.forEach(object => {
        if (object.type === 'food') {
            for (let name in object.spawnPoint) object.spawnCube(name);
        } else {
            for (let name in object.spawnPoint) object.spawnEnemy(name);
        }
    });
}