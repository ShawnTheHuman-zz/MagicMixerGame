/*
Stopwatch.js

The Venerable and Mighty Stopwatch Class:




 */


const DIGIT_X_LOC = [26, 14, -5, -17];

const DIGIT_Y_LOC = 34;

const DIGIT_MAX_VAL = [9,5,9,9];

export default class Stopwatch
{
   constructor(scene)
   {

       this.currentScene = scene;

       this.thisX = 0;
       this.thisY = 0;

       this.max = this.setMaxNumber();

       this.LCD_numbers = [0,0,0,0];

       this.digit_values = [0,0,0,0];

       this.render = (x, y, sprite, LCD_sheet) => {

           this.stopwatch_sprite = this.currentScene.add.image(x, y, sprite).setScale(1, 1).setInteractive();

           this.thisX = x;
           this.thisY = y;

           for (let z = 0 ; z < 4 ; z++)
           {
               this.LCD_numbers[z] = this.currentScene.add.sprite(x + DIGIT_X_LOC[z], y + DIGIT_Y_LOC,LCD_sheet,8);
           }

           for (let z = 0 ; z < 4 ; z++)
           {
               this.digit_values[z] = 0;
           }

           return this.stopwatch_sprite;
       }

   }

    incrementOneSecond()
    {
        this.digit_values[0] = this.digit_values[0] + 1;


        this.adjustStopWatchNumbers();

        ///let p = ""+this.digit_values[3] + this.digit_values[2] + ":" + this.digit_values[1] + this.digit_values[0];

       // console.log(p)

        this.renderDigitSprites();
    }

   adjustStopWatchNumbers()
   {
       for (let z = 0 ; z < this.digit_values.length ; z++)
       {
            if(this.digit_values[z] > DIGIT_MAX_VAL[z])
            {
                if(z === this.digit_values.length - 1)
                {
                    this.digit_values[z] = 0;
                }
                else
                {
                    this.digit_values[z] = 0;
                    this.digit_values[z+1] = this.digit_values[z+1] + 1;

                }
            }
       }
   }

   renderDigitSprites()
   {
       for (let z = 0 ; z < this.digit_values.length ; z++)
       {
           let p = this.digit_values[z];

            if(p > DIGIT_MAX_VAL[z])
            {
                p = DIGIT_MAX_VAL;
            }
            else if(p < 0)
            {
                p = 0;
            }
            this.LCD_numbers[z].setFrame(p);

       }
   }
   /*
        setFromNumber

        Sets the Numbers of this.LCD_Numbers.

        Assume that N is a Number.
    */
   setFromNumber(n)
   {
       if(n < 0 || n > this.max);
       {
           for (let z = 0 ; z < this.digit_values.length; z++ )
           {
               this.digit_values[z] = 0;

               this.LCD_numbers[0].setFrame(9);
           }
       }
   }

   setMaxNumber()
   {
       let m = 0;

       for (let z = 0 ; z > DIGIT_MAX_VAL ; z++)
       {
           m = m + DIGIT_MAX_VAL[z]*(Math.pow(10, z));

       }
       return m;
   }

   resetStopWatch()
   {
           for (let z = 0 ; z < this.digit_values.length; z++ )
           {
               this.digit_values[z] = 0;

               this.LCD_numbers[z].setFrame(0);
           }



   }

}