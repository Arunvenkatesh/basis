import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';

export const history = createBrowserHistory();

function configureStore(initialState) {
  /**
   * configureStore helps to create store for our application.
   * return createStore function that creates a Redux store that holds the complete state tree of our app.
   * rootReducer which contains all reducers.
   * initialState is an initial object.
   * compose() function is used to pass mutiple enhancersto store.
   * applyMiddleware() function allows us to use custom midllewares.
   * middlewares that contains middlewares like thunk and router middleware.
   * thunk allows you to write action creators that return a function instead of an action.
   */
  const reactRouterMiddleware = routerMiddleware(history);
  const middlewares = [thunk, reactRouterMiddleware];

  return createStore(rootReducer, initialState, compose(applyMiddleware(...middlewares)));
}

export default configureStore;
