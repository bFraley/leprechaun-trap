
function report_tiles_coords() {
    var tile_map_state = [];
    var tiles = document.getElementsByClassName('tile');

    for (var i = 0; i < tiles.length; i++) {
        var coords = tiles[i].getBoundingClientRect();
        tile_map_state.push(coords);
        return tile_map_state;
    }
}

function get_tile_row_coords() {
    var tile_rows = document.getElementsByClassName('tile-row');
    for (var i = 0; i < tile_rows.length; i++) {
        var coords = tile_rows[i].getBoundingClientRect();
        console.log(coords.left + " " + coords.right);
        console.log("ROW: " + coords);
    }
}

/** Initiate game start values and events */

function leprechaun_trap_init() {

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
        if (k == 32 || (k >= 37 && k <= 40)) {
            e.preventDefault();
            switch(k) {
                case 37: lepmove.left(); break;
                case 39: lepmove.right(); break;
                case 38: lepmove.up(); break;
                case 40: lepmove.down(); break;
                case 32: TweenMax.to(char, .5, { y:"-=50px", ease:Power2.easeOut});
                         TweenMax.to(char, .5, { y:"+=50px", ease:Bounce.easeOut, delay:.5});
                default: false;
            }
        }
    }, true);

    report_tiles_coords();
    get_tile_row_coords();

}

leprechaun_trap_init();

