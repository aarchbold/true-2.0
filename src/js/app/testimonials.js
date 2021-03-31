$(function() {
    if ($('.testimonials-container').length > 0) {
        $('.testimonial-card').slick({
            dots: true,
            arrows: true,
            autoplay: true,
            autoplaySpeed: 6000,
        });
    }
});