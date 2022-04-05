
this.game.load.image('player', '/asset/player.png')

function GameState() {

    thisCreate = function {

        //création du sprite
        var sprite = game.add.sprite(x, y, 'player');

        //taille du joueur
        sprite.widht = 100
        sprite.height = 100

        //changer le pooint d'encrage
        sprite.anchor.setTo(0.5, 0.9);

        //modifier sa position
        sprite.positioon.setToo(x, y);

    }


    thisCreate = function {

        var zKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
        var sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        var dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        var qKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
    }

    this.update() {



        //enregistrement d'un évènement du clavier
        if (zkey.isDown) {
            sprite.y++
        }
        if (skey.isDown) {
            sprite.y--
        }
        if (dkey.isDown) {
            sprite.x++
        }
        if (qkey.isDown) {
            sprite.x--
        }

    }

}