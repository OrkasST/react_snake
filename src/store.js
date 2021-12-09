import { combineReducers, createStore } from 'redux';
import gameInfoReducer from './redux/reducers/gameInfo-reducer';
import statisticReducer from './redux/reducers/statistic-reducer';
import playerInfoReducer from './redux/reducers/playerInfo-reducer';


let reducers = combineReducers({
  statisticPage: statisticReducer,
  playerInfoPage: playerInfoReducer,
  gameInfo: gameInfoReducer
});

let store = createStore(reducers);

export default store;
