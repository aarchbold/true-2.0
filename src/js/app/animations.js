var wagthedog = function() {
    $dogs = $('.footer-doggers img');
    $dogs.hide();
    $($dogs[0]).show();
    

    setInterval(function() {
        // loop through the dogs and show 1 at a time
        setTimeout(function() {
            $dogs.hide();
            $($dogs[0]).show();
        },100);
        setTimeout(function() {
            $dogs.hide();
            $($dogs[1]).show();
        },200);
        setTimeout(function() {
            $dogs.hide();
            $($dogs[2]).show();
        },300);
        setTimeout(function() {
            $dogs.hide();
            $($dogs[1]).show();
        },400);
        setTimeout(function() {
            $dogs.hide();
            $($dogs[0]).show();
        },400);
        setTimeout(function() {
            $dogs.hide();
            $($dogs[1]).show();
        },500);
        setTimeout(function() {
            $dogs.hide();
            $($dogs[2]).show();
        },600);
        setTimeout(function() {
            $dogs.hide();
            $($dogs[1]).show();
        },700);
        setTimeout(function() {
            $dogs.hide();
            $($dogs[0]).show();
        },800);
    },8000);



    console.log($dogs[0])
}


$(function() {
    wagthedog();
});