var wagthedog = function() {
    $dogs = $('.footer-doggers img');
    $dogs.hide();
    $($dogs[0]).show();
    

    setInterval(function() {
        // loop through the dogs and show 1 at a time
        setTimeout(function() {
            $dogs.hide();
            $($dogs[0]).show();
        },200);
        setTimeout(function() {
            $dogs.hide();
            $($dogs[1]).show();
        },400);
        setTimeout(function() {
            $dogs.hide();
            $($dogs[2]).show();
        },600);
        setTimeout(function() {
            $dogs.hide();
            $($dogs[1]).show();
        },800);
        setTimeout(function() {
            $dogs.hide();
            $($dogs[0]).show();
        },1000);
        setTimeout(function() {
            $dogs.hide();
            $($dogs[1]).show();
        },1200);
        setTimeout(function() {
            $dogs.hide();
            $($dogs[2]).show();
        },1400);
        setTimeout(function() {
            $dogs.hide();
            $($dogs[1]).show();
        },1600);
        setTimeout(function() {
            $dogs.hide();
            $($dogs[0]).show();
        },1800);
    },6000);



    console.log($dogs[0])
}


$(function() {
    wagthedog();
});