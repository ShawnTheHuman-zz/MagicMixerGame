import Phaser from "phaser";
import MainMenu from "./scenes/MainMenu"
import Player1 from "./scenes/Player1";
import Player2 from "./scenes/Player2";
import Instructions from "./scenes/Instructions"

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scene: [
    MainMenu, Player1, Player2, Instructions
  ]
};




const game = new Phaser.Game(config);