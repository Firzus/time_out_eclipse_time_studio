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

    this.load.image('tiles', 'assets/asset_map.png')

    this.load.tilemapTiledJSON('test', 'assets/projet_map.json')

    this.load.image("asset_map_perso", "character/asset_map_perso.png" )
}

function create ()
{
    this.add.image(0, 0, 'background').setOrigin(0, 0);
 
    const map = this.make.tilemap({key:'test'});
 
    const tileset = map.addTilesetImage('asset_map', 'tiles');
 
    map.createLayer('1', tileset);

    map.createLayer('2', tileset);

    const collision = map.createLayer('3', tileset);

    collision.setCollisionByExclusion([ 37 ]);

    var characterSprite=this.add.sprite(300, 300, "asset_map_perso")

}

function update ()
{
    
}

function render ()
{

}