import {CHANGE_ORDER, NONE_LEVEL, START_GAME} from "../common";

export const levelReducer = (state = -1, action) => {
    if(action.type === START_GAME){
        return action.level;
    }else if(action.type === CHANGE_ORDER || action.type === NONE_LEVEL){
        return -1;
    }
    return state;
};