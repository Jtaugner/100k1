import {
    ADD_RIGHT_ANSWER,
    BUY_LEVEL,
    CHANGE_ORDER,
    CHANGE_RULES,
    DONE_LEVEL,
    BACK_MENU,
    SHOW_ADV,
    START_GAME, CHANGE_SOUNDS, GET_TIP, CAN_SHOW_ADV, SHOW_ADV_TIP
} from '../common'
import {selectMoney, selectOrder} from "../selectors";
import showAdvert from "../../createAdv";


export const buyLevel =
    (level) => (dispatch, getState) => {
    const state = getState();
    const money = selectMoney(state);
    if(money >= 100){
        const isDirect = selectOrder(state);
        dispatch({
            type: BUY_LEVEL,
            payload: {
                isDirect, level
            }

        })
    }else{

    }

};
function allowShowAdv(dispatch) {
    if(showAdvert){
        showAdvert();
        setTimeout(()=>{
            dispatch(canShowAdv);
        }, 200000);
        return true;
    }
    return false;

}
export const backMenu = () => ({
    type: BACK_MENU
});
export const getTip = () => ({
    type: GET_TIP
});
export const changeSounds = () => ({
    type: CHANGE_SOUNDS
});
export const getLevelDone = () => ({
    type: DONE_LEVEL
});
export const startGame = (level) => ({
    type: START_GAME,
        level
});
export const changeOrder = (isDirect) => ({
    type: CHANGE_ORDER,
    isDirect
});
export const showAdv = () => (dispatch) =>{
    allowShowAdv(dispatch);
    return {
        type: SHOW_ADV
    };
}; 
    
export const canShowAdv = () => ({
    type: CAN_SHOW_ADV
});
export const showTipAdv = () => (dispatch)=>{
    if(!allowShowAdv(dispatch)) return {};
    return{
        type: SHOW_ADV_TIP
    }
};
export const addRightAnswer =
    (level, answer) => (dispatch, getState) => {
        const isDirect = selectOrder(getState());
        dispatch({
            type: ADD_RIGHT_ANSWER,
            payload: {
                isDirect, level, answer
            }

        })
    };

