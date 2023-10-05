import Card from "../cards/Card.js";
import HeroCard from "../cards/HeroCard.js";
import Player from "../Player.js";

export default class SocketHandler {
    constructor(scene) {
        scene.socket = io('http://localhost:3001/');

        // Create room
        scene.socket.on('createRoom', () => console.log("You have created a room"));

        // Another user connects to game
        scene.socket.on('connected', () => {
            console.log("User has connected");
            scene.enemyPlayer = new Player(scene, 'avatarOur', true, 20);
        });

        // You have connected to the room
        scene.socket.on('connectToGame', () => console.log('You have connected to the room'));

        scene.socket.on('dealCards', (data) => {
            const {deck} = data
            console.log(deck)
            deck.forEach(c => scene.myHand.putCard(new HeroCard(scene, scene.myHand, 0, 0, '', true, false, 0, 0).setCardByData(c)));
        })

        scene.socket.on("playCard", (data) => {
            const {card, cardZoneId} = data
            scene.gameField.addCard(
                new HeroCard(
                    scene,
                    scene.gameField.getZoneByIndex(
                        cardZoneId), 0, 0, card.key, true, true, card.attack, card.hp
                ),
                cardZoneId
            )
            console.log("Opponent has played a card")
        })
    }
}