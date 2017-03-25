

function Level(width, height, level_type, level_name, difficulty) {
    this.width = width;
    this.height = height;
    this.level_type = level_type;
    this.level_name = level_name;
    this.tile_size = 20;
    this.tiles_accross = this.width / this.tile_size;
    this.tiles_down = this.height / this.tile_size;
    this.total_tiles = this.tiles_accross * this.tiles_down;

    // Generate clovers and coins, each in the amount of tiles across.
    // Assign them to a tile if it isn't taken. If already taken, pass.
    this.gen_game = function() {

        var level_objects = [
            ['clovers'],
            ['coins'],
            ['traps']
        ];
            
        var tile_number = 0;

        for (var i = 0; i < level_objects.length; i++) {

            for (var j = 0; j < this.tiles_accross; j++) {
                tile_number = Math.floor(Math.random() * (this.total_tiles));
                level_objects[i].push(tile_number);
            }
        }
        return level_objects;
    };
}

var LEVEL1 = new Level(500, 500, "trap floor", "clovers and coins", 5);
var levelobjects = LEVEL1.gen_game();
console.log(LEVEL1);
console.log(levelobjects);

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

