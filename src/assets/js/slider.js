export function Slider() {
  const swiper = new Swiper('.js-slider', {
  loop: false,
  spaceBetween: 16,
  slidesPerView: 1.65,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  });
}