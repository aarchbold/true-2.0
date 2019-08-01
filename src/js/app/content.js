$(function() {
    $('.go-to-footer').click(function(e) {
        e.preventDefault();
        $(window).animate({
            scrollTop: ($('#joinUs').offset().top - 100)
        },1000);
    })

    // slow down video playback
    var $firstVideo = $('#firstVideo');
    $firstVideo[0].playbackRate = 0.65;
    $firstVideo[0].play();

    $(window).on('DOMContentLoaded load resize scroll', function() {

        if (isElementInViewport($('#sharingSection'))) {
            //$('#sharingSection').addClass('-animate');
        }
        if (isElementInViewport($('#friendsSection'))) {
            // $('#friendsSection').addClass('-animate');
        }
        if (isElementInViewport($('.footer-waterfall__mist'))) {
            $('.footer-container').addClass('-animate');
        } 
        // else {
        //     console.log('not in view');
        //     $('#sharingSection').removeClass('-animate');
        // }
    }); 
});