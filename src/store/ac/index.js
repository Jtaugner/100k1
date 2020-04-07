import {
    ADD_RIGHT_ANSWER,
    BUY_LEVEL,
    CHANGE_ORDER,
    CHANGE_RULES,
    DONE_LEVEL,
    BACK_MENU,
    SHOW_ADV,
    START_GAME, CHANGE_SOUNDS
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

    }

};
export const backMenu = () => ({
    type: BACK_MENU
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
export const changeRules = () => ({
    type: CHANGE_RULES
});
export const changeOrder = (isDirect) => ({
    type: CHANGE_ORDER,
    isDirect
});
export const showAdv = () => ({
    type: SHOW_ADV
});
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

