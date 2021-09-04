export let direction;

export const changeDirection = (e) => {
    switch(e.code) {
        case 'KeyW':
            direction = 'up';
            break;
        case 'KeyA':
            direction = 'left';
            break;
        case 'KeyS':
            direction = 'down';
            break;
        case 'KeyD':
            direction = 'right';
            break;
        default:
            break;
    }
}
