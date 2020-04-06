import {applyMiddleware, createStore} from 'redux'
import {reducer} from './reducer'
import {history} from "./history";
import {routerMiddleware} from 'connected-react-router'
import thunk from 'redux-thunk'
const enhancer = applyMiddleware(thunk, routerMiddleware(history));



export const store = createStore(reducer, enhancer);