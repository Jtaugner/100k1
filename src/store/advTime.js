import {canShowAdv} from "./ac";
import {CAN_SHOW_ADV, SHOW_ADV, SHOW_ADV_TIP} from "./common";

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
export const setAdvTime  = store => next => action => {
    if(action.type === SHOW_ADV || action.type === SHOW_ADV_TIP){
        if(showAdvert){
            showAdvert();
            setTimeout(()=>{
                next({
                    ...action,
                    type: CAN_SHOW_ADV
                })
            }, 5000);
            next(action);
            return;
        }
        next({
            ...action,
            type:SHOW_ADV
        })
    }else{
        next(action);
    }

}