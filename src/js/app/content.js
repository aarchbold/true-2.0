$.fn.bounceIn = function(){
    
}



$(function() {
    $('#waitListButton').click(function(e) {
        e.preventDefault();
        $(window).animate({
            scrollTop: ($('#joinUs').offset().top)
        },1000);
    })

    $(window).on('DOMContentLoaded load resize scroll', function() {

        if (isElementInViewport($('#sharingSection'))) {
            //$('#sharingSection').addClass('-animate');
        }
        if (isElementInViewport($('#friendsSection'))) {
            //$('#friendsSection').addClass('-animate');
        }
        if (isElementInViewport($('#secureSection'))) {
            //$('#secureSection').addClass('-animate');
        } 
        // else {
        //     console.log('not in view');
        //     $('#sharingSection').removeClass('-animate');
        // }
    }); 
});