import io from 'socket.io-client';
import BasicButton from "../helpers/BasicButton";

export default class MainMenu extends Phaser.Scene {
    constructor() {
        super({
            key: 'MainMenu'
        });

        this.gameDifficulty = 0;

    }



    preload()
    {

        this.registry.set("difficulty", 1);

        this.load.image('mainMenuBackground', 'src/assets/art/background/MainMenu_background.png');

        this.load.image('button', 'src/assets/art/Button/MainMenu_Button.png');

        this.load.image('buttonHighlight', 'src/assets/art/Button/MainMenu_Button.png');

        this.load.image('buttonClick', 'src/assets/art/Button/MainMenu_Button.png');

        this.load.spritesheet("how_to_play", "src/assets/art/Instructions/How_to_Play_Sheet.png", {frameWidth: 80, frameHeight: 119});

    }


    create()
    {
        let self = this;

        self.diff = 0;

        /*
         Group each button and text under each difficulty

         User should click on button, not on text
        */

        self.registry.set("gameDifficulty",0);

        self.add.image(0, 0, "mainMenuBackground").setOrigin(0,0);

        self.add.image(225, 160, "button").setOrigin(0,0);

        self.add.image(225, 240, "button").setOrigin(0,0);

        self.add.image(225, 320, "button").setOrigin(0,0);

        self.add.image(225, 400, "button").setOrigin(0,0);

        self.add.image(225, 480, "button").setOrigin(0,0);

        this.difficulty1 = this.add.text(260, 180, ['Play Easy Game (*)']).setFontSize(22).setFontFamily('Verdana').setColor('#2c1e31').setInteractive();

        this.difficulty2 =this.add.text(260, 260, ['Play Medium Game (**)']).setFontSize(22).setFontFamily('Verdana').setColor('#2c1e31').setInteractive();

        this.difficulty3 =this.add.text(260, 340, ['Play Hard Game (***)']).setFontSize(22).setFontFamily('Verdana').setColor('#2c1e31').setInteractive();

        this.player1 = this.add.text(260, 420, ['Choose Player 1']).setFontSize(22).setFontFamily('Verdana').setColor('#2c1e31').setInteractive();

        this.player2 = this.add.text(260, 500, ['Choose Player 2']).setFontSize(22).setFontFamily('Verdana').setColor('#2c1e31').setInteractive();


        this.difficulty1.on("pointerover", function(){

            self.difficulty1.setColor("#f6e8e0");
        })

        this.difficulty2.on("pointerover", function(){

            self.difficulty2.setColor("#f6e8e0");
        })

        this.difficulty3.on("pointerover", function(){

            self.difficulty3.setColor("#f6e8e0");
        })

        this.difficulty1.on("pointerout", function(){

            if(self.diff === 1)
            {
                self.difficulty1.setColor('#8c78a5');
            }
            else
                self.difficulty1.setColor('#2c1e31');


        })

        this.difficulty2.on("pointerout", function(){

            if(self.diff === 2)
            {
                self.difficulty2.setColor('#8c78a5');
            }
            else
                self.difficulty2.setColor('#2c1e31');
        })

        this.difficulty3.on("pointerout", function(){

            if(self.diff === 3)
            {
                self.difficulty3.setColor('#8c78a5');
            }
            else
                self.difficulty3.setColor('#2c1e31');
        })

        this.player1.on("pointerover", function(){

            self.player1.setColor('#f6e8e0');
        })

        this.player1.on("pointerout", function(){

            self.player1.setColor('#2c1e31');
        })

        this.player2.on("pointerover", function(){

            self.player2.setColor('#f6e8e0');
        })

        this.player2.on("pointerout", function(){

            self.player2.setColor('#2c1e31');
        })


        this.difficulty1.on('pointerup', function () {
            self.difficulty1.setColor('#8c78a5');
            self.difficulty1.disableInteractive();


            self.difficulty2.setInteractive();
            self.difficulty2.setColor('#2c1e31');
            self.difficulty3.setInteractive();
            self.difficulty3.setColor('#2c1e31');
            choosePlayer(1);
        })

        this.difficulty2.on('pointerup', function () {
            self.difficulty2.setColor('#8c78a5');
            self.difficulty2.disableInteractive();



            self.difficulty1.setInteractive();
            self.difficulty1.setColor('#2c1e31');
            self.difficulty3.setInteractive();
            self.difficulty3.setColor('#2c1e31');
            choosePlayer(2);
        })

        this.difficulty3.on('pointerup', function () {
            self.difficulty3.setColor('#8c78a5');
            self.difficulty3.disableInteractive();

            self.difficulty1.setInteractive();
            self.difficulty1.setColor('#2c1e31');
            self.difficulty2.setInteractive();
            self.difficulty2.setColor('#2c1e31');
            choosePlayer(3);
        })

        function enterGame(difficultyLevel, playerChoice) {

            self.registry.set("gameDifficulty", difficultyLevel);

            if(playerChoice === 1) {
                self.scene.start("Player1");
            } else if(playerChoice === 2) {
                self.scene.start("Player2");
            }
        }

        function choosePlayer (difficultyLevel) {

            self.diff = difficultyLevel;

            console.log("Game Difficulty = " + difficultyLevel);

            self.player1.on('pointerup', function () {
                console.log("User chose Player1!");
                enterGame(difficultyLevel, 1);
            })

            self.player2.on('pointerup', function () {
                console.log("User chose Player2!");
                enterGame(difficultyLevel, 2);
            })
        }


        self.how_to_play = new BasicButton({
            'scene': this,
            'key':'how_to_play',
            'up': 0,
            'over':1,
            'down':2,
            'x': 730,
            'y': 250});



        self.how_to_play.on("pointerdown",function()
        {
            self.scene.start("Instructions");

        })

    }






}