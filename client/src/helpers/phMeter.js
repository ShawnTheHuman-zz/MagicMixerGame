/*
pH Meter

Contains Information for pH meter


 */

const L1_X = -23;
const L1_Y = -113;

const L2_X = -11;
const L2_Y = -113;

const L3_X = 6;
const L3_Y = -113;


export default class phMeter {

    constructor(scene) {

        this.phText;

        this.currentph = 0;

        this.currentScene = scene;



        this.thisX = 0;

        this.thisY = 0;

        this.render = (x, y, sprite, LCD_sheet) => {

            this.ph_image = this.currentScene.add.image(x, y, sprite).setScale(1, 1).setInteractive();

            //Make the thermometer draggable.
            scene.input.setDraggable(this.ph_image);

            this.thisX = x;
            this.thisY = y;


            //LCD 1 = Tens Digit
            this.LCD_1 = this.currentScene.add.sprite(x + L1_X, y + L1_Y,LCD_sheet,0);

            //LCD 1 = Ones Digit
            this.LCD_2 = this.currentScene.add.sprite(x + L2_X, y + L2_Y,LCD_sheet,0);

            //LCD 1 = Decimal Digit
            this.LCD_3 = this.currentScene.add.sprite(x + L3_X, y + L3_Y,LCD_sheet,0);


            return this.ph_image;
        }

    }


    updatePH(tempVal)
    {
        this.currentph = tempVal;

        if(this.currentph > 14.0 || this.currentph < 1.0)
        {
            this.LCD_1.setFrame(8);

            this.LCD_2.setFrame(8);

            this.LCD_3.setFrame(8);

            return;
        }
        else
        {
            let temp = this.currentph;


            // Digit 1

            temp = temp/10;

            temp = Math.floor(temp);

            if(temp === 2)
            {
                temp = 1;
            }

            this.LCD_1.setFrame(temp);

            // Digit 2

            temp = this.currentph

            if(temp >= 10)
            {
                temp = temp - 10;
            }

            let temp2 = Math.floor(temp);

            this.LCD_2.setFrame(temp2);

            // Digit 3

            temp = this.currentph;

            temp = temp - Math.floor(temp);

            temp = temp*10;

            temp = Math.floor(temp);

            this.LCD_3.setFrame(temp);

        }


    }




    resetPH()
    {
        this.currentph = 0;

        this.LCD_1.setFrame(0);
        this.LCD_2.setFrame(0);
        this.LCD_3.setFrame(0);

    }


    moveSprite(x, y)
    {
        //Update the Location of the Object.
        this.ph_image.x = x;
        this.ph_image.y = y;

        //LCD_1
        this.LCD_1.x = x + L1_X;

        this.LCD_1.y = y + L1_Y;

        //LCD_2
        this.LCD_2.x = x + L2_X;

        this.LCD_2.y = y + L2_Y;

        //LCD_3
        this.LCD_3.x = x + L3_X;

        this.LCD_3.y = y + L3_Y;

    }

    updateNumberPositions()
    {

        let x = this.ph_image.x;
        let y = this.ph_image.y;

        //LCD_1
        this.LCD_1.x = x + L1_X;

        this.LCD_1.y = y + L1_Y;

        //LCD_2
        this.LCD_2.x = x + L2_X;

        this.LCD_2.y = y + L2_Y;

        //LCD_3
        this.LCD_3.x = x + L3_X;

        this.LCD_3.y = y + L3_Y;



    }




}