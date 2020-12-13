import io from 'socket.io-client';
// import Beaker from "../helpers/beaker";
import Chooser from "../helpers/chooser";
import Beaker from "../helpers/beaker";
import Thermometer from "../helpers/thermometer";
import PHMeter from "../helpers/phMeter";
import ChatBox from "../helpers/chatBox";
import BasicButton from "../helpers/BasicButton";

import Stopwatch from "../helpers/Stopwatch"

// import Chemical from "../helpers/chemical";


/*

This code should contain everything related to the game itself.

Player 1 enters the game by setting the difficulty in Main Menu, and then entering this game scene screen.


 */


export default class Player2 extends Phaser.Scene {
    constructor() {
        super({
            key: 'Player2'
        });

        this.gameDifficulty;
    }

    preload() {
        this.load.image('player2Background', 'src/assets/art/background/Player2_Background2.png');

        this.load.image('beaker', 'src/assets/art/beaker/beaker.png');
        this.load.image('beakerFluid', 'src/assets/art/beaker/beaker_liquid.png');

        this.load.image("thermometer_base", "src/assets/art/Player2_Thermometer/Player2_Thermometer_base.png");

        this.load.image("pHmeter_base", "src/assets/art/Player2_pHmeter/Player2_ph_template.png");

        this.load.spritesheet("LCD", "src/assets/art/Player2_Thermometer/LCD_Sheet.png", {frameWidth: 12, frameHeight: 19});

        //ChatBox
        this.load.image("notepage",'src/assets/art/ChatBox/chat-notepage.png' );
        this.load.spritesheet("notepage-button",'src/assets/art/ChatBox/chat-sendarrow-sheet.png',{ frameWidth: 29, frameHeight: 28 });


        //UI Buttons
        this.load.spritesheet("mainmenu-button",'src/assets/art/Instructions/MainMenu-Button-Sheet.png',{frameWidth: 55, frameHeight: 55});
        this.load.image("mainmenu-scrap", 'src/assets/art/Instructions/PaperScrap-MainMenu.png');


        //Stopwatch
        this.load.image("Stopwatch","src/assets/art/Stopwatch/Stopwatch_base.png");


    }



    create() {

        let self = this;
        this.self2 = this;

        this.timeArray = [0,0,0,0];

        this.socket = io('http://localhost:3000');

        self.socket.on('isPlayer2', function () {
            console.log(self.socket.id + " connected as Player2")
            self.socket.emit('player2Connected');
        });

        self.add.image(0, 0, "player2Background").setOrigin(0,0);


        self.gameDifficulty = self.registry.get("gameDifficulty");

        //PlayerBeaker
        this.playerBeaker = new Beaker(self, self.gameDifficulty);


        this.playerBeakerSprite = this.playerBeaker.render(200,340,'beaker', 'beakerFluid');

        //TargetBeaker
        this.targetBeaker = new Beaker(self, self.gameDifficulty);


        this.targetBeakerSprite = this.targetBeaker.render(600,340,'beaker', 'beakerFluid');

        this.playerName = "Analyzer";


        //Random Beaker Listener
        self.socket.on('getRandomBeaker', ({ beakerC }) => {

            this.targetBeaker.adaptBeakerContents(beakerC);

        });

        //Player Beaker Listener
        self.socket.on('getPlayerBeaker', ({ beakerC }) => {

            this.playerBeaker.adaptBeakerContents(beakerC);

        });






        self.number0 = this.add.image(710, 710, "TEST");

        this.chooser = new Chooser(this);


        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;


            self.updateNumberPositions();




        });
        this.input.on('dragend', function (pointer, gameObject, dropped) {
            gameObject.setTint();
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        })

        this.input.on('drop', function (pointer, gameObject) {
            gameObject.x = x;
            gameObject.y = y;
            gameObject.disableInteractive();

        })

        // this bounces the objects back to their starting positions

        this.input.on('dragend', function (pointer, gameObject, dropped) {

            if (!dropped)
            {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }

            self.updateNumberPositions();

            // graphics.clear();
            // graphics.lineStyle(2, 0xffff00);
            // graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);

        });



        let playerName = "Analyzer"

        let noteX = 400;
        let noteY = 160;

        self.notepad = new ChatBox(self, playerName);
        self.notepad.render(noteX, noteY, "notepage");

        self.notepad_button = new BasicButton({
            'scene': this,
            'key':'notepage-button',
            'up': 0,
            'over':1,
            'down':1,
            'x': noteX + 77,
            'y': noteY + 98
        });




        self.notepad_button.on('pointerdown',this.onPressed,this);


        //We are deleting a character.  keyCode 8 is the Delete Key.
        this.input.keyboard.on('keydown', function (event) {

            //We are deleting a character.  keyCode 8 is the Delete Key.
            if (event.keyCode === 8)
            {
                self.notepad.deleteCharacter();
            }
            //We are adding a character.
            else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode <= 90))
            {

                self.notepad.updateCurrentString(event.key);
            }
            //This refers to the ENTER character.
            else if(event.keyCode === 13)
            {
                self.notepad.updateStrings();
                self.socket.emit('newMsgPlayer2', { message: self.notepad.sentMessage, name: self.playerName });
                console.log(self.playerName + " says: " + self.notepad.sentMessage);
            }

        });

        self.socket.on('getMsgPlayer1', ({ message, name }) => {
            console.log("Received Message: " + message);
            console.log("Sender: " + name);
            self.notepad.manualInsertString(name + ": " + message);
        });

        //Add thermometer and pH Meter to the game.

        this.thermometer = new Thermometer(this);
        this.thermometerSprite = this.thermometer.render(355, 460,"thermometer_base", "LCD");


        this.pHMeter = new PHMeter(this);
        this.pHMeterSprite = this.pHMeter.render(445, 460,"pHmeter_base", "LCD");

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            if(gameObject === this.scene.thermometer)
            {

                gameObject.moveSprite(dragX, dragY);

            }

            if(gameObject === this.scene.pHMeter)
            {
                gameObject.moveSprite(dragX, dragY);


            }


        });




        //And finally, a Main Menu Button:
        //Let's accomplish this just like we accomplished it with Player1.js

        let mmX = 65;
        let mmY = 510;

        self.add.image(mmX, mmY, "mainmenu-scrap");

        self.mainMenuButton = new BasicButton({
            'scene': this,
            'key':'mainmenu-button',
            'up': 0,
            'over':1,
            'down':2,
            'x': mmX + 9,
            'y': mmY + 5});

        self.mainMenuButton.on("pointerup", function()
        {
            console.log("Player2 disconnected");
            self.scene.start("MainMenu");
            self.socket.disconnect();
        });



        this.stopwatch = new Stopwatch(this);

        this.stopwatch.render(100, 30, "Stopwatch", "LCD");


        self.socket.on('getTime', ({timeArray}) => {

            this.stopwatch.loadFromArray(timeArray.timeArray);

            console.log(timeArray.timeArray);
            console.log(this.stopwatch.digit_values);

            this.stopwatch.renderDigitSprites();

        });



    }

    updateNumberPositions()
    {
        this.pHMeter.updateNumberPositions();

        this.thermometer.updateNumberPositions();


    }

    onPressed()
    {
        this.self2.notepad.updateStrings();
    }


    update() {

        //Acid collision
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.playerBeakerSprite.getBounds(), this.thermometerSprite.getBounds())) {



            this.thermometer.updateTemp(this.playerBeaker.getTemperature());

            console.log(this.thermometer.currentTemp);

        }
        else if(Phaser.Geom.Intersects.RectangleToRectangle(this.targetBeakerSprite.getBounds(), this.thermometerSprite.getBounds()))
        {
            this.thermometer.updateTemp(this.targetBeaker.getTemperature());

        }
        else
        {
            this.thermometer.resetTemp();
        }


        //PH Meter Collision
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.playerBeakerSprite.getBounds(),  this.pHMeterSprite.getBounds())) {


            this.pHMeter.updatePH(this.playerBeaker.getPH());


        }
        else if(Phaser.Geom.Intersects.RectangleToRectangle(this.targetBeakerSprite.getBounds(), this.pHMeterSprite.getBounds()))
        {
            this.pHMeter.updatePH(this.targetBeaker.getPH());

        }
        else
        {
            this.pHMeter.resetPH();
        }





    }
}


