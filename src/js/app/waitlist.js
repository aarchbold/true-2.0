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
    // var title = 'Just signed up to try this new app, check it out. #DeleteFacebook #BeTrue';
    var title = 'Just signed up to try this new app, check it out.';
    var shareUrl = url + inviteCode + '&title=' + title;
    fbBtn.href = shareUrl; // 1

    fbBtn.click(function(e) {
        // e.preventDefault();
        // var win = window.open(shareUrl, 'ShareOnFb', getWindowOptions());
        // win.opener = null; // 2

        FB.ui({
            method: 'share',
            href: shareUrl,
            // hashtag: '#BeTrue',
            // quote: title,
        }, function(response){});
    });
}

var shareOnTwitter = function(inviteCode) {
    var url = [location.protocol, '//', location.host, location.pathname].join('');
    var tweetBtn = $('.twitter-share');
    var title = encodeURIComponent('Y\'all I just signed up for True, try it with me 😎');
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
        // $input.select();
        $button.text('Link Copied!');
        $input.focus();
        setTimeout(function() {
            $input[0].setSelectionRange(0, 9999);
        }, 1);
        setTimeout(function() {
            document.execCommand('copy');
        }, 100);
    });
}



var initEmailShare = function(inviteCode) {
    var $button = $('.button-send-email');
    var url = [location.protocol, '//', location.host, location.pathname].join('');

    $button.attr('href','mailto:?subject=Hey, just signed up for True 👏&body=True is a new way to share privately with friends, would love for you to try it with me 😁 '+url+inviteCode)
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
    var showModal = getParameterByName('showModal') || false;
    var $closeModal = $('#closeOverlay');
    var $modalSpinner = $('.modal-waitlist__preloader');
    var $formFirstName = $('.footer-input #trueFirstName');
    var $formLastName = $('.footer-input #trueLastName');
    var $formInput = $('.footer-input #trueEmail');
    var $formSubmit = $('.footer-input .footer-signup');
    var emailPattern = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

    if (showModal) {
        $('#emailModal').show();
        $modal.fadeIn();
        $modalSpinner.fadeOut();
        shareOnFacebook('?inviteCode='+referrerCode);
        shareOnTwitter('?inviteCode='+referrerCode);
        initCopyToClip('?inviteCode='+referrerCode);
        initEmailShare('?inviteCode='+referrerCode);
    } else {
        $('#inviteModal').show();
    }

    $formInput.on('click', function(){
        $(window).off('resize');
    });
    $formFirstName.on('click', function(){
        $(window).off('resize');
    });
    $formLastName.on('click', function(){
        $(window).off('resize');
    });

    $formInput.keyup(function() {
        if ($formLastName.val() !== '' && $formFirstName.val() !== '' && emailPattern.test($formInput.val())) {
            $formSubmit.removeClass('-disabled')
        } else {
            $formSubmit.addClass('-disabled')
        }
    })
    $formFirstName.keyup(function() {
        if ($formLastName.val() !== '' && $formFirstName.val() !== '' && emailPattern.test($formInput.val())) {
            $formSubmit.removeClass('-disabled')
        } else {
            $formSubmit.addClass('-disabled')
        }
    })
    $formLastName.keyup(function() {
        if ($formLastName.val() !== '' && $formFirstName.val() !== '' && emailPattern.test($formInput.val())) {
            $formSubmit.removeClass('-disabled')
        } else {
            $formSubmit.addClass('-disabled')
        }
    })

    $formSubmit.click(function(e) {
        var postData = {
            email: $formInput.val(),
            first_name: $formFirstName.val(),
            last_name: $formLastName.val(),
            referrer_code: referrerCode
        }
        e.preventDefault();
        if (!$formSubmit.hasClass('-disabled')) {
            $.ajax({
                url: 'https://us-central1-trytruecom-website.cloudfunctions.net/waitlist',
                type: 'POST',
                data: postData,
                dataType: 'json',
                cache: false,
                beforeSend: function() {
                    $('#emailModal').hide();
                    $('#inviteModal').show();
                    $modal.fadeIn();
                },
                success: function(data) {
                },
                error: function(xhr, ajaxOptions, thrownError) { // if error occured
                },
                complete: function(data) {
                    fbq('track', 'CompleteRegistration');
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
                    $formFirstName.val('');
                    $formLastName.val('');
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
    if ($('body').hasClass('true-home')) {
        handleWaitlist();
    }
});