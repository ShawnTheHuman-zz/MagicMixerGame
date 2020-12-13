import Beaker from './beaker'

export default class Chooser {
    constructor(scene) {
        this.choosePlayer1 = () => {
            let playerSprite;
            let opponentSprite;
            if (scene.isPlayerA) {
                playerSprite = 'player1Background';
                opponentSprite = 'player2Background';
            } else {
                playerSprite = 'player2Background';
                opponentSprite = 'player1Background';
            }
        }
    }
}