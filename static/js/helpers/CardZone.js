import Card from "./cards/Card.js";
import ActionCard from "./cards/ActionCard.js";
import HeroCard from "./cards/HeroCard.js";

export default class CardZone {
    constructor(scene, x, y, isBlocked) {
        this.scene = scene;
        this.posX = x;
        this.posY = y;
        this.width = Card.cardWidth;
        this.height = Card.cardHeight;
        this.isBlocked = isBlocked;
        this.heroCard = null;
        this.actionCard = null;

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
            (card instanceof ActionCard && (this.heroCard === null || this.actionCard !== null)) ||
            (card instanceof HeroCard && this.heroCard !== null))
            return false;
        this.zone.outline.visible = true;
    }

    hideZone() {
        this.zone.outline.visible = false;
    }

    placeCard(card) {
        if (this.isBlocked ||
            (card instanceof ActionCard && (this.heroCard === null || this.actionCard !== null)) ||
            (card instanceof HeroCard && this.heroCard !== null))
            return false;

        if (card instanceof ActionCard) {
            console.log(card.owner.isTop);
            if (card.owner.isTop)
                card.setPosition(this.posX + Card.cardWidth / 2, this.posY - Card.cardHeight / 2);
            else
                card.setPosition(this.posX + Card.cardWidth / 3, this.posY + Card.cardHeight / 3);
            this.actionCard = card;
        } else {
            card.setPosition(this.posX, this.posY);
            this.heroCard = card;
        }

        card.owner.deleteCard(card);
        card.changeOwner(this);

        return true;
    }

    destroyCard() {
        if (!this.heroCard)
            return;

        this.heroCard.destroyCard();
        this.heroCard = null;

        if (!this.actionCard)
            return;

        this.actionCard.destroyCard();
        this.actionCard = null;
    }
}