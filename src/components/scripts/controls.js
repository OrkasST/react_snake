export let direction;
export let speedUp;
export let magicAtk;

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
        case 'KeyQ':
            magicAtk = true;
            break;
        default:
            break;
    }
}

window.addEventListener('keydown', changeDirection);
window.addEventListener('keyup', (e) => {
    switch(e.code) {
        case 'KeyE':
            speedUp = false;
            break;
        case 'KeyQ':
            magicAtk = false;
            break;
    }
        
});