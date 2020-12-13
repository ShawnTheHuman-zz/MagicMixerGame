export default class Hotplate {
    constructor(scene) {

        this.increase = null;

        this.decrease = null;

        this.render = (x, y, sprite, spriteIncrease, spriteDecrease) => {


            let hotplate = scene.add.image(x, y, sprite).setScale(1, 1).setInteractive();

            this.increase = scene.add.image(x+28, y+21, spriteIncrease).setScale(1, 1).setInteractive();

            this.decrease = scene.add.image(x-40, y+21, spriteDecrease).setScale(1, 1).setInteractive();



            //scene.input.setDraggable(beaker);
            return hotplate;
        }
    }

    getIncrease()
    {
        return this.increase;
    }

    getDecrease()
    {
        return this.decrease;
    }

}