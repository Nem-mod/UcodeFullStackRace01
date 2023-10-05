import Card from "./cards/Card.js";
import CardZone from "./CardZone.js";

export default class GameField {
    constructor(scene, cardsNumber) {
        this.scene = scene;
        this.maxCards = cardsNumber;
        this.fieldArr = new Array(this.maxCards);

        let { width, height } = this.scene.sys.game.canvas;
        this.sceneWidth = width;
        this.sceneHeight = height;
        this.gapX = Card.cardWidth / 2;
        this.gapY = this.gapX / 2;

        this.initialize();
    }

    initialize() {
        const posX = this.sceneWidth / 2 - Card.cardWidth * this.maxCards / 4 - this.gapX * (this.maxCards - 2) / 4;
        const posY = this.sceneHeight / 2 - Card.cardHeight;

        for (let i = 0; i < 2; i++) {
            for (let x  = 0; x < this.maxCards / 2; x++) {
                this.fieldArr[i * this.maxCards / 2 + x] = new CardZone(this.scene, posX + (Card.cardWidth + this.gapX) * x, posY + (Card.cardHeight + this.gapY) * i, i === 0);
            }
        }

        this.background = this.scene.add.image(0, 0, 'background').setOrigin(0, 0);
        this.background.setDisplaySize(1920, 1080);
    }

    showAllZones(card) {
        this.fieldArr.forEach(z => z.showZone(card));
    }

    hideAllZones() {
        this.fieldArr.forEach(z => z.hideZone());
    }

    addCard(card, index) {
        this.fieldArr[index].placeCard(card);
    }

    deleteCard(index) {
        this.fieldArr[index].deleteCard();
    }

    getZoneIndex(zone) {
        for (let i = 0; i < this.maxCards; i++) {
            if (this.fieldArr[i] === zone)
                return i;
        }
        return -1;
    }

    getZoneByIndex(index) {
        return this.fieldArr[index]
    }
}