import BasicButton from "../helpers/BasicButton"


const PAGE_TOTAL = 3;

export default class Instructions extends Phaser.Scene {
    constructor() {
        super({
            key: 'Instructions'
        });
    }



        preload()
        {

            this.load.image('Background', 'src/assets/art/background/Instructions_background.png');


            this.load.image("MainMenu_Scrap", "src/assets/art/Instructions/Paper-Scrap-MainMenu.png");

            this.load.spritesheet("mainmenu-button",'src/assets/art/Instructions/MainMenu-Button-Sheet.png',{frameWidth: 55, frameHeight: 55});


            this.load.spritesheet("pagebutton", "src/assets/art/Instructions/Instruction-Arrow-Sheet.png", {frameWidth: 126, frameHeight: 67})

            this.load.spritesheet("numbers", "src/assets/art/Instructions/Instruction-Numbers.png", {frameWidth: 54, frameHeight: 54})

        }


        create()
        {

            let self = this;

            self.currentPage = 0;

            let background = self.add.image(0,0,'Background').setOrigin(0,0);;


            let returnButtonScrap = self.add.image(140,42, "MainMenu_Scrap");


            this.returnButton = new BasicButton({
                'scene': this,
                'key':'mainmenu-button',
                'up': 0,
                'over':1,
                'down':2,
                'x': 113,
                'y': 42
            });

            this.returnButton.on("pointerup", function()
            {
                self.scene.start("MainMenu");

            })

            this.nextButton = new BasicButton({
                'scene': this,
                'key':'pagebutton',
                'up': 0,
                'over':1,
                'down':2,
                'x': 705,
                'y': 530
            });

            this.prevButton = new BasicButton({
                'scene': this,
                'key':'pagebutton',
                'up': 0,
                'over':1,
                'down':2,
                'x': 70,
                'y': 530
            });

            this.nextButton.flipX = true;

            this.nextButton.scaleX = 0.75;
            this.nextButton.scaleY = 0.75;

            this.prevButton.scaleX = 0.75;
            this.prevButton.scaleY = 0.75;

            this.numberLeft = self.add.sprite(45, 115, "numbers", 0);

            this.numberRight = self.add.sprite(725, 115, "numbers", 1);


            this.prevButton.on("pointerup", function()
            {
                self.changePage(-1);
            });

            this.nextButton.on("pointerup",function()
            {
                self.changePage(1);
            });

        }


        changePage(direction)
        {
            if(direction === -1)
            {
                if(this.currentPage === 0)
                {
                    return;
                }

                this.currentPage--;

                this.numberLeft.setFrame( 2 * this.currentPage);

                this.numberRight.setFrame(2 * this.currentPage + 1);


            }
            else if(direction === 1)
            {
                if(this.currentPage === PAGE_TOTAL-1)
                {
                    return;
                }

                this.currentPage++;

                this.numberLeft.setFrame( 2 * this.currentPage);

                this.numberRight.setFrame(2 * this.currentPage + 1);

            }






        }

}