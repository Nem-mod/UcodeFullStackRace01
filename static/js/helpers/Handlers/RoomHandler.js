import Hand from "../Hand.js";
import Player from "../Player.js";

export default class RoomHandler {
    constructor(scene) {
        const url = new URL(location.href);
        const searchParams = url.searchParams;

        let { width, height } = scene.sys.game.canvas;
        this.sceneWidth = width;
        this.sceneHeight = height;


        if (url.pathname === "/createGame") {
            // const token = this.generateRandomToken(4);
            const token = 1488;

            scene.socket.emit('createRoom', { roomToken: token });

            scene.tokenText = scene.add.text(this.sceneWidth / 3.2, this.sceneHeight / 2.5, `Room token: ${token}`, { font: '800 100px Poppins', fill: '#ffffff'});
        }
        if (url.pathname === "/connectGame") {
            scene.socket.emit('connectToGame', { roomToken: searchParams.get('token') });
        }
    }

    generateRandomToken(length) {
        const charset = "0123456789";
        let token = "";

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            token += charset[randomIndex];
        }

        return token;
    }
}