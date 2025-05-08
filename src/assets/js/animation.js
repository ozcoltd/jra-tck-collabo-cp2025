export function Animation() {
    const elm = document.querySelector('.js-animation');
    const ua = navigator.userAgent;
    if (/iPhone|Android|Mobile|iPad/.test(ua)){
        elm.remove();
        return;
    }

    const fvFlg = sessionStorage.getItem('FirstView');
    if(fvFlg){
        elm.remove();
        return;
    }

    if(elm) {
        elm.classList.remove('is-hidden');
    }

    const delay = 2000;
    let timeoutTask;
    
    const handleScroll = () => {
        elm.classList.add('is-end');
        sessionStorage.setItem('FirstView', 'true');
        clearTimeout(timeoutTask);
        window.removeEventListener('scroll', handleScroll);
    };

    timeoutTask = setTimeout(() => {
        elm.classList.add('is-end');
        sessionStorage.setItem('FirstView', scrollY);
    }, delay);

    window.addEventListener('scroll', handleScroll);
}
