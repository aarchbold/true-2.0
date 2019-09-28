$.fn.handleFAQ = function() {
    var $context = $(this);
    var $questions = $('.faq-questions__item', $context);
    $questions.each(function(i,e) {
        $('.faq-questions__item-question',$(this)).click(function() {
            $('.faq-questions__item-anwser',$(this).parent()).toggleClass('-open');
            $('.faq-questions__item-control',$(this)).toggleClass('-open');
        })
    })
}

$(function() {
    if ($('.faq-questions').length > 0) {
        $('.faq-questions').handleFAQ();
    }
});