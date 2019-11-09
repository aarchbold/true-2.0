var shareBlogOnTwitter = function(message) {
    var url = [location.protocol, '//', location.host, location.pathname].join('');
    var tweetBtn = $('.twitter-share');
    var title = message;
    var shareUrl = 'https://twitter.com/intent/tweet?text=' + title + '&url=' + url;
    tweetBtn.href = shareUrl; // 1

    tweetBtn.click(function(e) {
        e.preventDefault();
        var win = window.open(shareUrl, 'ShareOnTwitter', getWindowOptions());
        win.opener = null; // 2
    });
}

var shareBlogOnLinkedIn = function(message) {
    var url = [location.protocol, '//', location.host, location.pathname].join('');
    var linkedInBtn = $('.linkedin-share');
    var title = message;
    var shareUrl = 'https://www.linkedin.com/sharing/share-offsite/?url' + url;
    linkedInBtn.href = shareUrl; // 1

    linkedInBtn.click(function(e) {
        e.preventDefault();
        var win = window.open(shareUrl, 'ShareOnLinkedIn', getWindowOptions());
        win.opener = null; // 2
    });
}