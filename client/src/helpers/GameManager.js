
import {BeakerContents} from "./BeakerContents";

const ACID_MAX = 10;

const ACID_MIN = 0;

/*
GameManager

Used for comparing two beakers side-by-side, and stores a read-only target beaker that can be copied and used elsewhere.



 */

export class GameManager
{
    constructor()
    {
        this.targetBeaker = new BeakerContents();

    }

    initializeTargetBeaker()
    {
        this.targetBeaker = initializeRandomBeaker();

    }

    getTargetBeaker()
    {

        return this.targetBeaker;
    }

    /*
     initializeRandomBeaker()

     Initialize a beaker randomly.

  */
    initializeRandomBeaker()
    {
        //Acid or base should either be 1 or 0.
        let acid_or_base = Math.round((Math.random() * 1));

        let returnBeaker = new BeakerContents();

        if(acid_or_base === 0)
        {
            returnBeaker.acid = Math.floor(Math.random() * ACID_MAX ) + ACID_MIN;
        }
        else if(acid_or_base === 1)
        {
            returnBeaker.base = Math.floor(Math.random() * ACID_MAX ) + ACID_MIN;
        }

        return returnBeaker;
    }










}