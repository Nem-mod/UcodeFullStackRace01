import Card from "../cards/Card.js";
import HeroCard from "../cards/HeroCard.js";
import Player from "../Player.js";

export default class SocketHandler {
    constructor(scene) {
        scene.socket = io('http://localhost:3001/');

        // Create room
        scene.socket.on('createRoom',() => console.log("You have created a room"));

        // Another user connects to game
        scene.socket.on('connected', () => {
            console.log("User has connected");
            scene.enemyPlayer = new Player(scene, 'avatarOur', true, 20);
        });

        // You have connected to the room
        scene.socket.on('connectToGame', () => console.log('You have connected to the room'));

        scene.socket.on('dealCards', (data) => {
            const { deck } = data
            console.log(deck)
            deck.forEach(c => scene.myHand.putCard(new HeroCard(scene, scene.myHand, 0, 0, '', true, false, 0, 0).setCardByData(c)));
        })
    }
}