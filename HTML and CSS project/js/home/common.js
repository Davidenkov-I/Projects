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