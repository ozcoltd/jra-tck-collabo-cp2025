/******/ (function() { // webpackBootstrap
/******/ 	"use strict";

;// ./src/assets/js/slider.js
function Slider() {
  console.log("slider task");
}
;// ./src/assets/js/accordion.js
function Accordion() {
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


;// ./src/assets/js/anchor.js
function Anchor() {
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

;// ./src/assets/js/index.js




Slider();
Accordion();
Anchor();
/******/ })()
;