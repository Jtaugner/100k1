import {DONE_LEVEL, GET_TIP, SHOW_ADV} from "../common";


let tips = localStorage.getItem('tips');
if(tips) tips = Number(tips);
else tips = 5;

export const tipsReducer = (stateTips = tips, action) => {
    if(action.type === GET_TIP){
        const newState = stateTips - 1;
        localStorage.setItem('money', newState);
        return newState;
    }else if(action.type === DONE_LEVEL || action.type === SHOW_ADV){
        const newState = stateTips + 1;
        localStorage.setItem('money', newState);
        return newState;
    }
    return stateTips
};

