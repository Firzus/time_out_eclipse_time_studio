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

var haveKey; //variable object recupérable

function preload() {
    this.load.multiatlas('background', 'assets/bg.json', 'assets');

    this.load.image('tiles', 'assets/asset_map.png');

    this.load.tilemapTiledJSON('test', 'assets/projet_map.json');

    this.load.atlas("player", "assets/character/main/image/player.png", "assets/character/main/json/player.json");
    
    this.load.image('cle', 'assets/props/Cle_blanche.png');         //objet recupérable
    this.load.image('porte_ferme', 'assets/props/porte_ferme.png');     //porte ferme a clé
}

function create() {

    this.add.sprite(0, 0, 'background', 'bg.png');

    const map = this.make.tilemap({ key: 'test' });

    const tileset = map.addTilesetImage('asset_map', 'tiles');

    const belowLayer = map.createLayer('Below Player', tileset, 0, 0);
    const worldLayer = map.createLayer('World', tileset, 0, 0);
    const aboveLayer = map.createLayer('Above Player', tileset, 0, 0);
    const collisionLayer = map.createLayer('Collision', tileset, 0, 0);

    collisionLayer.setCollision([37]);
        ekey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E); //interagir

    // By default, everything gets depth sorted on the screen in the order we created things. Here, we
    // want the "Above Player" layer to sit on top of the player, so we explicitly give it a depth.
    // Higher depths will sit on top of lower depth objects.
    aboveLayer.setDepth(10);

    const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");

    player = this.physics.add
        .sprite(spawnPoint.x, spawnPoint.y, "player")
    //.setSize(0, 0)
    //.setOffset(0, 0);

    player.setBounce(0.2);
    this.physics.add.collider(player, collisionLayer, function(player, collisionLayer) {
        player.setVelocity(1)
    });

    const camera = this.cameras.main;
    this.cameras.main.startFollow(player);
    // this.cameras.main.roundPixels = true;
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.cameras.main.setZoom(2.5);

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

    ekey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E); //interagir

    obj_clef = this.physics.add.group({                 //Clé
        key: 'cle',
        setSize: {width: 50, height: 50},
        setXY: { x: 1400, y: 700}
    });
    obj_porte_ferme = this.physics.add.group({               //porte ferme a clé
        key: 'porte_ferme',
        setSize: {width: 50, height: 50},
        setXY: { x: 1400, y: 800}
    });

    // Debug graphics
    this.input.keyboard.once("keydown-D", event => {
        // Turn on physics debugging to show player's hitbox
        this.physics.world.createDebugGraphic();

        // Create worldLayer collision graphic above the player, but below the help text
        const graphics = this.add
            .graphics()
            .setAlpha(0.75)
            .setDepth(20);
        collisionLayer.renderDebug(graphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });
    });

}

function collectKey (player, obj_clef)
{
    obj_clef.disableBody(true, true);
    haveKey = true;
    return haveKey
}
function enigmePorte (player, obj_porte_ferme)
{
    obj_porte_ferme.disableBody(true, true);
}

function update(time, delta) {
    const speed = 100;
    const prevVelocity = player.body.velocity.clone();

    if (ekey.isDown)
    {
        this.physics.add.overlap(player, obj_clef, collectKey, null, this);       //ramasse la clé avec la touche 'E'
    }
    if (ekey.isDown && haveKey)                                                         //ouverture d'une porte avec la cle
    {
        this.physics.add.overlap(player, obj_porte_ferme, enigmePorte, null, this);
    }

    // Stop any previous movement from the last frame
    player.body.setVelocity(0);

    player.body.setVelocity(0);

    // Horizontal movement
    if (cursors.left.isDown) {
        player.body.setVelocityX(-speed);
    } else if (cursors.right.isDown) {
        player.body.setVelocityX(speed);
    }

    // Vertical movement
    if (cursors.up.isDown) {
        player.body.setVelocityY(-speed);
    } else if (cursors.down.isDown) {
        player.body.setVelocityY(speed);
    }

    // Normalize and scale the velocity so that player can't move faster along a diagonal
    player.body.velocity.normalize().scale(speed);

        // If we were moving, pick and idle frame to use
        if (prevVelocity.x < 0) player.setTexture("player", "player_dos_gauche.png");
        else if (prevVelocity.x > 0) player.setTexture("player", "player_dos_droite.png");
        else if (prevVelocity.y < 0) player.setTexture("player", "player_dos.png");
        else if (prevVelocity.y > 0) player.setTexture("player", "player_face.png");
    }