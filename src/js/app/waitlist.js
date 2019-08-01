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

var shareOnFacebook = function(inviteCode) {
    var url = [location.protocol, '//', location.host, location.pathname].join('');
    var fbBtn = $('.facebook-share');
    var title = encodeURIComponent('Check out this new social network I just found—you can make private threads with your favorite people (like me 😄). Sign up so we can be the first to try it:');
    var shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + url + inviteCode + '&title=' + title;
    fbBtn.href = shareUrl; // 1

    fbBtn.click(function(e) {
        e.preventDefault();
        var win = window.open(shareUrl, 'ShareOnFb', getWindowOptions());
        win.opener = null; // 2
    });
}

var shareOnTwitter = function(inviteCode) {
    var url = [location.protocol, '//', location.host, location.pathname].join('');
    var tweetBtn = $('.twitter-share');
    var title = encodeURIComponent('Check out this new social network I just found—you can make private threads with your favorite people (like me 😄). Sign up so we can be the first to try it:');
    var shareUrl = 'https://twitter.com/intent/tweet?text=' + title + '&url=' + url + inviteCode;
    tweetBtn.href = shareUrl; // 1

    tweetBtn.click(function(e) {
        e.preventDefault();
        var win = window.open(shareUrl, 'ShareOnTwitter', getWindowOptions());
        win.opener = null; // 2
    });
}

var initCopyToClip = function(inviteCode) {
    var $input = $('#clipboardCopy');
    var $button = $('#copyUrl');
    var url = [location.protocol, '//', location.host, location.pathname].join('');

    $input.attr('value',url + inviteCode);

    $button.click(function(e) {
        e.preventDefault();
        $input.select();
        document.execCommand('copy');
        $button.text('Link Copied!');
    });
}

var initEmailShare = function(inviteCode) {
    var $button = $('.button-send-email');
    var url = [location.protocol, '//', location.host, location.pathname].join('');

    $button.attr('href','mailto:?subject=Sign up to try True with me&body=Hi, I just signed up to try this new social network called True. It lets you make private threads with your favorite people (like me 😄). Sign up so we can try it together: '+url+inviteCode)
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var handleWaitlist = function() {
    var $modal = $('.modal-waitlist');
    var referrerCode = getParameterByName('inviteCode') || null;
    var $closeModal = $('#closeOverlay');
    var $modalSpinner = $('.modal-waitlist__preloader');
    var $formName = $('.footer-input #trueName');
    var $formInput = $('.footer-input #trueEmail');
    var $formSubmit = $('.footer-input .footer-signup');
    var emailPattern = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

    $formInput.keyup(function() {
        if ($formName.val() !== '' && emailPattern.test($formInput.val())) {
            $formSubmit.removeClass('-disabled')
        } else {
            $formSubmit.addClass('-disabled')
        }
    })
    $formName.keyup(function() {
        if ($formName.val() !== '' && emailPattern.test($formInput.val())) {
            $formSubmit.removeClass('-disabled')
        } else {
            $formSubmit.addClass('-disabled')
        }
    })

    $formSubmit.click(function(e) {
        var postData = {
            email: $formInput.val(),
            full_name: $formName.val(),
            referrer_code: referrerCode
        }
        e.preventDefault();
        if (!$formSubmit.hasClass('-disabled')) {
            $.ajax({
                url: 'https://us-central1-trueappco-website.cloudfunctions.net/waitlist',
                type: 'POST',
                data: postData,
                dataType: 'json',
                cache: false,
                beforeSend: function() {
                    $modal.fadeIn();
                },
                success: function(data) {
                },
                error: function(xhr, ajaxOptions, thrownError) { // if error occured
                },
                complete: function(data) {
                    let inviteCode = '';
                    console.log(data.responseJSON);
                    if (data.responseJSON && data.responseJSON.inviteCode) {
                        inviteCode = data.responseJSON.inviteCode;
                    }
                    shareOnFacebook(inviteCode);
                    shareOnTwitter(inviteCode);
                    initCopyToClip(inviteCode);
                    initEmailShare(inviteCode);
                    $modalSpinner.fadeOut();
                    $formInput.val('');
                    $formName.val('');
                }
            });
        }
    })

    $modal.click(function(e) {
        if(e.target == this){
            $modal.fadeOut();
        }
    })
    $closeModal.click(function(e) {
        e.preventDefault();
        $modal.fadeOut();
    })
}


$(function() {
    handleWaitlist();
});