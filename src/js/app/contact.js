function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var handleContact = function() {
    var $modal = $('.modal-waitlist'),
        $closeModal = $('#closeOverlay'),
        $closeBtn = $('.modal-close__button'),
        $pressOpen = $('.button-press'),
        $investorsOpen = $('.button-investors'),
        $pressFirstName = $('#pressFirstName'),
        $pressLastName = $('#pressLastName'),
        $pressEmail = $('#pressEmail'),
        $pressOutlet = $('#pressOutlet'),
        $pressComments = $('#pressComments'),
        $submitPress = $('#submitPress'),
        $investorsFirstName = $('#investorsFirstName'),
        $investorsLastName = $('#investorsLastName'),
        $investorsEmail = $('#investorsEmail'),
        $investorsFirm = $('#investorsFirm'),
        $submitInvestors = $('#submitInvestors'),
        $spinner = $('#contactPreloader'),
        $success = $('#successModal'),
        $successClose = $('#successClose'),
        emailPattern = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

    function resetInvestorsForm() {
        $investorsFirstName.val('');
        $investorsLastName.val('');
        $investorsEmail.val('');
        $investorsFirm.val('');
    }

    function validateInvestorsForm() {
        if ($investorsFirstName.val() !== '' && 
            $investorsLastName.val() !== '' && 
            emailPattern.test($investorsEmail.val()) &&
            $investorsFirm.val() !== '') {
            $submitInvestors.removeClass('-disabled')
        } else {
            $submitInvestors.addClass('-disabled')
        }
    }

    $investorsFirstName.keyup(function() {
        validateInvestorsForm(); 
    })
    $investorsLastName.keyup(function() {
        validateInvestorsForm(); 
    })
    $investorsEmail.keyup(function() {
        validateInvestorsForm(); 
    })
    $investorsFirm.keyup(function() {
        validateInvestorsForm(); 
    })

    $investorsFirstName.on('click', function(){
        $(window).off('resize');
        setTimeout(function() {
            $investorsFirstName.focus()
        },100)
    });
    $investorsLastName.on('click', function(){
        $(window).off('resize');
        setTimeout(function() {
            $investorsLastName.focus()
        },100)
    });
    $investorsEmail.on('click', function(){
        $(window).off('resize');
        setTimeout(function() {
            $investorsEmail.focus()
        },100)
    });
    $investorsFirm.on('click', function(){
        $(window).off('resize');
        setTimeout(function() {
            $investorsFirm.focus()
        },100)
    });

    $submitInvestors.click(function(e) {
        var postData = {
            email: $investorsEmail.val(),
            first_name: $investorsFirstName.val(),
            last_name: $investorsLastName.val(),
            firm: $investorsFirm.val()
        }
        e.preventDefault();
        if (!$submitInvestors.hasClass('-disabled')) {
            $spinner.show();
            $.ajax({
                url: 'https://us-central1-trytruecom-website.cloudfunctions.net/investorInfo',
                type: 'POST',
                data: postData,
                dataType: 'json',
                cache: false,
                beforeSend: function() {

                },
                success: function(data) {
                },
                error: function(xhr, ajaxOptions, thrownError) { // if error occured
                    $spinner.hide();
                },
                complete: function(data) {
                    console.log(data);
                    $success.show();
                    $submitInvestors.hide();
                    $spinner.hide();
                    resetInvestorsForm();
                }
            });
        }
    })

    function resetPressForm() {
        $pressFirstName.val('');
        $pressLastName.val('');
        $pressEmail.val('');
        $pressOutlet.val('');
        $pressComments.val('');
    }

    function validatePressForm() {
        if ($pressFirstName.val() !== '' && 
            $pressLastName.val() !== '' && 
            emailPattern.test($pressEmail.val()) &&
            $pressOutlet.val() !== '' &&
            $pressComments.val()) {
            $submitPress.removeClass('-disabled')
        } else {
            $submitPress.addClass('-disabled')
        }
    }

    $pressFirstName.keyup(function() {
        validatePressForm(); 
    })
    $pressLastName.keyup(function() {
        validatePressForm(); 
    })
    $pressEmail.keyup(function() {
        validatePressForm(); 
    })
    $pressOutlet.keyup(function() {
        validatePressForm(); 
    })
    $pressComments.keyup(function() {
        validatePressForm(); 
    })

    $pressFirstName.on('click', function(){
        $(window).off('resize');
        setTimeout(function() {
            $pressFirstName.focus()
        },100)
    });
    $pressLastName.on('click', function(){
        $(window).off('resize');
        setTimeout(function() {
            $pressLastName.focus()
        },100)
    });
    $pressEmail.on('click', function(){
        $(window).off('resize');
        setTimeout(function() {
            $pressEmail.focus()
        },100)
    });
    $pressOutlet.on('click', function(){
        $(window).off('resize');
        setTimeout(function() {
            $pressOutlet.focus()
        },100)
    });
    $pressComments.on('click', function(){
        $(window).off('resize');
        setTimeout(function() {
            $pressComments.focus()
        },100)
    });

    $submitPress.click(function(e) {
        var postData = {
            email: $pressEmail.val(),
            first_name: $pressFirstName.val(),
            last_name: $pressLastName.val(),
            media_outlet: $pressOutlet.val(),
            comments: $pressComments.val()
        }
        e.preventDefault();
        if (!$submitPress.hasClass('-disabled')) {
            $spinner.show();
            $.ajax({
                url: 'https://us-central1-trytruecom-website.cloudfunctions.net/pressKit',
                type: 'POST',
                data: postData,
                dataType: 'json',
                cache: false,
                beforeSend: function() {

                },
                success: function(data) {
                },
                error: function(xhr, ajaxOptions, thrownError) { // if error occured
                    $spinner.hide();
                },
                complete: function(data) {
                    console.log(data);
                    $success.show();
                    $submitPress.hide();
                    $spinner.hide();
                    resetPressForm();
                }
            });
        }
    })

    $modal.click(function(e) {
        if(e.target == this){
            $modal.fadeOut();
        }
    })
    $closeModal.click(function(e) {
        e.preventDefault();
        $modal.fadeOut();
    })
    $closeBtn.click(function(e) {
        e.preventDefault();
        $modal.fadeOut();
    })
    $successClose.click(function(e) {
        e.preventDefault();
        $modal.fadeOut();
    })
    $pressOpen.click(function(e) {
        e.preventDefault(e);
        $success.hide();
        $submitPress.show();
        $('#investorsModal').hide();
        $('#pressModal').show();
        $modal.fadeIn();
    }) 
    $investorsOpen.click(function(e) {
        e.preventDefault(e);
        $success.hide();
        $submitInvestors.show();
        $('#pressModal').hide();
        $('#investorsModal').show();
        $modal.fadeIn();
    }) 
}


$(function() {
    if ($('body').hasClass('true-FAQ')) {
        handleContact();
    }
});