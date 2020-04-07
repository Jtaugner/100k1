import {ADD_RIGHT_ANSWER, BUY_LEVEL, DONE_LEVEL} from "../common";
import {moneyPerAnswer} from "../../components/common";

let money = localStorage.getItem('money');
if(money) money = Number(money);
else money = 100;

export const moneyReducer = (stateMoney = money, action) => {
    let newState = stateMoney;
    if(action.type === BUY_LEVEL){
        newState = stateMoney - 100;
    }else if(action.type === DONE_LEVEL){
         newState = stateMoney + 100;
    }else if(action.type === ADD_RIGHT_ANSWER){
         newState = stateMoney
             + moneyPerAnswer[action.payload.answer];
    }
    localStorage.setItem('money', newState);
    return newState;
};