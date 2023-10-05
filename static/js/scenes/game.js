import Player from '../helpers/Player.js'
import Hand from "../helpers/Hand.js";
import InteractiveHandler from "../helpers/Handlers/InteractiveHandler.js";
import GameField from "../helpers/GameField.js";
import SocketHandler from "../helpers/Handlers/SocketHandler.js";
import RoomHandler from "../helpers/Handlers/RoomHandler.js";
import GameButton from "../helpers/GameButton.js";

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
        this.load.image('hp', '../../assets/hp.png');
        this.load.image('punch', '../../assets/fist.png');
        this.load.image('bolt', '../../assets/bolt.png');
        this.load.image('button', '../../assets/button.png');
    }

    create() {
        let self = this;

        this.myPlayer = new Player(self, 'avatarOur', false, 20);
        this.myHand = new Hand(self, 6, false, true);
        this.enemyHand = new Hand(self, 6, true, false);

        this.gameField = new GameField(self, 6);

        this.socketHandler = new SocketHandler(self);
        this.interactiveHandler = new InteractiveHandler(this);
        this.gameButton = new GameButton(self);
        this.roomHandler = new RoomHandler(self);

        // this.socket.emit('dealCards', {cardAmount: 12})
    }

    update() {}
}