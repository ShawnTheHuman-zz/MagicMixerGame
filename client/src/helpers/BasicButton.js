/*

BasicButton.js


Adapted from this source:

https://phasergames.com/how-to-make-buttons-in-phaser-3/



 */

export default class BasicButton extends Phaser.GameObjects.Sprite {

    constructor(config) {

        //check if config contains a scene
        if (!config.scene) {
            console.log('missing scene');
            return;
        }
        //check if config contains a key
        if (!config.key) {
            console.log("missing key!");
            return;
        }

        super(config.scene, config.x, config.y, config.key, config.up);


        this.pressed = false;

        //if there is no up property assume 0
        if (!config.up) {
            config.up = 0;
        }
        //if there is no down in config use up
        if (!config.down) {
            config.down = config.up;
        }
        //if there is no over in config use up
        if (!config.over) {
            config.over = config.up;
        }

        this.setInteractive();
        this.on('pointerdown',this.onDown,this);
        this.on('pointerup',this.onUp,this);
        this.on('pointerover',this.onOver,this);
        this.on('pointerout',this.onUp,this);


        config.scene.add.existing(this);

        this.config = config;
    }


    onDown()
    {
        this.setFrame(this.config.down);
        this.pressed = true;
    }
    onOver()
    {
        this.setFrame(this.config.over);
    }
    onUp()
    {
        this.setFrame(this.config.up);
        this.pressed = false;
    }

    isPressed()
    {
        return this.pressed;
    }

}