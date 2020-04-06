import {
    ADD_RIGHT_ANSWER,
    BUY_LEVEL,
    CHANGE_ORDER,
    CHANGE_RULES,
    DONE_LEVEL,
    BACK_MENU,
    SHOW_ADV,
    START_GAME
} from '../common'
import {selectOrder} from "../selectors";


export const buyLevel =
    (level) => (dispatch, getState) => {
    const isDirect = selectOrder(getState());
    dispatch({
        type: BUY_LEVEL,
        payload: {
            isDirect, level
        }

    })
};
export const backMenu = () => ({
   type: BACK_MENU
});
export const getLevelDone = (level) => ({
    type: DONE_LEVEL,
    level
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

