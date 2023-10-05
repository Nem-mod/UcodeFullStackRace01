import Hand from "../Hand.js";
import Player from "../Player.js";

export default class RoomHandler {
    constructor(scene) {
        const url = new URL(location.href);
        const searchParams = url.searchParams;

        if (url.pathname === "/createGame") {
            scene.socket.emit('createRoom', { roomToken: '1488' });
        }
        if (url.pathname === "/connectGame") {
            scene.socket.emit('connectToGame', { roomToken: '1488' });
        }
    }
}