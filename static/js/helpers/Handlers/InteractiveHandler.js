import Hand from "../Hand.js";
import Card from "../cards/Card.js";
import HeroCard from "../cards/HeroCard.js";

export default class InteractiveHandler {
    constructor(scene) {
        this.scene = scene;

        scene.input.on('dragstart', (pointer, cardContainer) => {
            const card = cardContainer.card;

            card.setTempDepth(99);
            scene.gameField.showAllZones(card);
        });

        scene.input.on('drag', (pointer, cardContainer, dragX, dragY) => {
            const card = cardContainer.card;

            card.setPosition(dragX - Card.cardWidth / 2, dragY - Card.cardHeight / 2);
        });

        scene.input.on('dragend', (pointer, cardContainer) => {
            const card = cardContainer.card;
            const hand = cardContainer.card.owner;

            if (hand instanceof Hand)
                hand.shiftCards();
            scene.gameField.hideAllZones();
        });

        scene.input.on('drop', (pointer, cardContainer, zone) => {
            const card = cardContainer.card;
            const cardZone = zone.cardZone;

            if (cardZone.isBlocked || !cardZone.placeCard(card))
                return;

            card.setDepth(0);
            card.blockCard();

            const cardZoneId = scene.gameField.getZoneIndex(cardZone);
            scene.socket.emit('playCard', {card: card.getCardData(), cardZoneId: cardZoneId})
        })

        scene.input.on('pointerover', (pointer, cardContainer) => {
            let card = cardContainer[0].card;
            if (!(card instanceof Card))
                return;
            card.showPreview();
        })

        scene.input.on('pointerout', (pointer, cardContainer) => {
            let card = cardContainer[0].card;
            if (!(card instanceof Card))
                return;
            card.hidePreview();
        })

    }

    buttonPressHandler() {
        if (this.action === 'ready') {
            console.log("Pressed " + this.action);
            this.scene.socket.emit('pressReady')
            this.hideButton()
        }

        if (this.action === 'endturn') {
            console.log(`Pressed ${this.action}`);
            this.scene.socket.emit('endturn');
            this.scene.myHand.blockHand();
            this.scene.gameButton.hideButton();
        }
    }
}