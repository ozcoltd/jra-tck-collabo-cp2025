export function Anchor() {
  const anchor = document.querySelectorAll('.js-anchor');
  const ua = navigator.userAgent;
  let devSP;
    let headerHeight = 0;
  
    if (ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0 || ua.indexOf('Mobile') > 0 || ua.indexOf('iPad') > 0) {
      devSP = true;
  }

  if(devSP) {
    headerHeight = document.querySelector('#js-header').offsetHeight;
  }
  
  
  
  const smooth = (id) => {
    const target = document.querySelector(id);
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
  }

  anchor.forEach(elm => {
    elm.addEventListener('click', function(e) {
      e.preventDefault();
      const id = elm.getAttribute('href');
      if(id !== '#'){ smooth(id) }

    })
    
  });
}
