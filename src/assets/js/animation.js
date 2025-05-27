export function Animation() {
    const elm = document.querySelector('.js-animation');

    // const fvFlg = sessionStorage.getItem('FirstView');
    // if(fvFlg){
    //     elm.remove();
    //     return;
    // }

    const delay = 3000;
    let timeoutTask;
    const ua = navigator.userAgent;
    const uaData = navigator.userAgentData;
    let devSp = false;

    //PCのみ、ファーストビュー発生
    if (uaData && uaData.brands.length > 0 && uaData.platform === 'iPad') {
        devSp = uaData.mobile;
    } else {
        devSp = /iPhone|Android|Mobile|iPad/.test(ua);
    }
    if(devSp || window.location.hash) {
        if(elm) elm.remove();
        return;
    } else {
        if(elm) elm.classList.remove('is-hidden');
    }

    //ユーザスクロール操作、delayの数値分経過でファーストビューがフェードアウト
    window.addEventListener('load', () => {
        requestAnimationFrame(() => {
            const sy = window.scrollY;
    
            const handleScroll = () => {
                if (window.scrollY !== sy) {
                    elm.classList.add('is-end');
                    clearTimeout(timeoutTask);
                    window.removeEventListener('scroll', handleScroll);
                    // sessionStorage.setItem('FirstView', 'true');
                }
            };
    
            timeoutTask = setTimeout(() => {
                elm.classList.add('is-end');
                // sessionStorage.setItem('FirstView', 'true');
            }, delay);
    
            window.addEventListener('scroll', handleScroll);
        });
    });
    
}
