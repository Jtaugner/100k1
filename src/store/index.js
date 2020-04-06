import {applyMiddleware, createStore} from 'redux'
import {reducer} from './reducer'
import thunk from 'redux-thunk'
const enhancer = applyMiddleware(thunk);



export const store = createStore(reducer, enhancer);