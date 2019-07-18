var handleWaitlist = function() {
    var $modal = $('.modal-waitlist');
    var $closeModal = $('#closeOverlay');
    var $modalSpinner = $('.modal-waitlist__preloader');
    var $formInput = $('.footer-input input');
    var $formSubmit = $('.footer-input .footer-signup');

    $formSubmit.click(function(e) {
        e.preventDefault();
        console.log($modal);
        $modal.fadeIn();
        // do the waitlist functionality
        setTimeout(function() {
            $modalSpinner.fadeOut();
        },2000)
    })

    $modal.click(function(e) {
        $modal.fadeOut();
    })
    $closeModal.click(function(e) {
        e.preventDefault();
        $modal.fadeOut();
    })
}


$(function() {
    handleWaitlist();
});