import {CAN_SHOW_ADV, SHOW_ADV, SHOW_ADV_TIP} from "../common";


export const showAdvReducer = (state = true, action) => {
    console.log('can show', action);
    if(action.type === SHOW_ADV || action.type === SHOW_ADV_TIP){
        return false;
    }else if(action.type === CAN_SHOW_ADV){
        return true;
    }
    return state;
};

