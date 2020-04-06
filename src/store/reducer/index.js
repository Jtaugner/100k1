import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'
import {moneyReducer} from "./moneyReducer";
import {isDirectOrderReducer} from "./isDirectOrderReducer";
import {tipsReducer} from "./tipsReducer";
import {doneDirectLevelsReducer, doneReverseLevelsReducer} from "./doneLevelsReducer";
import {history} from "../history";


const reducer = combineReducers({
  router: connectRouter(history),
  money: moneyReducer,
  isDirectOrder: isDirectOrderReducer,
  tips: tipsReducer,
  doneDirectLevels: doneDirectLevelsReducer,
  doneReverseLevels: doneReverseLevelsReducer,
});

export {reducer};