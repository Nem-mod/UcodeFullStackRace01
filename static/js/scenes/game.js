import Player from '../helpers/Player.js'
import Card from '../helpers/Card.js'
import Hand from "../helpers/Hand.js";
import CardZone from "../helpers/CardZone.js";
import InteractiveHandler from "../helpers/Handlers/InteractiveHandler.js";
import GameField from "../helpers/GameField.js";

export default class Game extends Phaser.Scene {
    constructor() {
        super({
            key: "Game"
        });
    }

    preload() {
        this.load.plugin('rexcirclemaskimageplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexcirclemaskimageplugin.min.js', true);

        this.load.image('placeholder', '../../assets/star.png');
        this.load.image('1', '../../assets/1.jpg');
        this.load.image('2', '../../assets/2.jpg');
        this.load.image('3', '../../assets/3.jpg');
        this.load.image('4', '../../assets/4.jpg');
        this.load.image('5', '../../assets/5.jpg');
        this.load.image('6', '../../assets/6.jpg');
        this.load.image('7', '../../assets/7.jpg');
        this.load.image('8', '../../assets/8.jpg');
        this.load.image('9', '../../assets/9.jpg');
        this.load.image('10', '../../assets/10.jpg');
        this.load.image('11', '../../assets/11.jpg');
        this.load.image('12', '../../assets/12.jpg');
        this.load.image('13', '../../assets/13.jpg');
        this.load.image('14', '../../assets/14.jpg');
        this.load.image('15', '../../assets/15.jpg');
        this.load.image('cardBack', '../../assets/cardBack.jpg');
    }

    create() {
        let self = this;

        this.myPlayer = new Player(self, 'avatarOur', false, 20);
        this.enemyPlayer = new Player(self, 'avatarOur', true, 20);

        // this.card1 = new Card(self, 500, 500, '1', false);
        // this.card1.flip();

        this.myHand = new Hand(self, 6, false, true);
        this.enemtHand = new Hand(self, 6, true, false);

        new InteractiveHandler(this);

        this.gameField = new GameField(self, 6);
    }

    update() {}
}