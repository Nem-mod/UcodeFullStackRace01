import Card from "./Card.js";

export default class HeroCard extends Card{
    constructor(scene, owner, x, y, cardKey, isOpened, isBlocked, attack, hp) {
        super(scene, owner, x, y, cardKey, isOpened, isBlocked);
        this.attack = attack;
        this.hp = hp;
    }
}