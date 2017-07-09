
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
function get_tilemap_coords() {
    var tile_map_state = [];
    var tiles = document.getElementsByClassName('tile');

    for (var i = 0; i < tiles.length; i++) {

        var coords = tiles[i].getBoundingClientRect();
        tile_map_state.push(coords);
    }

    return tile_map_state;
}

// Returns left and right side coords of rows
function get_tilerow_coords() {
    var tile_rows = document.getElementsByClassName('tile-row');
    var row_coords = [];

    for (var i = 0; i < tile_rows.length; i++) {

        var coords = tile_rows[i].getBoundingClientRect();
        row_coords.push([coords.left, coords.right]);
    }

    return row_coords;
}

function get_gamepiece_coords(piece_class) {
    var pieces = document.getElementsByClassName(piece_class);
    var piece_coords = [];

    for (var i = 0; i < pieces.length; i++) {

        var coords = pieces[i].getBoundingClientRect();
        piece_coords.push([coords.left, coords.right, coords.top, coords.bottom]);
    }

    return piece_coords;
}

function get_char_coords() {
    var lep = document.getElementById('char');
    return lep.getBoundingClientRect();
}

function check_collision() {
    var coins = get_gamepiece_coords('coins');
    var clovers = get_gamepiece_coords('clovers');
    var traps = get_gamepiece_coords('traps');

    var player_loc = get_char_coords();
    var top = player_loc.top;
    var bottom = player_loc.top;
    var left = player_loc.left;
    var right = player_loc.right;

    // Ugly Collision
    for (var i = 0; i < coins.length; i++) {

        // Coins
        if (right >= coins[i][0] && right <= coins[i][1]
                && bottom >= coins[i][2] && bottom < coins[i][3]) {

            document.getElementsByClassName('coins')[i].style.background = "#333";
        }
        else if (left >= coins[i][0] && left <= coins[i][1]
                && top >= coins[i][2] && top < coins[i][3]) {

            document.getElementsByClassName('coins')[i].style.background = "#333";
        }

        // Clovers
        else if (right >= clovers[i][0] && right <= clovers[i][1]
                && bottom >= clovers[i][2] && bottom < clovers[i][3]) {

            document.getElementsByClassName('clovers')[i].style.background = "#333";
        }
        else if (left >= clovers[i][0] && left <= clovers[i][1]
                && top >= clovers[i][2] && top < clovers[i][3]) {

            document.getElementsByClassName('clovers')[i].style.background = "#333";
        }

        // Traps
        else if (right >= traps[i][0] && right <= traps[i][1]
                && bottom >= traps[i][2] && bottom < traps[i][3]) {

            document.getElementsByClassName('traps')[i].style.backgroundColor = "red";
        }
        else if (left >= traps[i][0] && left <= traps[i][1]
                && top >= traps[i][2] && top < traps[i][3]) {

            document.getElementsByClassName('traps')[i].style.backgroundColor = "red";
        }
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

           check_collision();
        },
        right: function() {
           TweenMax.to(char, 0.0, {
                x:'+=10',
                backgroundPositionX: '-=32px',
                backgroundPositionY: '-96px'
            })

           check_collision();
        },
        up: function() {
           TweenMax.to(char, 0.0, {
                y:'-=10',
                backgroundPositionX: '+=32px',
                backgroundPositionY: '-144px'
            })

           check_collision();
        },
        down: function() {
           TweenMax.to(char, 0.0, {
                y:'+=10',
                backgroundPositionX: '+=32px',
                backgroundPositionY: '-0px'
            })

           check_collision();
        },
        jump: function() {
            TweenMax.to(char, .25, { y:"-=20px", ease:Power2.easeOut});
            check_collision();
            // TweenMax.to(char, .25, { y:"+=50px", ease:Bounce.easeOut, delay:.25, immediateRender:false});
            // check_collision();
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


tiles = get_tilemap_coords();
rows = get_tilerow_coords();
coins = get_gamepiece_coords('coins');
clovers = get_gamepiece_coords('clovers');
traps = get_gamepiece_coords('traps');

console.log(tiles);
console.log(rows);
console.log('*****************************************');
console.log(coins);
console.log(clovers);
console.log(traps);

