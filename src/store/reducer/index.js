import {combineReducers} from 'redux'
import {moneyReducer} from "./moneyReducer";
import {isDirectOrderReducer} from "./isDirectOrderReducer";
import {tipsReducer} from "./tipsReducer";
import {doneDirectLevelsReducer, doneReverseLevelsReducer} from "./doneLevelsReducer";
import {isGameReducer} from "./isGameReducer";
import {levelReducer} from "./levelReducer";
import {soundsReducer} from "./soundsReducer";
import {showAdvReducer} from "./showAdvReducer";


const reducer = combineReducers({
  money: moneyReducer,
  isDirectOrder: isDirectOrderReducer,
  tips: tipsReducer,
  doneDirectLevels: doneDirectLevelsReducer,
  doneReverseLevels: doneReverseLevelsReducer,
  isGame: isGameReducer,
  level: levelReducer,
  isSounds: soundsReducer,
  showAdv: showAdvReducer
});

export {reducer};