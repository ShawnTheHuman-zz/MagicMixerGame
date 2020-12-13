/*
CHATBOX.js

This contains all the visual code for the Chatbox and its appearance.


Notes:

Positioning objects pixel-by-pixel can be twitchy.  You may need to test and edit the values to get what you want.


 */

import ChatContents, {MESSAGE_COUNT} from "./chatContents"


export default class ChatBox
{
    constructor(scene, submitterName) {

        this.userName = submitterName;

        this.chatSystem = new ChatContents(this.userName)

        this.currentMessage = null;

        this.chatText = [];

        this.sentMessage = "";

        this.render = (x, y, sprite) => {

            let chatPage = scene.add.image(x, y, sprite).setScale(1, 1).setInteractive();


            for (let i = 0 ; i < MESSAGE_COUNT ; i++)
            {
                this.chatText.push(scene.add.text(x-75, y+(i*25)-50, '', { font: '12px Courier', fill: '#2c1e31' }));

            }


            this.currentMessage = scene.add.text(x-75, y+90, '',  { font: '13px Courier', fill: '#2c1e31' });





            return chatPage;
        }



    }


    /*
        updateStrings

        Sends the current String to the List of Strings.

        Resets the CurrentString to "" for future work.

     */
    updateStrings()
    {
        if (this.chatSystem.currentString.length === 0) {
            return;
        }

        this.sentMessage = this.chatSystem.currentString;

        this.chatSystem.submitNewString();

        for (let x = 0 ; x < MESSAGE_COUNT ; x++) {
            this.chatText[x].text = this.chatSystem.stringArray[x];
        }

        this.currentMessage.text = this.chatSystem.currentString;

    }


    /*
        updateCurrentString

        Add character c to the currentString.

        Update the string values.

     */
    updateCurrentString(c)
    {
        this.chatSystem.addCharacter(c);

        this.currentMessage.text = this.chatSystem.currentString;

    }

    getCurrentString() {
        return this.currentMessage.text;
    }

    /*
        deleteCharacter()

        Delete a character from the currentString.

        Update currentMessage

     */
    deleteCharacter()
    {
        this.chatSystem.deleteCharacter();

        this.currentMessage.text = this.chatSystem.currentString;

    }


    /*
        manualUpdateString

        When given a string, manually add the string insertString to the StringArray of chatSystem.

        Does not alter the currentString at all.

     */
    manualInsertString(insertString)
    {
        this.chatSystem.manualInsertString(insertString);

        for (let x = 0 ; x < MESSAGE_COUNT ; x++)
        {
            this.chatText[x].text = this.chatSystem.stringArray[x];
        }


    }



}