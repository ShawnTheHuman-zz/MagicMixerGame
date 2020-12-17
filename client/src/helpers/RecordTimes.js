
const DEFAULT_TIME = "99:59";

const DEFAULT_TIME_INT = 5400 + 540 + 50 + 9;

const EMPTY_TIME = "--:--"

const PREV_TIME_LENGTH = 3;

export default class RecordTimes
{
    constructor(scene)
    {
        this.currentScene = this;

        this.prevTimes = [EMPTY_TIME, EMPTY_TIME, EMPTY_TIME];

        this.bestTime = DEFAULT_TIME_INT;

        this.render = (x, y, boardSprite) => {

            let recordPage = scene.add.image(x, y, boardSprite).setScale(1, 1).setInteractive();

            this.recordText = scene.add.text(x-22, y -40, [DEFAULT_TIME]).setColor("#2c1e31");

            this.prevTimeText = [0,0,0];

            for (let z = 0 ; z < PREV_TIME_LENGTH ; z++)
            {
                this.prevTimeText[z] = scene.add.text(x-22, 115 + z*26, [EMPTY_TIME]).setColor("#2c1e31");

            }

            return recordPage;

        }

    }


    add_new_time(time_int)
    {


        let stringVal = this.int_to_time(time_int);

        console.log(stringVal);

        if(this.bestTime > time_int)
        {
            this.bestTime = time_int;

            this.recordText.text = stringVal;

        }

        this.push_timeStack(stringVal);
    }


    push_timeStack(stringVal)
    {
        let t_list = [0,0,0]

        for (let z = 0 ; z < PREV_TIME_LENGTH-1 ; z++)
        {
            t_list[z+1] = this.prevTimeText[z].text

        }

        t_list[0] = stringVal;

        for (let z = 0 ; z < PREV_TIME_LENGTH ; z++)
        {
            this.prevTimeText[z].text = t_list[z];
        }

    }


    int_to_time(time_int)
    {
        let stringVal = "";

        time_int = Math.floor(time_int);


        let v1 = time_int % 10;

        let v2 = (time_int % (60) - v1) / 10;

        let v3 = (time_int % 600 - v2*10 - v1) / 60;

        let v4 = (time_int - v3*60 - v2*10 - v1) / 600;

        console.log("v4: " + v4 + " v3: " + v3 + " v2: " + v2 + " v1: " + v1);


        stringVal = v4.toString() + v3.toString() + ":" + v2.toString() + v1.toString();


        return stringVal;
    }
}