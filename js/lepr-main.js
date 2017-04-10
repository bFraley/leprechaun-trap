
// Level object  programmatically delivers a level, tile map, and game objects
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

    // Render all game area rows and tiles and game objects within
    this.render = function(levelobjects) {
        var gamewrapper = document.getElementById('game-wrapper');
        var tile_count = 0;

        // Create tile row elements
        for (var i = 1; i <= this.tiles_down; i++) {

            var tile_row = document.createElement('div');
            gamewrapper.appendChild(tile_row);
            tile_row.className = 'tile-row';

            // Populate row with tiles and clovers, coins, and traps

            for (var t = 1; t <= this.tiles_accross; t++) {

                var tile = document.createElement('div');
                tile_row.appendChild(tile);
                tile.className = 'tile';
                tile.id = "" + i + t;  // row number X tile number index
                tile_count += 1;

                // Does this tile get a clover, coin, or trap?
                if (levelobjects[0].indexOf(tile_count) > -1)
                    tile.className += " clovers";
                
                if (levelobjects[1].indexOf(tile_count) > -1)
                    tile.className += " coins";

                if (levelobjects[2].indexOf(tile_count) > -1)
                    tile.className += " traps";
                
            }
        }
    }
};

// Returns tile_map_state containing the coordinates of every game tile
function report_tiles_coords() {
    var tile_map_state = [];
    var tiles = document.getElementsByClassName('tile');

    for (var i = 0; i < tiles.length; i++) {

        var coords = tiles[i].getBoundingClientRect();
        tile_map_state.push(coords);

        return tile_map_state;
    }
}

// Returns left and right side coords of rows
function get_tile_row_coords() {
    var tile_rows = document.getElementsByClassName('tile-row');

    for (var i = 0; i < tile_rows.length; i++) {

        var coords = tile_rows[i].getBoundingClientRect();

        return [coords.left, coords.right];
    }
}

/** Initiate game start values and events */

function leprechaun_trap_init() {

    // Character and game wrapper
    var char = document.getElementById('char');
    var gamewrapper = document.getElementById("game-wrapper");

    // Instantiate a Level, generate game, and render.
    var LEVEL1 = new Level(500, 500, "trap floor", "clovers and coins", 5);
    var levelobjects = LEVEL1.gen_game();
    LEVEL1.render(levelobjects);

    // Basic character movement with arrow keys, and spacebar for jump.
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
        jump: function() {
            TweenMax.to(char, .25, { y:"-=50px", ease:Power2.easeOut});
            TweenMax.to(char, .25, { y:"+=50px", ease:Bounce.easeOut, delay:.25, immediateRender:false});
        },
    }

    /** Arrow keys char move events */
    window.addEventListener("keydown", function(e) {
        var k = e.keyCode || evt.which;
        if (k == 32 || (k >= 37 && k <= 40)) {

            var jumpComplete = false;

            e.preventDefault();
            switch(k) {
                case 37: lepmove.left(); break;
                case 39: lepmove.right(); break;
                case 38: lepmove.up(); break;
                case 40: lepmove.down(); break;
                case 32: lepmove.jump(); break;
                default: false;
            }
        }
    }, false);
}

// Launch
leprechaun_trap_init();
