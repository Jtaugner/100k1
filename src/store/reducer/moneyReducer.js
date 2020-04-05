import {BUY_LEVEL, DONE_LEVEL} from "../common";


let money = localStorage.getItem('money');
if(money) money = Number(money);
else money = 100;

export const moneyReducer = (stateMoney = money, action) => {
    if(action.type === BUY_LEVEL){
        const newState = stateMoney - 100;
        localStorage.setItem('money', newState);
        return newState;
    }else if(action.type === DONE_LEVEL){
        const newState = stateMoney + 100;
        localStorage.setItem('money', newState);
        return newState;
    }
    return stateMoney
};