export default class SocketHandler {
    constructor(scene) {
        scene.socket = io('http://localhost:3001/');

        // Create room
        scene.socket.on('createRoom',() => console.log("You have created a room"))
        // Another user connects to game
        scene.socket.on('connected', () => console.log("User has connected"))
        // You have connected to the room
        scene.socket.on('connectToGame', () => console.log('You have connected to the room'))

        // scene.socket.on('firstTurn', () => {
        //     scene.GameHandler.changeTurn();
        // })
    }
}