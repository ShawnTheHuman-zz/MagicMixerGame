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


   resetStopWatch()
   {
           for (let z = 0 ; z < this.digit_values.length; z++ )
           {
               this.digit_values[z] = 0;

               this.LCD_numbers[z].setFrame(0);
           }
   }

   loadFromArray(array)
   {

       for (let z = 0 ; z < array.length; z++ )
       {
           this.digit_values[z] = array[z];
       }
   }


   /*
        getTime()

           get the time on the clock, but get it as an integer
    */
   getTime_int()
   {
       let val = 0;

       val = this.digit_values[0] + this.digit_values[1]*10 + this.digit_values[2] * 10 * 60 + this.digit_values[3] * 100 * 60;

       console.log("Stopwatch Int Value: "+ val);

       return val;
   }

}