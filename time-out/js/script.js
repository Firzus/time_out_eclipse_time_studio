var game = new Phaser.Game(config);

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update,
        render: render
    }
};

var bg;

function preload ()
{
    for (var i = 1; i<9; i++) {
        this.load.image('player'+i,"assets/personnage/player"+i)
    }
    this.load.tilemap('map', 'assets/.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('bg', 'assets/bg.png');
}

function create ()
{
    this.add.image(0, 0, 'bg').setOrigin(0, 0);
    //bg.fixedToCamera = true;
    var r1 = this.add.rectangle(100, 100, 40, 40);
    r1.setStrokeStyle(2, 0x1a65ac);

    console.log ("stest");
}

function update ()
{

}

function render ()
{

}