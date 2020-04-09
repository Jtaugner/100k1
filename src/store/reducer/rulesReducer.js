import {CLOSE_RULES, OPEN_RULES} from "../common";


let doneDirectLevels = localStorage.getItem('doneDirectLevels');
let stateRules = !doneDirectLevels;

export const isRulesReducer = (state = stateRules, action) => {
    if(action.type === OPEN_RULES){
        return true;
    }else if(action.type === CLOSE_RULES){
        return false;
    }
    return state;
};