import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import reduxThunkMiddleware from 'redux-thunk'
import clientMiddleware from './clientMiddleware'
import apiClient from './apiClient'

import surveys from './modules/surveys';
import user from './modules/user';
import rewards from './modules/rewards';

export default function configureStore(initialState, platformSpecificStores = {}, platformSpecificMiddleware = []) {
  const middlewares = [
    applyMiddleware(clientMiddleware(new apiClient())),
    applyMiddleware(reduxThunkMiddleware)
  ].concat(platformSpecificMiddleware);

  const store = createStore(
    combineReducers({
      ...platformSpecificStores,
      surveys,
      user,
      rewards
    }),
    initialState,
    compose(...middlewares)
  );
  return store
}
