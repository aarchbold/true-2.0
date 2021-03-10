$.fn.handlePhoneQuote = function() {
    var $context = $(this),
        $quotes = $('.phone-features__quote--slide',$context),
        $screenshots = $('.phone-features__video',$context),
        timer = 7000,
        currentIndex = 0;

    $quotes.hide();
    $screenshots.hide();
    $($quotes[currentIndex]).fadeIn();
    $($screenshots[currentIndex]).show();

    console.log(currentIndex);

    setInterval(function() {
        if (currentIndex === 3) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        $quotes.hide();
        $screenshots.hide();
        $($screenshots[currentIndex]).show();
        $($quotes[currentIndex]).show();
        // setTimeout(function() {
        //     $($quotes[currentIndex]).fadeIn();
        // },500)
        
        console.log(currentIndex);
    },timer);

    console.log($quotes);
}

$(function() {

    if ($('.phone-features').length > 0) {
        $('.phone-features').handlePhoneQuote();
    }
});