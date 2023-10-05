import Card from "../cards/Card.js";
import HeroCard from "../cards/HeroCard.js";
import Player from "../Player.js";
import getCardByData from "../cards/DataToCard.js";

export default class SocketHandler {
    constructor(scene) {
        scene.socket = io('http://localhost:3001/');

        // Create room
        scene.socket.on('createRoom', () => console.log("You have created a room"));

        // Another user connects to game
        scene.socket.on('connected', () => {
            console.log("User has connected");
            scene.enemyPlayer = new Player(scene, 'avatarOur', true, 20);
            scene.gameButton.showReadyButton();
        });

        // You have connected to the room
        scene.socket.on('connectToGame', () => console.log('You have connected to the room'));

        scene.socket.on('dealCards', (data) => {
            const {deck} = data
            console.log(deck)
            deck.forEach(c => scene.myHand.putCard(getCardByData(scene, null, c)));
        })

        scene.socket.on("playCard", (data) => {
            const {card, cardZoneId} = data
            scene.gameField.addCard(getCardByData(scene, scene.enemyHand, card), cardZoneId)
            console.log("Opponent has played a card")
        })

        scene.socket.on("startMatch", (data) => {
            console.log("Match is started");
            scene.socket.emit('dealCards', {cardAmount: 6})
            scene.myHand.blockHand();
        })

        scene.socket.on('yourturn', () => {
            scene.gameButton.showEndButton();
            scene.socket.emit('dealCards', {cardAmount: 6})
            scene.myHand.unblockHand();
        })
    }
}