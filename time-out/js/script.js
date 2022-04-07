var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    parent: "game-container",
    physics: {
        gravity: { y: 0 }, // Top down game, so no gravity
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};

var game = new Phaser.Game(config);
let cursors;
let player;
let showDebug = false;

function preload() {
    this.load.multiatlas('background', 'assets/bg.json', 'assets');

    this.load.image('tiles', 'assets/asset_map.png');

    this.load.tilemapTiledJSON('test', 'assets/projet_map.json');

    this.load.multiatlas('player_template', 'assets/character/main/json/player.json', 'assets/character/main/image');
}

function create() {

    this.add.sprite(0, 0, 'background', 'bg.png');

    const map = this.make.tilemap({ key: 'test' });

    const tileset = map.addTilesetImage('asset_map', 'tiles');

    const belowLayer = map.createStaticLayer('Below Player', tileset, 0, 0);
    const worldLayer = map.createStaticLayer('World', tileset, 0, 0);
    const aboveLayer = map.createStaticLayer('Above Player', tileset, 0, 0);

    worldLayer.setCollisionByProperty({ collides: true });

    // By default, everything gets depth sorted on the screen in the order we created things. Here, we
    // want the "Above Player" layer to sit on top of the player, so we explicitly give it a depth.
    // Higher depths will sit on top of lower depth objects.
    aboveLayer.setDepth(10);

    const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");

    /*// Régler la taille du personnage //

    player = this.physics.add
    .sprite(spawnPoint.x, spawnPoint.y, "atlas", "misa-front")
    .setSize(30, 40)
    .setOffset(0, 24);

    */// Régler la taille du personnage //

    player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "player_template", "player.png");
    this.physics.add.collider(player, worldLayer);

    const debugGraphics = this.add.graphics().setAlpha(0.75);
    worldLayer.renderDebug(debugGraphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });
}

function update(time, delta) {

    // Stop any previous movement from the last frame
    player.body.setVelocity(0);

    /*

    // Horizontal movement
    if (cursors.left.isDown) {
        player.body.setVelocityX(-100);
    } else if (cursors.right.isDown) {
        player.body.setVelocityX(100);
    }

    // Vertical movement
    if (cursors.up.isDown) {
        player.body.setVelocityY(-100);
    } else if (cursors.down.isDown) {
        player.body.setVelocityY(100);
    }

    // Normalize and scale the velocity so that player can't move faster along a diagonal
    player.body.velocity.normalize().scale(speed);

    */
}