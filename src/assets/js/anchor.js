export function Anchor() {
  const anchor = document.querySelectorAll('.js-anchor');
  let headerHeight = 0;
  
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
      if (window.innerWidth <= 768) {
        headerHeight = document.querySelector('#js-header').offsetHeight;
      }
      const id = elm.getAttribute('href');
      if(id !== '#'){ smooth(id) }
    })
    
  });

  window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash;
    if (hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
      if (window.innerWidth <= 768) {
        headerHeight = document.querySelector('#js-header').offsetHeight;
      }
      smooth(hash);
    }
  })
}
