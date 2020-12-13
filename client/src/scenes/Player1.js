import io from 'socket.io-client';
import Beaker from "../helpers/beaker";
import Chooser from "../helpers/chooser";
import Chemical from "../helpers/chemical";
import Hotplate from "../helpers/hotplate";
import BasicButton from "../helpers/BasicButton";
import ChatBox from "../helpers/chatBox";

import {BeakerContents} from "../helpers/BeakerContents";
import Stopwatch from "../helpers/Stopwatch";


/*

This code should contain everything related to the game itself.

Player 1 enters the game by setting the difficulty in Main Menu, and then entering this game scene screen.


 */

const PH_CHANGE_RATE = 0.01;

export default class Player1 extends Phaser.Scene {
    constructor() {
        super({
            key: 'Player1'
        });

        this.gameDifficulty;

    }

    preload() {

        //Background
        this.load.image('player1Background', 'src/assets/art/background/Player1-Background.png');

        //Beaker
        this.load.image('beaker', 'src/assets/art/beaker/beaker.png');
        this.load.image('beakerFluid', 'src/assets/art/beaker/beaker_liquid.png');

        //Bottles
        this.load.image('acid', 'src/assets/art/Chem_Bottle/Bottle-Acid.png');
        this.load.image('base', 'src/assets/art/Chem_Bottle/Bottle-Base.png');
        this.load.image('blue', 'src/assets/art/Chem_Bottle/Bottle-Blue.png');
        this.load.image('green', 'src/assets/art/Chem_Bottle/Bottle-Green.png');
        this.load.image('red', 'src/assets/art/Chem_Bottle/Bottle-Red.png');
        this.load.image('water', 'src/assets/art/Chem_Bottle/Bottle-Water.png');


        //Hotplate
        this.load.image('hotplate', 'src/assets/art/hotplate/hotplate_meterless.png');
        this.load.spritesheet("increaseTemp","src/assets/art/hotplate/Hotplate-Temp-Increase-sheet.png",{ frameWidth: 42, frameHeight: 44 });
        this.load.spritesheet("decreaseTemp","src/assets/art/hotplate/Hotplate-Temp-Decrease-sheet.png",{ frameWidth: 42, frameHeight: 44 });


        //ChatBox
        this.load.image("notepage",'src/assets/art/ChatBox/chat-notepage.png' );
        this.load.spritesheet("notepage-button",'src/assets/art/ChatBox/chat-sendarrow-sheet.png',{ frameWidth: 29, frameHeight: 28 });


        //Drainer
        this.load.image("drainer",'src/assets/art/Drainer/Drain_nozzle.png' );
        this.load.spritesheet("drainer-button",'src/assets/art/Drainer/Drain_button_sheet.png',{ frameWidth: 27, frameHeight: 27 });


        //UI Buttons
        this.load.spritesheet("mainmenu-button",'src/assets/art/Instructions/MainMenu-Button-Sheet.png',{frameWidth: 55, frameHeight: 55});
        this.load.image("mainmenu-scrap", 'src/assets/art/Instructions/PaperScrap-MainMenu.png');

        this.load.image("paperscrap-long", 'src/assets/art/Instructions/PaperScrap-Long.png');

        this.load.spritesheet("resetButton", "src/assets/art/Button/Beaker_reset_sheet.png", {frameWidth: 43, frameHeight: 41});


        this.load.spritesheet("submit-button", "src/assets/art/Button/Beaker_Submit_Large.png",{frameWidth: 80, frameHeight: 119});


        //Stopwatch
        this.load.image("Stopwatch","src/assets/art/Stopwatch/Stopwatch_base.png");
        this.load.spritesheet("LCD", "src/assets/art/Player2_Thermometer/LCD_Sheet.png", {frameWidth: 12, frameHeight: 19});

        this.load.spritesheet("newgameButton", "src/assets/art/Button/NewGame-Button_Sheet.png", {frameWidth: 61, frameHeight: 81})

    }

    create() {

        let self = this;

        this.self2 = this;

        this.gameDifficulty = self.registry.get("gameDifficulty");

        this.randomBeaker = new Beaker();

        this.randomBeaker.initializeRandomBeaker();

        this.gameInProgress = true;

        //Background.
        self.add.image(0, 0, "player1Background").setOrigin(0,0);

        //Hotplate.
        let hotplateX = 350;
        let hotplateY = 380;

        self.socket = io('http://localhost:3000');

        self.socket.on('isPlayer1', function () {
            console.log(self.socket.id + " connected as Player1")
            self.socket.emit('player1Connected');
        });


        let hotplate = new Hotplate(self);
        hotplate.render(hotplateX, hotplateY, "hotplate");

        self.hotplateIncrease = new BasicButton({
            'scene': this,
            'key':'increaseTemp',
            'up': 0,
            'over':1,
            'down':2,
            'x': hotplateX + 28,
            'y': hotplateY + 21
        });

        self.hotplateDecrease = new BasicButton({
            'scene': this,
            'key':'decreaseTemp',
            'up': 0,
            'over':1,
            'down':2,
            'x': hotplateX - 40,
            'y': hotplateY + 21
        });


        //Next Addition:  Drainer:
        let drainerX = 170, drainerY = 220;

        self.drainerTube = self.add.image(drainerX,drainerY,"drainer");

        this.drainerButton = new BasicButton({
            'scene': this,
            'key':'drainer-button',
            'up': 0,
            'over':1,
            'down':2,
            'x': drainerX + 156,
            'y': drainerY - 124
        })

        this.drainerButton.scaleX = 1.025;
        this.drainerButton.scaleY = 1.025;


        //Beaker and Bottles.
        this.beaker = new Beaker(self, this.gameDifficulty);
        this.beakerSprite = this.beaker.render(350, 230, 'beaker', 'beakerFluid');

        //Bottles.
        this.acidChem=new Chemical(self);
        this.acidSprite = this.acidChem.render(560+40,240,'acid');

        this.baseChem=new Chemical(self);
        this.baseSprite = this.baseChem.render(640+40,240,'base');

        this.waterChem=new Chemical(self);
        this.waterSprite = this.waterChem.render(720+40,240,'water');


        this.colorRed=new Chemical(self);
        this.redSprite = this.colorRed.render(560+40,380,'red');

        this.colorGreen=new Chemical(self);
        this.greenSprite = this.colorGreen.render(640+40,380,'green');

        this.colorBlue=new Chemical(self);
        this.blueSprite = this.colorBlue.render(720+40,380,'blue');



        if(this.gameDifficulty === 1)
        {
            this.acidSprite.hidden = true;
            this.baseSprite.hidden = true;

        }


        self.hotplateIncrease.on('pointerdown',function()
        {
            this.beaker.adjustTemperature(1);
            console.log(this.beaker.getTemperature());

        }, this);

        self.hotplateDecrease.on('pointerdown',function()
        {
            this.beaker.adjustTemperature(-1);

            console.log(this.beaker.getTemperature());

        }, this);


        //ChatBox Notepad

        this.playerName = "Mixer"

        let noteX = 110;
        let noteY = 270;

        self.notepad = new ChatBox(self, this.playerName);
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


        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
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

            // graphics.clear();
            // graphics.lineStyle(2, 0xffff00);
            // graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);

        });


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
                self.socket.emit('newMsgPlayer1', { message: self.notepad.sentMessage, name: self.playerName });
                console.log(self.playerName + " says: " + self.notepad.sentMessage);
            }

        });

        self.socket.on('getMsgPlayer2', ({ message, name }) => {
            console.log("Received Message: " + message);
            console.log("Sender: " + name);
            self.notepad.manualInsertString(name + ": " + message);
        });

        self.notepad_button.on('pointerdown',this.onPressed,this);



        //Add some Interface Details:

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
            console.log("Player1 disconnected");
            self.scene.start("MainMenu");
            self.socket.disconnect();

        });


        self.add.image(320, 520,"paperscrap-long");

        self.resetButton = new BasicButton({
            'scene': this,
            'key':'resetButton',
            'up': 0,
            'over':1,
            'down':2,
            'x': 320 - 100,
            'y': 520 - 7});


        self.resetButton.on("pointerup", function()
        {

            self.beaker.initializeRegularBeaker();

        });

        self.submitButton = new BasicButton(
            {
                'scene': this,
                'key':'submit-button',
                'up': 0,
                'over':1,
                'down':2,
                'x': 500,
                'y': 80
            });

        self.submitButton.on("pointerup", this.submitBeaker, this);


        //Insert New Game Button hidden underneath the stopwatch.

        this.newGameButton = new BasicButton(
            {
                'scene': this,
                'key':'newgameButton',
                'up': 0,
                'over':1,
                'down':2,
                'x': 720,
                'y': 70
            });

        this.newGameButton.on("pointerup", this.resetGame, this);


        //Insert Stopwatch
        this.stopwatch = new Stopwatch(this);
        this.stopwatch.render(720, 30, "Stopwatch", "LCD");

        this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.updateStopwatch, callbackScope: this, loop: true });



        if(this.gameDifficulty === 1)
        {
            self.acidSprite.setVisible(false);
            self.baseSprite.setVisible(false);

        }


        this.beakerUpdateTime = this.time.addEvent({ delay: 1000, callback: this.sendBeakers, callbackScope: this, loop: true });
        //Send Player2 with Both editions of Beaker:




    }

    /*
        sendBeakers()

        Send beakers to Player2.

        Sends Time to Player 2 as well.

     */
    sendBeakers()
    {
        this.socket.emit('sendRandomBeaker', { beakerC: this.randomBeaker.getBeakerContents() });

        this.socket.emit('sendPlayerBeaker', { beakerC: this.beaker.getBeakerContents() });

        this.socket.emit("sendTime", {timeArray: this.stopwatch.digit_values});

    }

    updateStopwatch()
    {
        this.stopwatch.incrementOneSecond();


    }


    onPressed()
    {
        this.self2.notepad.updateStrings();

        this.self2.socket.emit('newMsgPlayer1', { message: this.self2.notepad.sentMessage, name: this.self2.playerName });
        console.log(this.self2.playerName + " says: " + this.self2.notepad.sentMessage);
    }

    /*
        submitBeaker()

        Compare the Player's Beaker with the Target Beaker.

        If we have a match that is within the thresholds, then we record the current time, notify the Player, then Reset The Game.

     */
    submitBeaker()
    {

        if(this.beaker.compareBeaker(this.randomBeaker) === true && this.gameInProgress === true)
        {

            this.gameIsWon();
        }


        return;
    }


    gameIsWon()
    {
        this.gameInProgress = false;

        this.timedEvent.paused = true;

        this.newGameButton.y = 70*2;


    }

    update() {


        if (this.drainerButton.isPressed() === true)
        {

            this.beaker.removeLiquid(1);

        }

        //Acid collision
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.beakerSprite.getBounds(), this.acidSprite.getBounds())) {


            this.beaker.addLiquid("acid",PH_CHANGE_RATE);


        }


        //Base collision
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.beakerSprite.getBounds(), this.baseSprite.getBounds())) {

            this.beaker.addLiquid("base",PH_CHANGE_RATE);


        }

        //Water collision
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.beakerSprite.getBounds(), this.waterSprite.getBounds())) {

            this.beaker.addLiquid("water",1);


        }

        //Red collision
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.beakerSprite.getBounds(), this.redSprite.getBounds())) {

            this.beaker.addLiquid("red",1);

        }


        //Green collision
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.beakerSprite.getBounds(), this.greenSprite.getBounds())) {

            this.beaker.addLiquid("green",1);


        }

        //Blue collision
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.beakerSprite.getBounds(), this.blueSprite.getBounds())) {

            this.beaker.addLiquid("blue",1);


        }

    }


    resetGame()
    {

        this.randomBeaker.initializeRandomBeaker();

        this.beaker.initializeRegularBeaker();

        this.timedEvent.paused = false;

        this.stopwatch.resetStopWatch();

        this.newGameButton.y = 70;

        this.gameInProgress = true;
    }





}


