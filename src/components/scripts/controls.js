export let direction;
export let speedUp;

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
        case 'KeyM':
            direction = 'stop';
            break;
        case 'KeyE':
            speedUp = true;
            setTimeout(() => {speedUp = false}, 20);
            break;
        default:
            break;
    }
}

window.addEventListener('keydown', changeDirection);
window.addEventListener('keyup', (e) => {
    if(e.code === 'KeyE') speedUp = false;
});