import {START_GAME} from "../common";

export const levelReducer = (state = 0, action) => {
    if(action.type === START_GAME){
        return action.level;
    }
    return state;
};