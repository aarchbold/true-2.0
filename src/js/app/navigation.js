$.fn.handleMobileNav = function() {
    var $context = $(this),
        $mobileBtn = $('.mobile-nav-icon',$context),
        $mobileMenu = $('.topnav-links',$context);

    console.log($context);

    $mobileBtn.click(function() {
        $(this).toggleClass('open');
        $mobileMenu.toggleClass('open');
    })
    
}

$(function() {

    if ($('.navigation-inner').length > 0) {
        $('.navigation-inner').handleMobileNav();
    }
});