export default class Chemical {

    constructor(scene) {

        let x1, y1;

        this.render = (x, y, sprite) => {
            let chemical = scene.add.sprite(x, y, sprite).setInteractive();
            scene.input.setDraggable(chemical);

            x1 = x;
            y1 = y;

            return chemical;
        }

        this.startingX = x1;
        this.startingY = y1;
    }

}