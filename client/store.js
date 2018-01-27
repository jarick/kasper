import { createStore, applyMiddleware, compose } from 'redux'
import reducer, { initialState } from 'reducers'

export default (state = initialState) => {
  const middlewares = []
  const composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose
  return createStore(
    reducer,
    state,
    composeEnhancers(applyMiddleware(...middlewares))
  )
}
