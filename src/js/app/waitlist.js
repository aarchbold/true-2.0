var handleWaitlist = function() {
    var $modal = $('.modal-waitlist');
    var $closeModal = $('#closeOverlay');
    var $modalSpinner = $('.modal-waitlist__preloader');
    var $formInput = $('.footer-input input');
    var $formSubmit = $('.footer-input .footer-signup');
    var emailPattern = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

    $formInput.keyup(function() {
        if (emailPattern.test($formInput.val())) {
            $formSubmit.removeClass('-disabled')
        } else {
            $formSubmit.addClass('-disabled')
        }
    })

    $formSubmit.click(function(e) {
        e.preventDefault();
        if (!$formSubmit.hasClass('-disabled')) {
            console.log($modal);
            $modal.fadeIn();
            // do the waitlist functionality
            setTimeout(function() {
                $modalSpinner.fadeOut();
            },2000)
        }
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