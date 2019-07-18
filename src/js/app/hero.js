var isScrollingDown = false;
var scrollDirection;

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
    var $heroContainer = $('#heroStage');
    var $mainSite = $('.main-site__container');
    var $sun = $('.hero-stage__sun',$heroContainer);
    var $shine = $('.main-site__shine',$mainSite);
    var $fogs = $('.hero-stage__fog',$mainSite);
    var $header = $('.hero-stage__header',$heroContainer);
    var $clouds = $('.animated-cloud',$heroContainer);
    var $birds = $('.animated-bird',$mainSite);
    var $baloon1 = $('.main-site__balloon1',$heroContainer);
    var $baloon2 = $('.main-site__balloon2',$heroContainer);
    var $nav = $('.topnav-container');
    var $navInner = $('.navigation-inner');
    var $heroClouds = $('.hero-sky',$heroContainer);
    var $window = $(window);
    
    // set the fog to the screen height
    $fogs.height($(window).height());
    
    startAnimations = function() {
        $sun.addClass('-animate');
        $shine.addClass('-animate');
        // $heroContainer.addClass('-animate');
        $clouds.addClass('-animate');
        $birds.addClass('-animate');
        $baloon1.addClass('-animate');
        $baloon2.addClass('-animate');
        // $heroClouds.addClass('-animate');
    }
    startHeaderTextAnimation = function() {
        $header.addClass('-animate');
    }

    window.addEventListener('scroll', function(){
      var scrollTop = $window.scrollTop();
      if (scrollTop > 20) {
        $header.addClass('-fade');
        $nav.addClass('-show');
      } else {
        $header.removeClass('-fade');
        $nav.removeClass('-show');
      }
      if (scrollTop > 400) {
        $navInner.addClass('-compact');
        $heroContainer.addClass('-animate');
      } else {
        $navInner.removeClass('-compact');
        $heroContainer.removeClass('-animate');
      }
    });
    // start animations
    setTimeout(function() {
        startAnimations();
    },1000)
    setTimeout(function() {
        startHeaderTextAnimation();
    },1250)
    setTimeout(function() {
      // fade fogs
      // $fogs.addClass('-animate');
    },3000)
    setTimeout(function() {
        //make body scrollable 
        $('body').removeClass('-static');
    },4000)
},250);


$(window).on('load', function (e) {
  // executes when complete page is fully loaded, including all frames, objects and images
  // fade out the preload spinner.
  $('.preloader-shim').addClass('-animate');

  initHero();    
  if ($(window).width() > 800) {
    $('[data-scroll-speed]').moveIt();
  }
})
