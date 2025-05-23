export function Modal() {
  const modal = document.querySelectorAll('.js-modal');
  const modalLink = document.querySelectorAll('.js-modal-link');
  const html = document.querySelector('html');
  let focusElm;

  if(!modalLink.length) return;

  modalLink.forEach(elm => {
    elm.addEventListener('click', function (e) {
      e.preventDefault();
      const id = this.getAttribute('href');
      const target = document.querySelector(id);
      target.classList.add('is-open');
      html.classList.add('is-modal-open');
      focusElm = this;
    })
  });

  modal.forEach(elm => {
    const closeBtn = elm.querySelectorAll('.js-modal-close');
    closeBtn.forEach(elm => {
      elm.addEventListener("click", function(e){
        e.preventDefault();
        const target = this.closest('.js-modal');
        target.classList.remove('is-open');
        html.classList.remove('is-modal-open');
        focusElm.focus();
      });
    });
      
  });
}