import { createStore, applyMiddleware, combineReducers } from 'redux'  // Add combineReducers
import { thunk } from 'redux-thunk'
import { createLogger } from 'redux-logger'
import cryptoreducer from './reducers/cryptoreducer'

const logger = createLogger()

const rootReducer = combineReducers({
  crypto: cryptoreducer  // Nest under 'crypto' key
})

const store = createStore(rootReducer, applyMiddleware(thunk, logger))

export default store