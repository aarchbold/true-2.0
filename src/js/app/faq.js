function setAnserHeights() {
    var $answers = $('.faq-questions__item-anwser');

    $('.faq-questions').css('opacity',0);

    $answers.each(function(i,e) {
        $(e).css('display','block');
        $(e).css('height','auto');
    })

    // get height of the answers
    setTimeout(function() {
        $answers.each(function(i,e) {
            $(e).height($(e).outerHeight());
            $(e).hide();
        })
        $('.faq-questions').css('opacity',1);
    },10)
}

function resetFAQ() {
    $('.faq-questions__item-control').each(function(i,e) {
        $(e).removeClass('-open');
    })
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

if ($('body').hasClass('true-FAQ')) {
    $(window).on('load', function(){
        if ($('.faq-questions').length > 0) {
            setAnserHeights();
            $('.faq-questions').handleFAQ();
        }

        // do the deep links
        if (window.location.hash === '#trueStory' || 
            window.location.hash === '#trueTrust' || 
            window.location.hash === '#trueDifference' || 
            window.location.hash === '#trueCost') {
            let faqItem = $(window.location.hash);
            //$('.faq-questions__item-question'
            console.log(faqItem);
            setTimeout(function() {
                $(window).animate({
                    scrollTop: (faqItem.offset().top - 60)
                },200, function() {
                    setTimeout(function() {
                        $('.faq-questions__item-question',faqItem).click();
                        console.log($('.faq-questions__item-question',faqItem));
                    },200)
                });
            },200)
        }
    });
    
    var resizeTimeout;
    var width = $(window).width();
    $(window).resize(function(){
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function(){    
            if ($('.faq-questions').length > 0 && $(window).width() != width) {
                setAnserHeights();
                resetFAQ();
                // $('.faq-questions').unbind();
            }
        }, 200);
    });

}