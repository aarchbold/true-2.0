$(function() {
    if ($('body').hasClass('true-home')) {
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

        // var $secondVideo = $('#secondVideo');
        // $secondVideo[0].playbackRate = 0.65;
        // $secondVideo[0].play();

        // var $thirdVideo = $('#thirdVideo');
        // $thirdVideo[0].playbackRate = 0.65;
        // $thirdVideo[0].play();

        $(window).on('DOMContentLoaded load resize scroll', function() {

            if (isElementInViewport($('#sharingSection'))) {
                //$('#sharingSection').addClass('-animate');
            }
            if (isElementInViewport($('#friendsSection'))) {
                // $('#friendsSection').addClass('-animate');
            }
            if (isElementInViewport($('.footer-waterfall__mist'))) {
                // $('.footer-container').addClass('-animate');
            } 
        });
    }
});