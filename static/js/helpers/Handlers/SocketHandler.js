import Card from "../cards/Card.js";
import HeroCard from "../cards/HeroCard.js";
import Player from "../Player.js";
import getCardByData from "../cards/DataToCard.js";

export default class SocketHandler {
    constructor(scene) {
        scene.socket = io('http://localhost:3001/');

        // Create room
        scene.socket.on('createRoom', () => {
            console.log("You have created a room");
        });

        // Another user connects to game
        scene.socket.on('connected', () => {
            console.log("User has connected");
            scene.enemyPlayer = new Player(scene, 'avatarOur', true, 20);
            scene?.tokenText?.destroy();
            scene.gameButton.showReadyButton();
        });

        // You have connected to the room
        scene.socket.on('connectToGame', () => console.log('You have connected to the room'));

        scene.socket.on('dealCards', (data) => {
            const {deck} = data;
            deck.forEach(c => scene.myHand.putCard(getCardByData(scene, null, c)));
        })

        scene.socket.on('dealCardsToEnemy', (data) => {
            const {deck} = data;
            console.log(deck);
            deck.forEach(c => scene.enemyHand.putCard(getCardByData(scene, null, c)));
        })

        scene.socket.on("playCard", (data) => {
            const {card, cardZoneId} = data
            scene.gameField.addCard(getCardByData(scene, scene.enemyHand, card), cardZoneId)
            console.log("Opponent has played a card")
        })

        scene.socket.on("startMatch", (data) => {
            console.log("Match is started");
            // scene.socket.emit('dealCards', {cardAmount: 6})
            scene.myHand.blockHand();
        })

        scene.socket.on('yourturn', () => {
            scene.gameButton.showEndButton();
            scene.socket.emit('dealCards', {cardAmount: (6 - scene.myHand.cardArr.length)})
            scene.moves = 2
            scene.myHand.unblockHand();
        })

        scene.socket.on('eval', () => {
            let cards = scene.gameField.getCards();
            for (let i = 0; i <= 2; i++) {
                if (!cards[i] && !cards[i+3])
                    continue
                let f1 = cards[i].hp - cards[i+3].attack;
                let f2 = cards[i+3].hp - cards[i].attack;

                if (!f1 || f1 <= 0)
                    cards[i].destroyCard()
                else
                    cards[i].addHp(-f1)

                if (!f2 || f2 <= 0)
                    cards[i+3].destroyCard()
                else
                    cards[i+3].addHp(-f2)
            }
        })
    }
}