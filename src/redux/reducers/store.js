import { combineReducers, createStore } from 'redux';
import statisticReducer from './statistic-reducer';

let reducers = combineReducers({
  statisticPage: statisticReducer
});

let store = createStore(reducers);

export default store;
