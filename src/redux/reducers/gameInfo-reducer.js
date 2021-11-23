const SAVE_GAME = 'SAVE-GAME';

let initialState = {
    gameSaved : false,
    playerSpawnPointX : 2004,
    playerSpawnPointY : 1536,
    cameraX : 0,
    cameraY : 0,
    playerBody : [],
    apples : [],
    ants : [],
    bigAnts : [],
    scorpios : []
}

const gameInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_GAME: 
    state.gameSaved = true;
    state.playerSpawnPointX = action.playerSpawnPointX;
    state.playerSpawnPointY = action.playerSpawnPointY;
    state.cameraX = action.cameraX;
    state.cameraY = action.cameraY;
    state.playerBody = action.playerBody;
    state.apples = action.apples;
    state.ants = action.ants;
    state.bigAnts = action.bigAnts;
    state.scorpios = action.scorpios;
    break;
    default:
    return state;
  }
}

export default gameInfoReducer;

export const saveGame = (x1, y1, x2, y2, player, apples, ants, bigAnts, scorpios) => {
  return {
    type: SAVE_GAME,
    playerSpawnPointX: x1,
    playerSpawnPointY: y1,
    cameraX: x2,
    cameraY: y2,
    playerBody: player,
    apples: apples,
    ants: ants,
    bigAnts: bigAnts,
    scorpios: scorpios
  }
}

// cameraX, cameraY,
