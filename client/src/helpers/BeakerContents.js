
/*
BeakerContents

Contains all the information on the contents of the Beaker.

Whereas the Beaker.js file contains the Beaker's visuals, BeakerContents contains the technical code of the Beaker.



 */

const PH_MAX = 14.0;

const PH_MIN = 1.0;

//Our temperature scale is in Fahrenheit.

const TEMP_MAX = 200;

const TEMP_MIN = 35;

//Set the constant size of the beaker to 500 mL.
export const BEAKER_LIMIT = 500.0;

//When initializing a Plain Beaker, this constant determines the amount of water in the Beaker.
const STARTING_WATER_LEVEL = 250.0;

const STARTING_TEMPERATURE = 65.0


//Random Beaker Initialization Bounds

const DF1_WATERMAX = 125.0;
const DF1_WATERMIN = 375.0;


const DF2_WATERMAX = 125.0;
const DF2_WATERMIN = 375.0;

const RAND_TEMP_MAX = 150;
const RAND_TEMP_MIN = 50;




//Difficulty_1_Colors:  All the colors for Difficulty 1.
export const Difficulty_1_Colors = Object.freeze({
    WATER: 0,
    RED: 1,
    BLUE: 2,
    GREEN: 3,
    YELLOW: 4,
    TEAL: 5,
    PURPLE: 6,
    BLACK: 7

});

export const Difficulty_2_Colors = Object.freeze({

    MAROON: 8,
    NAVY: 9,
    LITE_BLUE: 10,
    FOREST: 11,
    SOUR_GREEN: 12,
    ORANGE: 13

});

const COLOR_HIGH_PERCENT = 0.65;

const COLOR_LOW_PERCENT = 0.15;

export class BeakerContents
{
    constructor()
    {
        this.red = 0;
        this.blue = 0;
        this.green = 0;
        this.water = 0;

        this.gameDifficulty = 0;

        this.temperature = 0;

        //I just added this for the meeting
        this.ph = 7.0;

        this.color = 0;
    }

    setGameDifficulty(number)
    {
        this.gameDifficulty = number;
    }

    /*
    initializeRegularBeaker()

    Initialize a beaker that contains water only.

    The pH and color of the beaker should remain simple.


     */
    initializeRegularBeaker()
    {
        //Water should be some reasonable value.
        this.water = STARTING_WATER_LEVEL;

        //Everything else should be Zero.
        this.red = this.green = this.blue = 0;

        this.ph = 7.0;

        this.color = Difficulty_1_Colors.WATER;


        this.temperature = STARTING_TEMPERATURE;
    }


    initializeRandomBeaker()
    {
        let difficulty = this.gameDifficulty;

        if(difficulty === 2)
        {
            let volume = (Math.random() * (DF2_WATERMAX - DF2_WATERMIN)) + DF2_WATERMIN;

            this.ph = (Math.random()*10.5) + 1.5;

            this.color = Math.floor(Math.random() * 12) + 1;

            this.temperature = Math.floor((Math.random() * (TEMP_MAX - TEMP_MIN)) + TEMP_MIN);

            this.water = volume;


        }
        else if(difficulty === 3)
        {

            let volume = (Math.random() * (BEAKER_LIMIT-20)) + 20;

            this.ph = (Math.random()*13) + 1;

            this.color = Math.floor(Math.random() * 12) + 1;;

            this.temperature = Math.floor((Math.random() * (TEMP_MAX - TEMP_MIN)) + TEMP_MIN);

            this.water = volume;

        }
        //Default: Difficulty Level 1
        else
        {


            let volume = (Math.random() * (DF1_WATERMAX - DF1_WATERMIN)) + DF1_WATERMIN;

            this.ph = 7.0

            this.water = volume;

            this.color = Math.floor(Math.random() * 6) + 1;

            this.temperature = Math.floor((Math.random() * (RAND_TEMP_MAX - RAND_TEMP_MIN)) + RAND_TEMP_MIN);


        }


    }





    /*
        setGameDifficulty.

        Set the game difficulty.

     */
    setGameDifficulty(gd)
    {
        this.gameDifficulty = gd;
    }

    /*
        returnBeakerColor:

        Function here returns the current beaker color based on:

            - The game difficulty.

            - The ratio of red, green, blue, and water in the beaker.


            Now, remember.  We specified that we choose colors based on a SET LIST.  No RGB will decide the color.

     */
    setBeakerColor()
    {
        if(this.gameDifficulty === 3)
        {
            let color = this.determineDifficulty2_Color();

        }
        else if (this.gameDifficulty === 2)
        {

            let color = this.determineDifficulty2_Color();
        }
        else
        {

            let color = this.determineDifficulty1_Color();

        }
    }

    getBeakerColor()
    {
        return this.color;
    }


    getColorTotal()
    {
        return this.red + this.blue + this.green;
    }

    /*
        determineDifficulty1_Color()




     */
    determineDifficulty1_Color()
    {

        let colorTotal = this.getColorTotal();

        //If it's not enough dye, the mixture is now water.
        if(colorTotal / this.getTotalVolume() <= COLOR_LOW_PERCENT)
        {
            return Difficulty_1_Colors.WATER;
        }


        let redFactor = this.red / colorTotal;

        let greenFactor = this.green / colorTotal;

        let blueFactor = this.blue / colorTotal;

        console.log(redFactor + " " + greenFactor + " " + blueFactor);

        //Now, decide the color based on the values of these let variables.


        //RED
        if(this.highRange(redFactor) && this.lowRange(greenFactor) && this.lowRange(blueFactor))
        {
            this.color = Difficulty_1_Colors.RED
            return Difficulty_1_Colors.RED;
        }
        //GREEN
        if(this.highRange(greenFactor) && this.lowRange(blueFactor) && this.lowRange(redFactor))
        {
            this.color = Difficulty_1_Colors.GREEN;
            return Difficulty_1_Colors.GREEN;
        }
        //BLUE
        if(this.highRange(blueFactor) && this.lowRange(redFactor) && this.lowRange(greenFactor))
        {
            this.color = Difficulty_1_Colors.BLUE;
            return Difficulty_1_Colors.BLUE;
        }
        //YELLOW
        if(this.majorRange(redFactor) && this.majorRange(greenFactor) && this.lowRange(blueFactor))
        {
            this.color = Difficulty_1_Colors.YELLOW;

            return Difficulty_1_Colors.YELLOW;
        }
        //TEAL
        if(this.majorRange(greenFactor) && this.majorRange(blueFactor) && this.lowRange(redFactor))
        {
            this.color = Difficulty_1_Colors.TEAL;
            return Difficulty_1_Colors.TEAL;
        }
        //PURPLE
        if(this.majorRange(blueFactor) && this.majorRange(redFactor) && this.lowRange(greenFactor))
        {
            this.color = Difficulty_1_Colors.PURPLE;
            return Difficulty_1_Colors.PURPLE;
        }

        //BLACK
        if(this.majorRange(redFactor) && this.majorRange(greenFactor) && this.majorRange(blueFactor))
        {
            this.color = Difficulty_1_Colors.BLACK;
            return Difficulty_1_Colors.BLACK;
        }


    }


    determineDifficulty2_Color()
    {

        let colorTotal = this.getColorTotal();

        //If it's not enough dye, the mixture is now water.
        if(colorTotal / this.getTotalVolume() <= COLOR_LOW_PERCENT)
        {
            return Difficulty_1_Colors.WATER;
        }


        let redFactor = this.red / colorTotal;

        let greenFactor = this.green / colorTotal;

        let blueFactor = this.blue / colorTotal;

        console.log(redFactor + " " + greenFactor + " " + blueFactor);

        //Now, decide the color based on the values of these let variables.

        //Primaries
        //RED
        if(this.highRange(redFactor) && this.lowRange(greenFactor) && this.lowRange(blueFactor))
        {
            this.color = Difficulty_1_Colors.RED
            return Difficulty_1_Colors.RED;
        }
        //GREEN
        if(this.highRange(greenFactor) && this.lowRange(blueFactor) && this.lowRange(redFactor))
        {
            this.color = Difficulty_1_Colors.GREEN;
            return Difficulty_1_Colors.GREEN;
        }
        //BLUE
        if(this.highRange(blueFactor) && this.lowRange(redFactor) && this.lowRange(greenFactor))
        {
            this.color = Difficulty_1_Colors.BLUE;
            return Difficulty_1_Colors.BLUE;
        }

        //Tertiaries

        //ORANGE
        if(this.highRange(redFactor) && this.midRange(greenFactor) && this.lowRange(blueFactor))
        {
            this.color = Difficulty_2_Colors.ORANGE;
            return Difficulty_2_Colors.ORANGE;
        }
        //MAROON
        if(this.highRange(redFactor) && this.midRange(blueFactor) && this.lowRange(greenFactor))
        {
            this.color = Difficulty_2_Colors.ORANGE;
            return Difficulty_2_Colors.ORANGE;
        }

        //SOUR_GREEN
        if(this.highRange(greenFactor) && this.midRange(redFactor) && this.lowRange(blueFactor))
        {
            this.color = Difficulty_2_Colors.ORANGE;
            return Difficulty_2_Colors.ORANGE;
        }
        //FOREST
        if(this.highRange(greenFactor) && this.midRange(blueFactor) && this.lowRange(redFactor))
        {
            this.color = Difficulty_2_Colors.ORANGE;
            return Difficulty_2_Colors.ORANGE;
        }


        //LITE_BLUE
        if(this.highRange(blueFactor) && this.midRange(greenFactor) && this.lowRange(redFactor))
        {
            this.color = Difficulty_2_Colors.ORANGE;
            return Difficulty_2_Colors.ORANGE;
        }
        //NAVY
        if(this.highRange(blueFactor) && this.midRange(redFactor) && this.lowRange(greenFactor))
        {
            this.color = Difficulty_2_Colors.ORANGE;
            return Difficulty_2_Colors.ORANGE;
        }


        //Secondaries
        //YELLOW
        if(this.majorRange(redFactor) && this.majorRange(greenFactor) && this.lowRange(blueFactor))
        {
            this.color = Difficulty_1_Colors.YELLOW;

            return Difficulty_1_Colors.YELLOW;
        }
        //TEAL
        if(this.majorRange(greenFactor) && this.majorRange(blueFactor) && this.lowRange(redFactor))
        {
            this.color = Difficulty_1_Colors.TEAL;
            return Difficulty_1_Colors.TEAL;
        }
        //PURPLE
        if(this.majorRange(blueFactor) && this.majorRange(redFactor) && this.lowRange(greenFactor))
        {
            this.color = Difficulty_1_Colors.PURPLE;
            return Difficulty_1_Colors.PURPLE;
        }

        //BLACK
        if(this.majorRange(redFactor) && this.majorRange(greenFactor) && this.majorRange(blueFactor))
        {
            this.color = Difficulty_1_Colors.BLACK;
            return Difficulty_1_Colors.BLACK;
        }
    }


    lowRange(val)
    {
        return (val < COLOR_LOW_PERCENT);

    }

    midRange(val)
    {
        return (val < COLOR_HIGH_PERCENT && val >= COLOR_LOW_PERCENT)

    }

    highRange(val)
    {
        return (val >= COLOR_HIGH_PERCENT)

    }

    majorRange(val)
    {
        return (val >= COLOR_LOW_PERCENT);

    }


    /*
        returnPH:

        Returns the PH of the beaker using a calculation of the current acid and base of the beaker.

        This calculation depends on the beaker's level of:

        Water and Acid or Base.

        THIS CODE IS NOT READY.  MUST SPEAK WITH GROUP LATER.

     */
    returnPH()
    {
       return this.ph;
    }


    /*
    removeContents:

    Remove exactly the value of the contents.

    Each of the chemicals is subtracted from their original values depending on the amount removed.

     */
    removeContents(removeAmount)
    {
        let totalVolume = this.getTotalVolume();

        if(totalVolume <= 0)
        {
            return;
        }

        let waterFraction = this.water / totalVolume;

        let redFraction = this.red / totalVolume;

        let greenFraction = this.green / totalVolume;

        let blueFraction = this.blue / totalVolume;


        this.water -= waterFraction * removeAmount;

        this.red -= redFraction * removeAmount;

        this.blue -= blueFraction * removeAmount;

        this.green -= greenFraction * removeAmount;

    }

    /*
        getTotalVolume:

        Get the current maximum volume of the beaker.

     */
    getTotalVolume()
    {
        return this.water + this.red + this.green + this.blue;

    }


    addRed(amount)
    {
        if(this.getTotalVolume() >= BEAKER_LIMIT)
            return;
        else
            this.red += amount;

        this.setBeakerColor();


    }

    addBlue(amount)
    {

        if(this.getTotalVolume() >= BEAKER_LIMIT)
            return;
        else
            this.blue += amount;

        this.setBeakerColor();

    }

    addGreen(amount)
    {
        if(this.getTotalVolume() >= BEAKER_LIMIT)
            return;
        else
            this.green += amount;

        this.setBeakerColor();

    }

    addWater(amount)
    {
        if(this.getTotalVolume() >= BEAKER_LIMIT)
            return;
        else
         this.water += amount

        this.setBeakerColor();
    }

    /*
        addAcid()

        Add acid to the beaker.

        If there is any amount of Base in the beaker, the acid and the base should cancel each other out.

     */
    addAcid(amount)
    {
        this.ph = this.ph - amount;

        if(this.ph < PH_MIN)
        {
            this.ph = PH_MIN;
        }
    }

    /*
    addBase:

    Add base chemical to the beaker.


     */
    addBase(amount)
    {
        this.ph = this.ph + amount;

        if(this.ph > PH_MAX)
        {
            this.ph = PH_MAX;
        }
    }


    adjustTemp(changeValue)
    {
        this.temperature += changeValue;

        if(this.temperature > TEMP_MAX)
            this.temperature = TEMP_MAX;

        if(this.temperature < TEMP_MIN)
            this.temperature = TEMP_MIN;



    }

    getTemp()
    {

        return this.temperature;


    }

}