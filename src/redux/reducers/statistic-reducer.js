const UPDATE_DEATHS = 'UPDATE-DEATHS';
const UPDATE_APPLES = 'UPDATE-APPLES';

let initialState = {
  deaths: 0,
  totalUpgradePoints: 0,
  totalUpgrades: 0,
  apples: 0,
  ants: 0,
  bigAnts: 0,
  scorpios: 0
}

const statisticReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_DEATHS:
    state.deaths = action.number;
    return state;

    case UPDATE_APPLES:
    state.apples = action.number;
    return state;

    default:
    return state;
  }
}

export default statisticReducer;

export const updateDeaths = (num) => {
  return {
    type: UPDATE_DEATHS,
    number: num
  }
}
export const updateApples = (num) => {
  return {
    type: UPDATE_APPLES,
    number: num
  }
}
