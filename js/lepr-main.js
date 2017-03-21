var char = document.getElementById('char');
var gamewrapper = document.getElementById("game-wrapper");

var lepmove = {
    left: function() {
       TweenMax.to(char, 0.0, {
            x:'-=10',
            backgroundPositionX: '+=32px',
            backgroundPositionY: '-48px'
        })
    },
    right: function() {
       TweenMax.to(char, 0.0, {
            x:'+=10',
            backgroundPositionX: '-=32px',
            backgroundPositionY: '-96px'
        })
    },
    up: function() {
       TweenMax.to(char, 0.0, {
            y:'-=10',
            backgroundPositionX: '+=32px',
            backgroundPositionY: '-144px'
        })
    },
    down: function() {
       TweenMax.to(char, 0.0, {
            y:'+=10',
            backgroundPositionX: '+=32px',
            backgroundPositionY: '-0px'
        })
    },
}

/** Arrow keys char move events */
window.addEventListener("keydown", function(e) {
    var k = e.keyCode || evt.which;
    switch(k) {
        case 37: lepmove.left(); break;
        case 39: lepmove.right(); break;
        case 38: lepmove.up(); break;
        case 40: lepmove.down(); break;
        case 32: TweenMax.to(char, .5, { y:"-=50px", ease:Power2.easeOut});
                 TweenMax.to(char, .5, { y:"+=50px", ease:Bounce.easeOut, delay:.5});
        default: console.log("fall through");
    }

    e.preventDefault();
}, true);
