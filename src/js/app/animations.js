$.fn.flappyBird = function() {
    var $context = $(this);
    var $birdCage = $('.animated-bird__inner',$context);

    $birdCage.each(function(i,e) {
        console.log($(e));
        var $birds = $('img',$(e));
        $birds.hide();
        
        setInterval(function() {
            setTimeout(function() {
                $birds.hide();
                $($birds[0]).show();
            },200);
            setTimeout(function() {
                $birds.hide();
                $($birds[1]).show();
            },400);
            setTimeout(function() {
                $birds.hide();
                $($birds[2]).show();
            },600);
        },600);
        console.log($birds);
    });

    // $birds = $('img',$context);
    // $birds.hide();

    // setInterval(function() {
    //     setTimeout(function() {
    //         $birds.hide();
    //         $($birds[0]).show();
    //     },200);
    //     setTimeout(function() {
    //         $birds.hide();
    //         $($birds[1]).show();
    //     },400);
    //     setTimeout(function() {
    //         $birds.hide();
    //         $($birds[2]).show();
    //     },600);
    // },600);
}

var wagthedog = function() {
    var wagcounter = 0
    var tailrotations = 0;
    var waglimit = 6;
    $dogs = $('.footer-doggers img');
    $dogs.hide();
    $($dogs[0]).show();

    function tailwag1() {
        var tail1 = setInterval(function() {
            tailrotations++;
            // loop through the dogs and show 1 at a time
            setTimeout(function() {
                $dogs.hide();
                $($dogs[0]).show();
            },120);
            setTimeout(function() {
                $dogs.hide();
                $($dogs[1]).show();
            },240);
            setTimeout(function() {
                $dogs.hide();
                $($dogs[2]).show();
            },360);
            setTimeout(function() {
                $dogs.hide();
                $($dogs[1]).show();
            },480);
            setTimeout(function() {
                $dogs.hide();
                $($dogs[0]).show();
            },600);
    
            if (tailrotations >= waglimit)
            {
                clearInterval(tail1);
                tailrotations = 0;
            }
        },525);
    }

    tailwag1();
    setInterval(function() {
        wagcounter++;
        waglimit = wagcounter % 2 ? 6 : 2;
        tailwag1();
    }, 6000);
    
}


$(function() {
    if ($('body').hasClass('true-home')) {
        wagthedog();
        $('.animated-bird__container').flappyBird();
    }
});