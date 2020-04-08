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
export default showAdvert;