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
    $fogs = $('.hero-stage__fog',$mainSite);
    $header = $('.hero-stage__header',$heroContainer);
    $clouds = $('.animated-cloud',$heroContainer);
    $birds = $('.animated-bird',$mainSite);
    $baloon1 = $('.main-site__balloon1',$heroContainer);
    $baloon2 = $('.main-site__balloon2',$heroContainer);
    var $window = $(window);
    
    // set the fog to the screen height
    $fogs.height($(window).height());
    
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

$(function() {
    initHero();
    // window.addEventListener('resize', setHeroHeight);
    // var scene = document.getElementById('scene');
    // var parallaxInstance = new Parallax(scene);
    // console.log(parallaxInstance)
    // $('.main-site__container').paroller();
    
    
    $('[data-scroll-speed]').moveIt();
    
    
    // $.scrollSpeed(100, 800, 'easeOutCubic');


    // $.scrollify({
    //   section : '.scroll-me',
    //   sectionName : 'section-name',
    //   setHeights: false,
    //   //standardScrollElements: '.no-scroll',
    //   scrollSpeed: 1600,
    //   touchScroll: false,
    //   offset: 0
    // });

    $('#scroll-test-1').click(function(e) {
      e.preventDefault();
      //$.scrollTo($("#sharingSection"), 1200);
      $(window).scrollTo('23%', 1200)
      // $(window).scrollTo({top:'50%'}, 800);
    });
    $('#scroll-test-2').click(function(e) {
      e.preventDefault();
      //$.scrollTo($("#sharingSection"), 1200);
      $(window).scrollTo('44%', 1200)
      // $(window).scrollTo({top:'50%'}, 800);
    });
    $('#scroll-test-3').click(function(e) {
      e.preventDefault();
      //$.scrollTo($("#sharingSection"), 1200);
      $(window).scrollTo('65%', 1200)
      // $(window).scrollTo({top:'50%'}, 800);
    });



    // // scroll fun
    // var lastScrollTop = 0;
    // // element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
    // window.addEventListener('scroll', function(){ // or window.addEventListener("scroll"....
    //   var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    //   if (st > lastScrollTop){
    //       scrollDirection = 'down';
    //   } else {
    //     scrollDirection = 'up';
    //   }
    //   lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    // }, false);

    //window.addEventListener('scroll', throttle(scrollToSection, 1000));
});