import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import reduxThunkMiddleware from 'redux-thunk'
import clientMiddleware from './clientMiddleware'
import apiClient from './apiClient'

import gameState from './modules/gameState.js';
import levelState from './modules/levelState.js';

export default function configureStore(initialState, platformSpecificStores = {}, platformSpecificMiddleware = []) {
  const middlewares = [
    applyMiddleware(clientMiddleware(new apiClient())),
    applyMiddleware(reduxThunkMiddleware)
  ].concat(platformSpecificMiddleware);

  const store = createStore(
    combineReducers({
      ...platformSpecificStores,
      game: gameState,
      level: levelState
    }),
    initialState,
    compose(...middlewares)
  );
  return store
}
