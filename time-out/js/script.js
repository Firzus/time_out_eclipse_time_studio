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

    for (var i = 1; i<9; i++) {
        this.load.image('player'+i,"assets/character/main/player"+i+'.png')
    }
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

    player = this.physics.add.sprite(100, 450, 'player5');

    const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");

    .sprite(spawnPoint.x, spawnPoint.y, "atlas", "misa-front")
    .setSize(30, 40)  Régler la taille du personnage
    .setOffset(0, 24);  Régler la taille du personnage

    player.setBounce(0.2);
    this.physics.add.collider(player, worldLayer);

    const camera = this.cameras.main;
    camera.startFollow(player);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    cursors = this.input.keyboard.createCursorKeys();

    // Help text that has a "fixed" position on the screen
    this.add
        .text(16, 16, 'Pour jouer dans de meilleures conditions,\npressez la touche F11', {
            font: "18px monospace",
            fill: "#000000",
            padding: { x: 20, y: 10 },
            backgroundColor: "#ffffff"
        })
        .setScrollFactor(0)
        .setDepth(30);

    // Debug graphics
    this.input.keyboard.once("keydown-D", event => {
        // Turn on physics debugging to show player's hitbox
        this.physics.world.createDebugGraphic();

        // Create worldLayer collision graphic above the player, but below the help text
        const graphics = this.add
            .graphics()
            .setAlpha(0.75)
            .setDepth(20);
        worldLayer.renderDebug(graphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });
    });
}

function update() {

    // Stop any previous movement from the last frame
    player.body.setVelocity(0);

    if (cursors.left.isDown)                            //Allez a gauche
    {
        player.setVelocityY(0);
        player.setVelocityX(-160);
        player.setTexture('player3');
        if (cursors.up.isDown && cursors.left.isDown)
        {
            player.setVelocity(-160,-160);
            player.setTexture('player4');
        }
        if (cursors.down.isDown && cursors.left.isDown)
        {
            player.setVelocity(-160,160);
            player.setTexture('player2');
        }

    }
    else if (cursors.right.isDown)    //Allez a droite
    {
        player.setVelocityY(0);
        player.setVelocityX(160);
        player.setTexture('player7');

        if (cursors.up.isDown && cursors.right.isDown)
        {
            player.setVelocity(160,-160);
            player.setTexture('player6');
        }
        if (cursors.down.isDown && cursors.right.isDown)
        {
            player.setVelocity(160,160);
            player.setTexture('player8');
        }

    }
    else if (cursors.up.isDown)   //Allez en haut
    {
        player.setVelocityX(0);
        player.setVelocityY(-160);
        player.setTexture('player5');
        if (cursors.up.isDown && cursors.left.isDown)
        {
            player.setVelocity(-160,-160);
            player.setTexture('player2');
        }
        if (cursors.up.isDown && cursors.right.isDown)
        {
            player.setVelocity(160,-160);
            player.setTexture('player6');
        }
    }
    else if (cursors.down.isDown)    //Allez en bas
    {
        player.setVelocityX(0);
        player.setVelocityY(160);
        player.setTexture('player1');
        if (cursors.down.isDown && cursors.right.isDown)
        {
            player.setVelocity(160,160);
            player.setTexture('player8');
        }
        if (cursors.down.isDown && cursors.left.isDown)
        {
            player.setVelocity(-160,160);
            player.setTexture('player2');
        }

    }
    else       //S'arreter (ne rien faire)
    {
        player.setVelocityX(0);
        player.setVelocityY(0);
    }
    
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
}