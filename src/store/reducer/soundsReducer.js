import {CHANGE_SOUNDS} from "../common";

let isSounds = localStorage.getItem('isSounds');
if(isSounds) isSounds = isSounds === 'true';
else isSounds = true;


export const soundsReducer = (state = isSounds, action) => {
    if(action.type === CHANGE_SOUNDS){
        return !state;
    }
    return state;
};