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
    $heroContainer = $('#heroStage');
    $mainSite = $('.main-site__container');
    $sun = $('.hero-stage__sun',$heroContainer);
    $shine = $('.main-site__shine',$mainSite);
    $fogs = $('.hero-stage__fog',$mainSite);
    $header = $('.hero-stage__header',$heroContainer);
    $clouds = $('.animated-cloud',$heroContainer);
    $birds = $('.animated-bird',$mainSite);
    $baloon1 = $('.main-site__balloon1',$heroContainer);
    $baloon2 = $('.main-site__balloon2',$heroContainer);
    $nav = $('.topnav-container');
    $navInner = $('.navigation-inner');
    var $window = $(window);
    
    // set the fog to the screen height
    $fogs.height($(window).height());
    
    startAnimations = function() {
        $sun.addClass('-animate');
        $shine.addClass('-animate');
        //$fogs.addClass('-animate');
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
      if (scrollTop > 20) {
        $header.addClass('-fade');
        $nav.addClass('-show');
      } else {
        $header.removeClass('-fade');
        $nav.removeClass('-show');
      }
      if (scrollTop > 400) {
        $navInner.addClass('-compact');
        $heroContainer.hide();
      } else {
        $navInner.removeClass('-compact');
        $heroContainer.show();
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
        //make body scrollable 
        $('body').removeClass('-static');
    },2500)
},250);

// function throttle(fn, wait) {
//   var time = Date.now();
//   return function() {
//     if ((time + wait - Date.now()) < 0) {
//       fn();
//       time = Date.now();
//     }
//   }
// }

// function scrollToSection() {
//   let docHeight = $(document).height();
//   console.log('is scrolling');
//   console.log('whole height');
//   console.log(docHeight);
//   console.log($(window).scrollTop());
//   console.log(scrollDirection);
//   // $(window).scrollTo('23%', 1200);
// }


$(window).on('load', function (e) {
  // executes when complete page is fully loaded, including all frames, objects and images
  // fade out the preload spinner.
  $('.preloader-shim').addClass('-animate');

  initHero();    
  if ($(window).width() > 800) {
    $('[data-scroll-speed]').moveIt();
  }
})
