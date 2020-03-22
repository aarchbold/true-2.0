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
    var $downloadButtonsAnimateOnly = $('#downloadButtons');
    var $downloadButtons = $('#downloadActualButtons');
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
        if (!$header.hasClass('-fixed')) {
          $downloadButtonsAnimateOnly.addClass('-animate');
          $header.addClass('-animate');
        }
    }

    window.addEventListener('scroll', function(){
      var scrollTop = $window.scrollTop();
      if (scrollTop > 40) {
        $navInner.addClass('-compact');
        $header.addClass('-fade');
        $downloadButtons.addClass('-fade');
      } else {
        $navInner.removeClass('-compact');
        $header.removeClass('-fade');
        $downloadButtons.removeClass('-fade');
      }
    });
    // start animations
    setTimeout(function() {
        startAnimations();
    },1600)
    setTimeout(function() {
        startHeaderTextAnimation();
    },2000)
    setTimeout(function() {
      // fade fogs
      // $fogs.addClass('-animate');
    },3000)
    setTimeout(function() {
        //make body scrollable 
        $('body').removeClass('-static');
    },5000)
},250);

$(function() {
  if ($('body').hasClass('true-home')) {
    if (window.location.hash !== '#waitlist') {
      window.scroll({
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
      });  
    }
    if (window.location.hash === '#waitlist') {
      $('.footer-container').addClass('-animate');
    }
  }
});

function trackFBClick(eventName) {
  fbq('track', eventName);
}

$(window).on('load', function (e) {
  initHero(); 

  // try and get the position of the download buttons.
  var $downloadButtons = $('#downloadButtons');
  var $actualButtons = $('#downloadActualButtons');
  var $buttonsOffset = 16; 


  if ($('body').hasClass('true-home')) {
    if (window.location.hash === '#waitlist') {
      $('.footer-container').addClass('-animate');
      $(window).animate({
          //scrollTop: ($('#joinUs').offset().top - 100)
          scrollTop: $(document).height()
      },100);
    }

    if (getParameterByName('waitlist')) {
      $('.footer-container').addClass('-animate');
      $(window).animate({
          //scrollTop: ($('#joinUs').offset().top - 100)
          scrollTop: $(document).height()
      },100);
    }

    // executes when complete page is fully loaded, including all frames, objects and images
    // fade out the preload spinner.
    $('.preloader-shim').addClass('-animate');
    
    

    var ogWidth = $(window).width();

    if ($(window).width() > 800) {
      $('[data-scroll-speed]').moveIt();
    }
    if ($(window).width() < 1200) {
      $buttonsOffset = 17;
    }
    if ($(window).width() < 1000) {
      $buttonsOffset = 22;
    }
    if ($(window).width() < 640) {
      $buttonsOffset = 30;
      // move footer
      $('.section-footer').appendTo('.section-starts');
    }
    if ($(window).width() < 520) {
      $buttonsOffset = 28;
    }

    console.log($downloadButtons.offset().top)

    $actualButtons.css({
      top: $downloadButtons.offset().top + $buttonsOffset + 'px'
    })
  
    setTimeout(function(){
      $actualButtons.addClass('-fixed');
    },4040)
    
    var resizeTimeout;
    $(window).resize(function(){
        $downloadButtons.removeClass('-animate');
        $downloadButtons.css({
          opacity: 1
        })
        $actualButtons.css({
          top: $downloadButtons.offset().top + $buttonsOffset + 'px',
          opacity: 0
        })

        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function(){   
            $downloadButtons.css({
              opacity: 0
            }) 
            $actualButtons.css({
              top: $downloadButtons.offset().top + $buttonsOffset + 'px',
              opacity: 1
            })
            if (ogWidth < 800 && $(window).width() > 800) {
              // init the parallax if the site starts at mobile and resizes to not mobile
              $('[data-scroll-speed]').moveIt();
            }
            if (ogWidth < 640 && $(window).width() > 640) {
              // check if the footer has been moved.
              $('.section-footer').appendTo('#ogFooterPosition');
            } else if (ogWidth > 640 && $(window).width() < 640) {
              $('.section-footer').appendTo('.section-starts');
            } else if (ogWidth < 640 && $(window).width() < 640) {
              $('.section-footer').appendTo('.section-starts');
            } else {
              $('.section-footer').appendTo('#ogFooterPosition');
            }
        }, 1000);
    });

  }

})
