import {BACK_MENU, START_GAME} from '../common'



export const isGameReducer = (state = false, action) => {
    if(action.type === START_GAME){
        return true;
    }else if(action.type === BACK_MENU){
        return false;
    }
    return state;
};