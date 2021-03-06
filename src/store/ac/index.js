import {
    ADD_RIGHT_ANSWER,
    BUY_LEVEL,
    CHANGE_ORDER,
    DONE_LEVEL,
    BACK_MENU,
    SHOW_ADV,
    START_GAME, CHANGE_SOUNDS, GET_TIP, SHOW_ADV_TIP, SHOW_CAUTION, CLOSE_CAUTION, NONE_LEVEL, OPEN_RULES, CLOSE_RULES
} from '../common'
import {selectMoney, selectOrder} from "../selectors";


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
        dispatch({
            type: SHOW_CAUTION
        })
    }

};
export const backMenu = () => ({
    type: BACK_MENU
});
export const openRules = () => ({
    type: OPEN_RULES
});
export const closeRules = () => ({
    type: CLOSE_RULES
});
export const noneLevel = () => ({
    type: NONE_LEVEL
});
export const closeCaution = () => ({
    type: CLOSE_CAUTION
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
    dispatch({
        type: SHOW_ADV
    });
}; 

export const showTipAdv = () => (dispatch)=>{

    dispatch({
        type: SHOW_ADV_TIP
    });
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

