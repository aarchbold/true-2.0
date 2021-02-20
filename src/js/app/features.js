$.fn.handlePhoneQuote = function() {
    var $context = $(this),
        $quotes = $('.phone-features__quote--slide',$context),
        timer = 5000,
        currentIndex = 0;

    $quotes.hide();
    $($quotes[currentIndex]).fadeIn();

    console.log(currentIndex);

    setInterval(function() {
        if (currentIndex === 2) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        $quotes.fadeOut();
        setTimeout(function() {
            $($quotes[currentIndex]).fadeIn();
        },500)
        
        console.log(currentIndex);
    },timer);

    console.log($quotes);
}

$(function() {

    if ($('.phone-features').length > 0) {
        $('.phone-features').handlePhoneQuote();
    }
});