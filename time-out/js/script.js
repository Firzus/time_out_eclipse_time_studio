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
    this.load.image('base_tiles', 'assets/map.png');
    this.load.tilemapTiledJSON('tilemap', 'assets/map.json');
}

var bg;
var tileset;
var layer;

function create ()
{
    this.add.image(0, 0, 'background').setOrigin(0, 0);
    //bg.fixedToCamera = true;

    this.add.image(0, 0, 'base_tiles');
    //map.setCollisionByExclusion([ 13, 14, 15, 16, 46, 47, 48, 49, 50, 51 ]); SET COLLISION

    // create the Tilemap
    const map = this.make.tilemap({ key: 'tilemap' })

    // add the tileset image we are using
	const tileset = map.addTilesetImage('standard_tiles', 'base_tiles')

    // create the layers we want in the right order
	map.createStaticLayer('Background', tileset)

    // "Ground" layer will be on top of "Background" layer
	map.createStaticLayer('Ground', tileset)

    // the remaining tile layers ...
}

function update ()
{

}

function render ()
{

}