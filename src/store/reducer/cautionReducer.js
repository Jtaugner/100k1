import {CLOSE_CAUTION, SHOW_CAUTION} from '../common'



export const cautionReducer = (state = false, action) => {
    if(action.type === SHOW_CAUTION){
        return true;
    }else if(action.type === CLOSE_CAUTION){
        return  false;
    }
    return state;
};