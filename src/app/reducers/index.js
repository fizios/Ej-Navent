import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import demo from './demo';

const reducers = combineReducers({
  demo,
  router: routerReducer
});

export default reducers;
