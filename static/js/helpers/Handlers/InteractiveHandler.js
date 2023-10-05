import Hand from "../Hand.js";
import Card from "../cards/Card.js";
import HeroCard from "../cards/HeroCard.js";

export default class InteractiveHandler {
    constructor(scene) {
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

            if (!cardZone.placeCard(card))
                return;

            card.setDepth(0);
            card.blockCard();

            // cardZone.destroyCard();
        })

        scene.input.on('pointerover', (pointer, cardContainer) => {
            let card = cardContainer[0].card;
            if (!(card instanceof Card))
                return;
            card.showPreview();

            // scene.dealCards.setColor('#ff69b4');
        })

        scene.input.on('pointerout', (pointer, cardContainer) => {
            let card = cardContainer[0].card;
            if (!(card instanceof Card))
                return;
            card.hidePreview();

            // scene.dealCards.setColor('#00ffff')
        })
    }
}