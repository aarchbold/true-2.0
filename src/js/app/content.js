var getWindowOptions = function() {
    var width = 500;
    var height = 450;
    var left = (window.innerWidth / 2) - (width / 2);
    var top = (window.innerHeight / 2) - (height / 2);
  
    return [
      'resizable,scrollbars,status',
      'height=' + height,
      'width=' + width,
      'left=' + left,
      'top=' + top,
    ].join();
  };

var shareOnFacebook = function() {
    var fbBtn = $('.facebook-share');
    var title = encodeURIComponent('Check out this new social network I just found—you can make private threads with your favorite people (like me 😄). Sign up so we can be the first to try it:');
    var shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + location.href + '&title=' + title;
    fbBtn.href = shareUrl; // 1

    fbBtn.click(function(e) {
        e.preventDefault();
        var win = window.open(shareUrl, 'ShareOnFb', getWindowOptions());
        win.opener = null; // 2
    });
}

var shareOnTwitter = function() {
    var tweetBtn = $('.twitter-share');
    var title = encodeURIComponent('Check out this new social network I just found—you can make private threads with your favorite people (like me 😄). Sign up so we can be the first to try it:');
    var shareUrl = 'https://twitter.com/intent/tweet?text=' + title + '&url=' + location.href;
    tweetBtn.href = shareUrl; // 1

    tweetBtn.click(function(e) {
        e.preventDefault();
        var win = window.open(shareUrl, 'ShareOnTwitter', getWindowOptions());
        win.opener = null; // 2
    });
}

var initCopyToClip = function() {
    var $input = $('#clipboardCopy');
    var $button = $('#copyUrl');

    $input.attr('value',window.location.href);

    $button.click(function(e) {
        e.preventDefault();
        $input.select();
        document.execCommand('copy');
        $button.text('Link Copied!');
    });
}


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

    shareOnFacebook();
    shareOnTwitter();
    initCopyToClip();

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