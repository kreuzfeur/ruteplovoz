const owlProps = {
    items: 1,
    margin: 10,
    loop: true,
}
$(document).ready(function () {
    if ($(window).width() < 768) {
        owlProps.nav = true;
        owlProps.dots = false;
    } else {
        owlProps.dots = true;
        owlProps.nav = false;
    }
    $('.owl-carousel').owlCarousel(owlProps);
    $('.owl-nav').append('<a href="" class="owlReadMore">Подробнее</a>');
    $('#menu-mobilemenu').append(`<div class="menuLogo"> <a href="https://ruteplovoz.ru"> <img src="<?php bloginfo('template_directory')?>/src/img/logo.png" alt="ruteplovoz.ru логотип" /> </a> </div>`)
    $('#burger').click(() => toggleBurger());
    $('#callbackForm').submit(function (e) { 
        e.preventDefault();
        const data = getFormData();
        $.ajax({
            type: "POST",
            url: './sendMail.php',
            data,
            success: function (response) {
                showAllert(response);
            },
            error: () => {
                showAllert('alertError');
            }
        });
    });
});
const toggleBurger = () => {
    $('#burger').toggleClass('active');
    $('#menu-mobilemenu').toggleClass('mobileMenuActive');
    $(document.body).toggleClass('overflow-y');
}
const getFormData = () => {
    const email = $('#email').val();
    const message = $('#message').val();
    const data = {
        email,
        message
    }
    $('#email').val('').attr('disabled', 'disabled');
    $('#message').val('').attr('disabled', 'disabled');
    return data;
}
const showAllert = (response) => {
    $(`#${response}`).fadeIn();
}