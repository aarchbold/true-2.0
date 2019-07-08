$.fn.moveIt = function(){
    var $window = $(window);
    var instances = [];
    
    $(this).each(function(){
      instances.push(new moveItItem($(this)));
    });
    
    window.addEventListener('scroll', function(){
      var scrollTop = $window.scrollTop();
      instances.forEach(function(inst){
        inst.update(scrollTop);
      });
    }, {passive: true});
  }
  
var moveItItem = function(el){
    this.el = $(el);
    this.speed = parseInt(this.el.attr('data-scroll-speed'));
};

moveItItem.prototype.update = function(scrollTop){
    this.el.css('transform', 'translateY(' + -(scrollTop / this.speed) + 'px)');
};


initHero = debounce(function() { 
    $heroContainer = $('#heroStage');
    $sun = $('.hero-stage__sun',$heroContainer);
    $fogs = $('.hero-stage__fog',$heroContainer);
    $header = $('.hero-stage__header',$heroContainer);
    $clouds = $('.animated-cloud',$heroContainer);
    $birds = $('.animated-bird',$heroContainer);
    $baloon1 = $('.main-site__balloon1',$heroContainer);
    $baloon2 = $('.main-site__balloon2',$heroContainer);
    var $window = $(window);
    
    // Enable this if we want the hero to take up the window height
    //$heroContainer.height($(window).height());
    
    startAnimations = function() {
        $sun.addClass('-animate');
        $fogs.addClass('-animate');
        $heroContainer.addClass('-animate');
        $clouds.addClass('-animate');
        $birds.addClass('-animate');
        $baloon1.addClass('-animate');
        $baloon2.addClass('-animate');
    }
    startHeaderTextAnimation = function() {
        $header.addClass('-animate');
    }

    window.addEventListener('scroll', function(){
      var scrollTop = $window.scrollTop();
      console.log(scrollTop);
      if (scrollTop > 20) {
        $header.addClass('-fade');
      } else {
        $header.removeClass('-fade');
      }
    });
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
    // var scene = document.getElementById('scene');
    // var parallaxInstance = new Parallax(scene);
    // console.log(parallaxInstance)
    // $('.main-site__container').paroller();
    $('[data-scroll-speed]').moveIt();
    // $.scrollSpeed(100, 800, 'easeOutCubic');
});