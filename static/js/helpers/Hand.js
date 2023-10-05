import Card from "./cards/Card.js"
import HeroCard from "./cards/HeroCard.js";
import ActionCard from "./cards/ActionCard.js";

export default class Hand {
    constructor(scene, maxCards, isTop, isOpen) {
        this.scene = scene;
        this.maxCards = maxCards;
        this.isTop = isTop;
        this.isOpen = isOpen;
        this.cardArr = [];

        let { width, height } = this.scene.sys.game.canvas;
        this.sceneWidth = width;
        this.sceneHeight = height;

        // this.generateNewHand();
    }

    generateNewHand() { // Just for testing
        for (let i = 0; i < this.maxCards; i++) {
            if (i < 3)
                this.cardArr[i] = (new HeroCard(this.scene, this, 0, 0, `${i + 1}`, this.isOpen, !this.isOpen, 20, 15));
            else
                this.cardArr[i] = (new ActionCard(this.scene, this, 0, 0, `15`, this.isOpen, !this.isOpen, 5));
        }

        this.shiftCards();
    }

    shiftCards() {
        let posX, posY;

        if (this.isTop) {
            posX = this.sceneWidth / 1.5;
            posY = Card.cardHeight / 4;
        } else {
            posX = this.sceneWidth / 1.5;
            posY = this.sceneHeight - Card.cardHeight * 1.25;
        }

        for (let i = 0; i < this.cardArr.length; i++) {
            this.cardArr[i].setPosition(i * Card.cardWidth * 0.6 + posX, posY);
            this.cardArr[i].setDepth(i);
        }
    }

    deleteCard(card) {
        const lenBefore = this.cardArr.length
        this.cardArr = this.cardArr.filter(c => c !== card);

        if (lenBefore === this.cardArr.length) {
            let isDeleted = false;

            this.cardArr = this.cardArr.filter(c => {
                if (!c.isEquals(card)) {
                    return true;
                }
                if (!isDeleted) {
                    c.destroyCard();
                    isDeleted = true;
                    return false;
                }
                return true;
            });
        }

        this.shiftCards();
        card.changeOwner(null);
    }

    putCard(card) {
        if (card.owner)
            card.owner.destroyCard(card);

        card.changeOwner(this);
        if (this.isOpen !== card.isOpen) {
            card.flip();
        }
        if (!this.isOpen) {
            card.blockCard();
        }

        this.cardArr.push(card);
        this.shiftCards();
    }

    blockHand() {
        this.cardArr.forEach(c => c.blockCard());
    }

    unblockHand() {
        this.cardArr.forEach(c => c.unblockCard());
    }
}