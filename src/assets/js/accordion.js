export function Accordion() {
      const elm = document.querySelectorAll('.js-accordion');
      const delayTime = 300;
      let flg = false;

      if (!elm.length) return false;
      elm.forEach(target => {
            target.addEventListener('click', function() {
                  const next = this.nextElementSibling;
                  const nextContains = next.classList.contains('is-active');
                  if(!flg){
                        flg = true;
                        if(!nextContains) {
                              next.style.maxHeight = next.scrollHeight + 'px';
                              target.classList.add('is-active');
                              next.classList.add('is-active');
                        } else {
                              next.style.maxHeight = 0;
                              target.classList.remove('is-active');
                              next.classList.remove('is-active');
                        }
                  }
                  setTimeout(() => {
                        flg = false;
                  },delayTime) 
            });
      });

      window.addEventListener('resize', () => {
      const activeAccordion = document.querySelectorAll('.is-active');
      if(activeAccordion.length > 0) {
            activeAccordion.forEach(elm => {
                  setTimeout(() => {
                        elm.style.maxHeight = elm.scrollHeight + 'px';
                  },delayTime) 
            });
      }
      })
}

