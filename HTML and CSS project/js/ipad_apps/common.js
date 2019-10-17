var icon = document.querySelector('.js-icon');

icon.addEventListener('click', function(e){
    var menu = document.querySelector('.js-menu');

    icon.classList.toggle('active');
    menu.classList.toggle('active');
});



// SWIPER

var mySwiper = new Swiper ('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 3,

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  })



  // breakpoints

  var swiper = new Swiper('.swiper-container', {
    // Default parameters
    slidesPerView: 3,
    spaceBetween: 0,
    // Responsive breakpoints
    breakpoints: {
      // when window width is <= 620px
      620: {
        slidesPerView: 1,
        spaceBetween: 0
      },
      // when window width is <= 920px
      920: {
        slidesPerView: 2,
        spaceBetween: 0
      },
    }
  })