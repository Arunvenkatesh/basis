import userReducer from './userReducer';

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
/**
 *  combineReducers() function which takes a group of reducers and returns a reducer.
 */
const appReducer = combineReducers({
  userReducer,
  routing: routerReducer
});
/**
 *  rootReducer() function which returns appReducer.
 */
const rootReducer = (state, action) => {
  return appReducer(state, action);
};
export default rootReducer;
