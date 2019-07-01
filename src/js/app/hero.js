setHeroHeight = debounce(function() { 
    $heroContainer = $('#heroStage');
    $sun = $('.hero-stage__sun',$heroContainer);
    $fogs = $('.hero-stage__fog',$heroContainer);
    $header = $('.hero-stage__header',$heroContainer)
    $heroContainer.height($(window).height());
    startAnimations = function() {
        $sun.addClass('-animate');
        $fogs.addClass('-animate');
        $heroContainer.addClass('-animate');
    }
    startHeaderTextAnimation = function() {
        $header.addClass('-animate');
    }

    // start animations
    setTimeout(function() {
        startAnimations();
    },1000)
    setTimeout(function() {
        startHeaderTextAnimation();
    },1500)
},250);


$(function() {
    setHeroHeight();
    window.addEventListener('resize', setHeroHeight);
});