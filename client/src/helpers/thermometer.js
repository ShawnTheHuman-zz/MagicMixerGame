/*
Thermometer

This class holds the thermometer and hopefully, any child objects that come with it.
 */

const L1_X = -20;
const L1_Y = -113;
const L2_X = -7;
const L2_Y = -113;
const L3_X = 6;
const L3_Y = -113;

export default class Thermometer {

    constructor(scene) {

        this.currentTemp = 0;

        this.tempString = "000"

        this.currentScene = scene;

        this.thisX = 0;

        this.thisY = 0;

        this.render = (x, y, sprite, LCD_sheet) => {

            this.thermo_image = this.currentScene.add.image(x, y, sprite).setScale(1, 1).setInteractive();

            //Make the thermometer draggable.
            scene.input.setDraggable(this.thermo_image);

            this.thisX = x;
            this.thisY = y;

            this.originX = x;

            this.originY = y;

            //LCD 1 = Tens Digit
            this.LCD_1 = this.currentScene.add.sprite(x + L1_X, y + L1_Y,LCD_sheet,0);

            //LCD 1 = Ones Digit
            this.LCD_2 = this.currentScene.add.sprite(x + L2_X, y + L2_Y,LCD_sheet,0);

            //LCD 1 = Decimal Digit
            this.LCD_3 = this.currentScene.add.sprite(x + L3_X, y + L3_Y,LCD_sheet,0);


            return this.thermo_image;
        }
    }


    updateTemp(tempVal)
    {
        this.currentTemp = tempVal;
        this.updateTempNumbers();
    }

    updateTempNumbers()
    {
        if(this.currentTemp > 999 || this.currentTemp < 0)
        {
            this.LCD_1.setFrame(8);
            this.LCD_2.setFrame(8);
            this.LCD_2.setFrame(8);
        }

        if(this.currentTemp < 10)
        {
            this.LCD_1.setFrame(0);
            this.LCD_2.setFrame(0);

            let tempString = this.currentTemp.toString();

            let fv = tempString.slice(0,1);

            let fvn = parseInt(fv);

            this.LCD_3.setFrame(fvn);

        }
        else if(this.currentTemp < 100)
        {
            this.LCD_1.setFrame(0);

            let tempString = this.currentTemp.toString();

            let fv1 = tempString.slice(0,1);
            let fv2 = tempString.slice(1,2);

            let fvn = parseInt(fv1);

            this.LCD_2.setFrame(fvn);

            fvn = parseInt(fv2);

            this.LCD_3.setFrame(fvn);

        }
        else
        {

            let tempString = this.currentTemp.toString();

            let fv1 = tempString.slice(0,1);

            let fv2 = tempString.slice(1,2);

            let fv3 = tempString.slice(2,3);

            let fvn = parseInt(fv1);

            this.LCD_1.setFrame(fvn);

            fvn = parseInt(fv2);

            this.LCD_2.setFrame(fvn);

            fvn = parseInt(fv2);

            this.LCD_3.setFrame(fvn);
        }

    }


    resetTemp()
    {
        this.currentTemp = 0;

        this.updateTempNumbers();

    }


    moveSprite(x, y)
    {
        this.thermo_image.x = this.thisX = x;

        this.thermo_image.y = this.thisY = y;


    }

    updateNumberPositions()
    {
        let x = this.thermo_image.x;
        let y = this.thermo_image.y;


        this.LCD_1.x = x + L1_X;
        this.LCD_1.y = y + L1_Y;

        this.LCD_2.x = x + L2_X;
        this.LCD_2.y = y + L2_Y;

        this.LCD_3.x = x + L3_X;
        this.LCD_3.y = y + L3_Y;

    }
}