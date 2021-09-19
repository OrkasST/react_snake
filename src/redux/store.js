import { combineReducers, createStore } from 'redux';
import statisticReducer from './reducers/statistic-reducer';

let reducers = combineReducers({
  statisticPage: statisticReducer
});

let store = createStore(reducers);

export default store;
