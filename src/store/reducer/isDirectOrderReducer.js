import {CHANGE_ORDER} from '../common'



export const isDirectOrderReducer = (order = true, action) => {

    if(action.type === CHANGE_ORDER){
        return action.isDirect;
    }
    return order;
};