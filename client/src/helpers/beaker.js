
import {BeakerContents, BEAKER_LIMIT, Difficulty_1_Colors, Difficulty_2_Colors} from "./BeakerContents.js"



//Beaker Comparison Constants:

const VOLUME_THRESHOLD = [25, 17.5, 10];

const TEMP_THRESHOLD = [15, 7, 5];

const PH_THRESHOLD = [1.25, 1, 0.75];


export default class Beaker {


    constructor(scene, gameDifficulty) {


        this.difficulty = gameDifficulty;

        this.beakerContents = new BeakerContents();

        this.beakerContents.initializeRegularBeaker();

        this.beakerContents.setGameDifficulty(gameDifficulty);

        this.render = (x, y, sprite, fluidSprite) => {

            //The beakerFluid must be initialized first!
            this.beakerFluid = scene.add.image(x,y+108,fluidSprite);

            let beaker = scene.add.image(x, y, sprite).setScale(1, 1).setInteractive();

            //Initialize a regular beaker to start.
            //this.beakerContents.initializeRegularBeaker();

            //This is required to make the image scale UP or DOWN when the fluid volume rises or falls.
            this.beakerFluid.setOrigin(0.5,1);

            this.updateLiquidVolume()

            this.renderLiquidColor()

            //The beaker should not be draggable I believe.
            //scene.input.setDraggable(beaker);
            return beaker;
        }
    }


    initializeRandomBeaker()
    {
        this.beakerContents.initializeRandomBeaker();

    }


    /*
        initializeRegularBeaker.

        Set the Beaker to be back to Normal.

        Called when the user selects the Reset Beaker Button.

     */
    initializeRegularBeaker()
    {
        this.beakerContents.initializeRegularBeaker();

        this.updateLiquidVolume();

        this.renderLiquidColor();

    }

    updateLiquidVolume()
    {
        this.beakerFluid.scaleY = this.beakerContents.getTotalVolume() / BEAKER_LIMIT;
    }

    addLiquid(liquidName, liquidAmount)
    {
        switch(liquidName)
        {
            case "acid":

                this.beakerContents.addAcid(liquidAmount);
                break;

            case "base":

                this.beakerContents.addBase(liquidAmount);
                break;
            case "red":

                this.beakerContents.addRed(liquidAmount);
                this.updateLiquidVolume();
                this.renderLiquidColor();

                break;
            case "green":

                this.beakerContents.addGreen(liquidAmount);
                this.updateLiquidVolume();
                this.renderLiquidColor();

                break;
            case "blue":

                this.beakerContents.addBlue(liquidAmount);
                this.updateLiquidVolume();
                this.renderLiquidColor();

                break;


            case "water":

                this.beakerContents.addWater(liquidAmount);
                this.updateLiquidVolume();
                this.renderLiquidColor();

                break;

            default:

                this.beakerContents.addWater(liquidAmount);
                this.updateLiquidVolume();
                this.renderLiquidColor();

                break;

        }


    }

    removeLiquid(liquidAmount)
    {
        this.beakerContents.removeContents(liquidAmount);

        this.updateLiquidVolume();

        this.renderLiquidColor();


    }
    //Render the liquid color depending on the color of the liquid.
    renderLiquidColor()
    {
        let color = this.beakerContents.getBeakerColor();

        switch(color)
        {
            case Difficulty_1_Colors.WATER:

                this.beakerFluid.setTint(0x0033ee);
                this.beakerFluid.setAlpha(0.3);

                break;
            case Difficulty_1_Colors.RED:

                this.beakerFluid.setTint(0xff0000);
                this.beakerFluid.setAlpha(1.0);

                break;

            case Difficulty_1_Colors.GREEN:

                this.beakerFluid.setTint(0x00ff00);
                this.beakerFluid.setAlpha(1.0);

                break;

            case Difficulty_1_Colors.BLUE:

                this.beakerFluid.setTint(0x0000ff);
                this.beakerFluid.setAlpha(1.0);

                break;

            case Difficulty_1_Colors.YELLOW:

                this.beakerFluid.setTint(0xffff00);
                this.beakerFluid.setAlpha(1.0);
                break;

            case Difficulty_1_Colors.TEAL:

                this.beakerFluid.setTint(0x00ffff);
                this.beakerFluid.setAlpha(1.0);
                break;

            case Difficulty_1_Colors.PURPLE:

                this.beakerFluid.setTint(0xdd00dd);
                this.beakerFluid.setAlpha(1.0);
                break;
            case Difficulty_1_Colors.BLACK:

                this.beakerFluid.setTint(0x111111);
                this.beakerFluid.setAlpha(1.0);
                break;
            case Difficulty_2_Colors.MAROON:

                this.beakerFluid.setTint(0x6b2643);
                this.beakerFluid.setAlpha(1.0);
                break;
            case Difficulty_2_Colors.ORANGE:

                this.beakerFluid.setTint(0xde5d3a);
                this.beakerFluid.setAlpha(1.0);
                break;
            case Difficulty_2_Colors.SOUR_GREEN:

                this.beakerFluid.setTint(0x9de64e);
                this.beakerFluid.setAlpha(1.0);
                break;
            case Difficulty_2_Colors.FOREST:

                this.beakerFluid.setTint(0x006554);
                this.beakerFluid.setAlpha(1.0);
                break;
            case Difficulty_2_Colors.LITE_BLUE:

                this.beakerFluid.setTint(0x36c5f4);
                this.beakerFluid.setAlpha(1.0);
                break;
            case Difficulty_2_Colors.NAVY:

                this.beakerFluid.setTint(0x3e3b65);
                this.beakerFluid.setAlpha(1.0);
                break;


            default:

                //I am going to make the default an annoying "Missing-Texture" Pink to let the world know an error happened.
                console.log("Could not match color " + this.beakerContents.color)
                this.beakerFluid.setTint(0xff00dc);
                this.beakerFluid.setAlpha(1.0);

                break;
        }

    }


    adjustTemperature(adjustLevel)
    {
        this.beakerContents.adjustTemp(adjustLevel);


    }

    getTemperature()
    {
        return this.beakerContents.temperature;

    }


    getPH()
    {

        return this.beakerContents.returnPH();

    }


    /*
        adaptBeakerContents()

        After Importing a BeakerContents, update the beaker to match the specifications of sent_sample.

     */
    adaptBeakerContents(sent_sample)
    {
        this.beakerContents.water = sent_sample.water;

        this.beakerContents.red = sent_sample.red;

        this.beakerContents.green = sent_sample.green;

        this.beakerContents.blue = sent_sample.blue;

        this.beakerContents.color = sent_sample.color;

        this.beakerContents.temperature = sent_sample.temperature;

        this.beakerContents.ph = sent_sample.ph;

        this.updateLiquidVolume();

        this.renderLiquidColor();

    }

    //Return beaker Contents quick and easily.
    getBeakerContents()
    {
        return this.beakerContents;
    }

    setBeakerContents(bc)
    {
        this.beakerContents = bc;

        this.updateLiquidVolume();

        this.renderLiquidColor();


    }


    /*
            compareBeaker:


     */
    compareBeaker(second)
    {

        let beaker1 = this.beakerContents;

        let beaker2 = second.beakerContents;


        let difficulty = this.difficulty - 1;

        if(this.difficulty > 3 || this.difficulty < 1)
        {
            difficulty = 0;
        }

        //Judge based on Volume

        let volume_difference = beaker1.getTotalVolume() - beaker2.getTotalVolume();

        if(volume_difference > VOLUME_THRESHOLD[difficulty] || volume_difference < -VOLUME_THRESHOLD[difficulty])
        {
            return false;
        }

        let temp_difference = beaker1.getTemp() - beaker2.getTemp()
        if(temp_difference > TEMP_THRESHOLD[difficulty] || temp_difference < -TEMP_THRESHOLD[difficulty])
        {
            return false;
        }


        //Judge based on PH

        let ph_difference = beaker1.returnPH() - beaker2.returnPH();

        if(ph_difference > PH_THRESHOLD || ph_difference < -PH_THRESHOLD)
        {
            return false;
        }

        if(beaker1.color !== beaker2.color)
        {
            return false;
        }




        return true;
    }

}

// class Beaker extends Phaser.Scene
// {
//     getRandomIntInclusive(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1) + min);
//     }
//     constructor()
//     {
//         super({key: "Beaker"});
//
//     }
//
//     preload()
//     {
//
//
//     }

//     create()
//     {
//         let color=this.getRandomIntInclusive(0,5);//Is we have 6 colors to chose from?
//         let pH=this.getRandomIntInclusive(0,14);
//         let volume=this.getRandomIntInclusive(100,500)//Volume of beaker in mL (used standard small beaker sizes)
//         let temp=this.getRandomIntInclusive(23,100) //Temp in deg C from room temp to approx boiling
//     }
// }