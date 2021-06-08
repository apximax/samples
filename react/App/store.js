import { getDefaultMiddleware} from '@reduxjs/toolkit';
import logger from 'redux-logger';

import { createBrowserHistory } from 'history';
import { combineReducers, applyMiddleware, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import AuthReducer from 'Features/auth';
import NotificationsReducer from 'Features/notifications';

const rootReducer = (history) => combineReducers({
  auth: AuthReducer,
  notifications: NotificationsReducer,
  router: connectRouter(history),
});

export const history = createBrowserHistory();

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer(history),
  {},
  composeEnhancer(
    applyMiddleware(
      routerMiddleware(history),
      ...getDefaultMiddleware(),
      logger,
    ),
  ),
);

export default store;
