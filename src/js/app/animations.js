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
    wagthedog();
});