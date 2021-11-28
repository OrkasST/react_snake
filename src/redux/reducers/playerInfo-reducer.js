const UPDATE_LEVEL = 'UPDATE-DEATHS';
const UPDATE_ATTACK = 'UPDATE-ATTACK';
const UPDATE_ARMOR = 'UPDATE-ARMOR';
const UPDATE_MAX_HP = 'UPDATE-MAX_HP';
const UPDATE_MAX_MP = 'UPDATE-MAX-MP';
const UPDATE_MAGIC_ATTACK = 'UPDATE-MAGIC-ATTACK';
const UPDATE_CONCENTRATION = 'UPDATE-CONCENTRATION';

let initialState = {
  'Level' : 1,
  'Attack' : 1,
  'Armor' : 1,
  'Max HP' : 10,
  'Max MP' : 10,
  'Magic Attack': 1,
  'Concentration': 1
}

const playerInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LEVEL:
    state['Level'] = action.number;
    return state;

    case UPDATE_ATTACK:
    state['Attack'] = action.number;
    return state;

    case UPDATE_ARMOR:
    state['Armor'] = action.number;
    return state;

    case UPDATE_MAX_HP:
    state['Max HP'] = action.number;
    return state;

    case UPDATE_MAX_MP:
    state['Max MP'] = action.number;
    return state;

    case UPDATE_MAGIC_ATTACK:
    state['Magic Attack'] = action.number;
    return state;

    case UPDATE_CONCENTRATION:
    state['Concentration'] = action.number;
    return state;

    default:
    return state;
  }
}

export default playerInfoReducer;

export const updateLevel = (num) => {
  return {
    type: UPDATE_LEVEL,
    number: num
  }
}
export const updateAttack = (num) => {
  return {
    type: UPDATE_ATTACK,
    number: num
  }
}

export const updateArmor = (num) => {
    return {
      type: UPDATE_ARMOR,
      number: num
    }
  }

  export const updateMaxHP = (num) => {
    return {
      type: UPDATE_MAX_HP,
      number: num
    }
  }

  export const updateMaxMP = (num) => {
    return {
      type: UPDATE_MAX_MP,
      number: num
    }
  }

  export const updateMagicAttack = (num) => {
    return {
      type: UPDATE_MAGIC_ATTACK,
      number: num
    }
  }

  export const updateConcentration = (num) => {
    return {
      type: UPDATE_CONCENTRATION,
      number: num
    }
  }