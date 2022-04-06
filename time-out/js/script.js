var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    physics: {
        gravity: { y: 0 }, // Top down game, so no gravity
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
    this.load.multiatlas('background', 'assets/bg.json', 'assets');

    this.load.image('tiles', 'assets/asset_map.png');

    this.load.tilemapTiledJSON('test', 'assets/projet_map.json');

    this.load.atlas('player_back', 'assets/character/main/image/player_back.png', 'assets/character/main/json/player_back.json');
    this.load.atlas('player_front', 'assets/character/main/image/player_front.png', 'assets/character/main/json/player_front.json');
    this.load.atlas('player_left', 'assets/character/main/image/player_left.png', 'assets/character/main/json/player_left.json');
    this.load.atlas('player_right', 'assets/character/main/image/player_right.png', 'assets/character/main/json/player_right.json');
}

function create ()
{
    var background = this.add.sprite(0, 0, 'background', 'bg.png');
 
    const map = this.make.tilemap({key:'test'});
 
    const tileset = map.addTilesetImage('asset_map', 'tiles');
 
    map.createLayer('1', tileset);

    map.createLayer('2', tileset);

    const collision = map.createLayer('3', tileset);

    collision.setCollisionByExclusion([ 37 ]);

    const main = this.add.sprite(200, 200, 'player_front', 'player_front.png')

}

function update ()
{
    
}

function render ()
{

}