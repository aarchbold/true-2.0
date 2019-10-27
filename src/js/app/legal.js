$.fn.handleLegalNav = function() {
    var $items = $('.legal-nav a'),
        $privacyPanel = $('#privacy'),
        $termsPanel = $('#terms');

    $items.click(function(e) {
        e.preventDefault();
        $items.removeClass('-selected');
        console.log($(this).data('target') === 'privacy');
        $privacyPanel.hide();
        $termsPanel.hide();

        if ($(this).data('target') === 'privacy') {
            $('a[data-target="privacy"]').addClass('-selected');
            $privacyPanel.fadeIn();
        } else {
            $('a[data-target="terms"]').addClass('-selected');
            $termsPanel.fadeIn();
        }
        // $(window).animate({
        //     scrollTop: ($('#'+$(this).data('target')).offset().top - 80)
        // },400);
    })
}

if ($('body').hasClass('true-legal')) {
    $(window).on('load', function(){
        $('.true-legal').handleLegalNav();

        if (window.location.hash === '#section=terms') {
            // $(window).animate({
            //     scrollTop: ($('#terms').offset().top - 80)
            // },400);
            $('a[data-target="privacy"]').removeClass('-selected');
            $('a[data-target="terms"]').addClass('-selected');
            $('#terms').fadeIn();
        } else {
            $('#privacy').fadeIn();
        }
    });
}
