import {
    ADD_RIGHT_ANSWER,
    BUY_LEVEL,
    CHANGE_ORDER,
    DONE_LEVEL,
    BACK_MENU,
    SHOW_ADV,
    START_GAME, CHANGE_SOUNDS, GET_TIP, CAN_SHOW_ADV, SHOW_ADV_TIP
} from '../common'
import {selectMoney, selectOrder} from "../selectors";


let showAdvert;
if(window.YaGames) {
    window.YaGames.init()
        .then(ysdk => {
            var isNativeCache = ysdk.yandexApp && ysdk.yandexApp.enabled;
            if ('serviceWorker' in navigator && !isNativeCache) {
                window.onload = function(){
                    navigator.serviceWorker
                        .register('sw.js')
                        .then(function(reg) {
                            console.log('Registration succeeded. Scope is ' + reg.scope);
                        })
                        .catch(function(error) {
                            console.error('Trouble with sw: ', error);
                        });
                };
            }
            showAdvert = () => {
                ysdk.adv.showFullscreenAdv();
            };

        });
}


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
        console.log('show Advert');
        setTimeout(()=>{
            console.log('disp');
            console.log(dispatch);
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
    dispatch({
        type: SHOW_ADV
    });
}; 
    
export const canShowAdv = () => ({
    type: CAN_SHOW_ADV
});
export const showTipAdv = () => (dispatch)=>{
    if(!allowShowAdv(dispatch)) return {};
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

