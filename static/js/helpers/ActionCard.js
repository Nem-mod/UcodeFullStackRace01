import Card from "./Card.js";

export default class ActionCard extends Card {
    constructor(scene, owner, x, y, cardKey, isOpened, isBlocked, strength) {
        super(scene, owner, x, y, cardKey, isOpened, isBlocked);
        this.strength = strength;
    }
}