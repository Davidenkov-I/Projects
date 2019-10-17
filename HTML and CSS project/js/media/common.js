var icon = document.querySelector('.js-icon');

icon.addEventListener('click', function(e){
    var menu = document.querySelector('.js-menu');

    icon.classList.toggle('active');
    menu.classList.toggle('active');
});