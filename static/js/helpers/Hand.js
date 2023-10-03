import Card from "./Card.js"
import HeroCard from "./HeroCard.js";
import ActionCard from "./ActionCard.js";

export default class Hand {
    constructor(scene, maxCards, isTop, isOpen) {
        this.scene = scene;
        this.maxCards = maxCards;
        this.isTop = isTop;
        this.isOpen = isOpen;
        this.cardArr = [this.maxCards];

        let { width, height } = this.scene.sys.game.canvas;
        this.sceneWidth = width;
        this.sceneHeight = height;

        this.generateNewHand();
    }

    generateNewHand() { // Just for testing
        for (let i = 0; i < this.maxCards; i++) {
            if (i < 3)
                this.cardArr[i] = (new HeroCard(this.scene, this, 0, 0, `${i + 1}`, this.isOpen, !this.isOpen));
            else
                this.cardArr[i] = (new ActionCard(this.scene, this, 0, 0, `15`, this.isOpen, !this.isOpen));
        }

        this.shiftCards();
    }

    shiftCards() {
        let posX, posY;

        if (this.isTop) {
            posX = this.sceneWidth / 1.5;
            posY = 0;
        } else {
            posX = this.sceneWidth / 1.5;
            posY = this.sceneHeight - Card.cardHeight;
        }

        for (let i = 0; i < this.cardArr.length; i++) {
            this.cardArr[i].setPosition(i * Card.cardWidth * 0.6 + posX, posY);
            this.cardArr[i].setDepth(i);
        }
    }

    deleteCard(card) {
        this.cardArr = this.cardArr.filter(c => c !== card);
        this.shiftCards();
        card.changeOwner(null);
    }

    //TODO create card based on type
    putCard(key) {
        this.cardArr.push(new Card(this.scene, this, 0, 0, key, this.isOpen, !this.isTop));
        this.shiftCards();
    }
}