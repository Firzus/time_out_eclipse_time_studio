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

    this.load.image('asset_map', 'assets/asset_map.png')

    this.load.tilemapTiledJSON('tilemap', 'projet_map.json')
}

var bg;

function create ()
{
    this.add.image(0, 0, 'background').setOrigin(0, 0);
 
    const map = this.add.tilemap({key:'tilemap'});
 
    const tileset = map.addTilesetImage('asset_map', 'asset_map');
 
    map.createLayer('1', tileset);

    map.createLayer('2', tileset);

    map.createLayer('3', tileset);
}

function update ()
{
    
}

function render ()
{

}