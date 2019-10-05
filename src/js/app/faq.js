function setAnserHeights() {
    var $answers = $('.faq-questions__item-anwser');

    // get height of the answers
    setTimeout(function() {
        $answers.each(function(i,e) {
            console.log($(e).height())
            $(e).height($(e).outerHeight());
            $(e).hide();
        })
    },10)
}

$.fn.handleFAQ = function() {
    var $context = $(this),
    $questions = $('.faq-questions__item', $context);

    $context.css('opacity',1);

    $questions.each(function(i,e) {
        $('.faq-questions__item-question',$(this)).click(function() {
            if ($('.faq-questions__item-control',$(this)).hasClass('-open')) {
                $('.faq-questions__item-anwser',$(this).parent()).slideUp(500);
            } else {
                $('.faq-questions__item-anwser',$(this).parent()).slideDown(500);
            }
            $('.faq-questions__item-control',$(this)).toggleClass('-open');
        })
    })
}


$(window).on('load', function(){
    if ($('.faq-questions').length > 0) {
        setAnserHeights();
        $('.faq-questions').handleFAQ();
    }
});

$(window).on('resize', function(){
    // setAnserHeights();
});