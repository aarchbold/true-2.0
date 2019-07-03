initHero = debounce(function() { 
    $heroContainer = $('#heroStage');
    $sun = $('.hero-stage__sun',$heroContainer);
    $fogs = $('.hero-stage__fog',$heroContainer);
    $header = $('.hero-stage__header',$heroContainer);
    $clouds = $('.animated-cloud',$heroContainer);
    $birds = $('.animated-bird',$heroContainer);
    
    // Enable this if we want the hero to take up the window height
    //$heroContainer.height($(window).height());
    
    startAnimations = function() {
        $sun.addClass('-animate');
        $fogs.addClass('-animate');
        $heroContainer.addClass('-animate');
        $clouds.addClass('-animate');
        $birds.addClass('-animate');
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
    },2500)
},250);


$(function() {
    initHero();
    // window.addEventListener('resize', setHeroHeight);
});