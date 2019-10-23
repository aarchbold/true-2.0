$.fn.handleLegalNav = function() {
    $items = $('.legal-nav a');

    $items.click(function(e) {
        e.preventDefault();
        $items.removeClass('-selected');
        console.log($(this).data('target') === 'privacy');
        if ($(this).data('target') === 'privacy') {
            $('a[data-target="privacy"]').addClass('-selected');
        } else {
            $('a[data-target="terms"]').addClass('-selected');
        }
        $(window).animate({
            scrollTop: ($('#'+$(this).data('target')).offset().top - 80)
        },400);
    })
}

if ($('body').hasClass('true-legal')) {
    $(window).on('load', function(){
        $('.true-legal').handleLegalNav();

        if (window.location.hash === '#section=terms') {
            $(window).animate({
                scrollTop: ($('#terms').offset().top - 80)
            },400);
            $('a[data-target="privacy"]').removeClass('-selected');
            $('a[data-target="terms"]').addClass('-selected');
        }
    });
}
