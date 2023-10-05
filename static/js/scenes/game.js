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
        this.load.image('h1', '../../assets/h1.jpg');
        this.load.image('h2', '../../assets/h2.jpg');
        this.load.image('h3', '../../assets/h3.jpg');
        this.load.image('h4', '../../assets/h4.jpg');
        this.load.image('h5', '../../assets/h5.jpg');
        this.load.image('h6', '../../assets/h6.jpg');
        this.load.image('h7', '../../assets/h7.jpg');
        this.load.image('h8', '../../assets/h8.jpg');
        this.load.image('h9', '../../assets/h9.jpg');
        this.load.image('h10', '../../assets/h10.jpg');
        this.load.image('h11', '../../assets/h11.jpg');
        this.load.image('h12', '../../assets/h12.jpg');
        this.load.image('h13', '../../assets/h13.jpg');
        this.load.image('h14', '../../assets/h14.jpg');
        this.load.image('h15', '../../assets/h15.jpg');
        this.load.image('h16', '../../assets/h16.jpg');

        this.load.image('a1', '../../assets/a1.jpg');
        this.load.image('a2', '../../assets/a2.jpg');
        this.load.image('a3', '../../assets/a3.jpg');
        this.load.image('a4', '../../assets/a4.jpg');
        this.load.image('a5', '../../assets/a5.jpg');
        this.load.image('a6', '../../assets/a6.jpg');
        this.load.image('a7', '../../assets/a7.jpg');
        this.load.image('a8', '../../assets/a8.jpg');
        this.load.image('a9', '../../assets/a9.jpg');
        this.load.image('a10', '../../assets/a10.jpg');

        this.load.image('cardBack', '../../assets/cardBack.jpg');
        this.load.image('hp', '../../assets/hp.png');
        this.load.image('punch', '../../assets/fist.png');
        this.load.image('bolt', '../../assets/bolt.png');
        this.load.image('button', '../../assets/button.png');
        this.load.image('background', '../../assets/background.jpg');
    }

    create() {
        let self = this;

        this.gameField = new GameField(self, 6);

        this.myPlayer = new Player(self, 'avatarOur', false, 20);
        this.myHand = new Hand(self, 6, false, true);
        this.enemyHand = new Hand(self, 6, true, false);

        this.socketHandler = new SocketHandler(self);
        this.interactiveHandler = new InteractiveHandler(this);
        this.gameButton = new GameButton(self);
        this.roomHandler = new RoomHandler(self);

        // this.socket.emit('dealCards', {cardAmount: 12})
    }

    update() {}
}