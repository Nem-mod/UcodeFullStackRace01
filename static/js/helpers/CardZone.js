import Card from "./Card.js";
import ActionCard from "./ActionCard.js";
import HeroCard from "./HeroCard.js";

export default class CardZone {
    constructor(scene, x, y, isBlocked) {
        this.scene = scene;
        this.posX = x;
        this.posY = y;
        this.width = Card.cardWidth;
        this.height = Card.cardHeight;
        this.isBlocked = isBlocked;
        this.card = null;

        this.initialize();
    }

    initialize() {
        this.zone = this.scene.add.zone(this.posX, this.posY, this.width, this.height).setRectangleDropZone(this.width, this.height).setOrigin(0, 0);
        this.zone.cardZone = this;

        this.zone.outline = this.scene.add.graphics();
        this.zone.outline.lineStyle(4, 0xff69b4);
        this.zone.outline.strokeRect(this.posX, this.posY, this.width, this.height);  // TODO check if rectangle is correct
        this.hideZone();
    }

    showZone(card) {
        if (this.isBlocked ||
            (card instanceof ActionCard && this.card === null) ||
            (card instanceof HeroCard && this.card !== null))
            return;
        this.zone.outline.visible = true;
    }

    hideZone() {
        this.zone.outline.visible = false;
    }

    placeCard(card) {
        if (this.isBlocked ||
            (card instanceof ActionCard && this.card === null) ||
            (card instanceof HeroCard && this.card !== null))
            return false;

        if (card instanceof ActionCard) {
            console.log("Action card played");
        }

        card.setPosition(this.posX, this.posY);
        card.owner.deleteCard(card);
        card.changeOwner(this);

        this.card = card;

        return true;
    }
}