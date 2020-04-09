import {applyMiddleware, createStore} from 'redux'
import {reducer} from './reducer'
import thunk from 'redux-thunk'
import {setAdvTime} from "./advTime";
const enhancer = applyMiddleware(thunk, setAdvTime);



export const store = createStore(reducer, enhancer);