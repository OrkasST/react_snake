import { combineReducers, createStore } from 'redux';
import gameInfoReducer from './reducers/gameInfo-reducer';
import statisticReducer from './reducers/statistic-reducer';
import playerInfoReducer from './reducers/playerInfo-reducer';


let reducers = combineReducers({
  statisticPage: statisticReducer,
  playerInfoPage: playerInfoReducer,
  gameInfo: gameInfoReducer
});

let store = createStore(reducers);

export default store;
