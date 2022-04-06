var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
        render: render
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('background', 'assets/bg.png');
    this.load.tilemap('level1', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
}

var bg;
var map;

function create ()
{
    this.add.image(0, 0, 'background').setOrigin(0, 0);
    bg.fixedToCamera = true;
}

function update ()
{

}

function render ()
{

}