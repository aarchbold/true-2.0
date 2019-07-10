$.fn.bounceIn = function(){
    
}


$(function() {
    $(window).on('DOMContentLoaded load resize scroll', function() {

        if (isElementInViewport($('#sharingSection'))) {
            $('#sharingSection').addClass('-animate');
        }
        if (isElementInViewport($('#friendsSection'))) {
            $('#friendsSection').addClass('-animate');
        }
        if (isElementInViewport($('#secureSection'))) {
            $('#secureSection').addClass('-animate');
        } 
        // else {
        //     console.log('not in view');
        //     $('#sharingSection').removeClass('-animate');
        // }
    }); 
});