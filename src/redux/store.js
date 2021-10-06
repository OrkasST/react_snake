import { combineReducers, createStore } from 'redux';
import gameInfoReducer from './reducers/gameInfo-reducer';
import statisticReducer from './reducers/statistic-reducer';

let reducers = combineReducers({
  statisticPage: statisticReducer,
  gameInfo: gameInfoReducer
});

let store = createStore(reducers);

export default store;
