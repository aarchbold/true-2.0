var shareBlogOnTwitter = function(message) {
    var url = window.location.href;
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
    var url = window.location.href;
    var linkedInBtn = $('.linkedin-share');
    var title = message;
    var shareUrl = 'https://www.linkedin.com/sharing/share-offsite/?url=' + url;
    linkedInBtn.href = shareUrl; // 1

    linkedInBtn.click(function(e) {
        e.preventDefault();
        var win = window.open(shareUrl, 'ShareOnLinkedIn', getWindowOptions());
        win.opener = null; // 2
    });
}

var shareBlogOnReddit = function(message) {
    var url = window.location.href;
    var redditBtn = $('.reddit-share');
    var title = 'Check out this blog post at trytrue.com';
    var shareUrl = 'http://www.reddit.com/submit?&url=' + encodeURI(url) + '&title='+ encodeURI(title);
    redditBtn.href = shareUrl; // 1

    redditBtn.click(function(e) {
        // alert(encodeURI(shareUrl));
        e.preventDefault();
        var win = window.open(encodeURI(shareUrl), 'ShareOnReddit', getWindowOptions());
        win.opener = null; // 2
    });
}