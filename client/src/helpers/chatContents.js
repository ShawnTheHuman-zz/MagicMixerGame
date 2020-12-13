/*
CHATCONTENTS.js


This file contains the actual code for the Game Text System.

Everything involving the GameLogic for the Strings is located here.


 */



const CHAR_LIMIT = 15;

export const MESSAGE_COUNT = 5;

export default class ChatContents
{
    constructor(user)
    {
       this.stringArray = [];

       for (let x = 0  ; x < MESSAGE_COUNT ; x++)
       {
           this.stringArray.push("");
       }

       this.currentString = "";

       this.user = user;
    }

    submitNewString()
    {
        let submitString = this.user + ": " + this.currentString;

        this.stringArray.push(submitString);

        this.currentString = "";

        this.stringArray = this.stringArray.slice(1,MESSAGE_COUNT+1);

    }

    addCharacter(c)
    {
        let length = this.currentString.length;

        if(length >= CHAR_LIMIT)
        {
            return;
        }

        this.currentString = this.currentString + c;
    }

    deleteCharacter()
    {
        let length = this.currentString.length;

        if(length === 0)
        {
            return;
        }

        this.currentString = this.currentString.substr(0, this.currentString.length - 1);
    }



    /*
    manualInsertString(insertString)

    Manually load a string from a source: insertString


     */
    manualInsertString(insertString)
    {
        this.stringArray.push(insertString);

        this.stringArray = this.stringArray.slice(1,MESSAGE_COUNT+1);
    }

}