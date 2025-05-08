export function Accordion() {
      const elm = document.querySelectorAll('.js-accordion');
      const delayTime = 300;
      let flg = false;

      if (!elm.length) return false;
      elm.forEach(target => {
            target.addEventListener('click', function() {
                  const parent = this.parentNode;
                  const content = parent.querySelector('.js-accordion-content')
                  const nextContains = content.classList.contains('is-active');
                  if(!flg){
                        flg = true;
                        if(!nextContains) {
                              content.style.maxHeight = content.scrollHeight + 'px';
                              target.classList.add('is-active');
                              content.classList.add('is-active');
                        } else {
                              content.style.maxHeight = 0;
                              target.classList.remove('is-active');
                              content.classList.remove('is-active');
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

