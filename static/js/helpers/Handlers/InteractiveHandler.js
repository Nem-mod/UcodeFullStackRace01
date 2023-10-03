import Hand from "../Hand.js";

export default class InteractiveHandler {
    constructor(scene) {
        scene.input.on('dragstart', (pointer, cardImg) => {
            const card = cardImg.card;

            card.setTempDepth(99);
            scene.gameField.showAllZones(card);
        });

        scene.input.on('drag', (pointer, cardImg, dragX, dragY) => {
            const card = cardImg.card;

            card.setPosition(dragX, dragY);
        });

        scene.input.on('dragend', (pointer, cardImg) => {
            const card = cardImg.card;
            const hand = cardImg.card.owner;

            if (hand instanceof Hand)
                hand.shiftCards();
            scene.gameField.hideAllZones();
        });

        scene.input.on('drop', (pointer, cardImg, zone) => {
            const card = cardImg.card;
            const cardZone = zone.cardZone;

            if (!cardZone.placeCard(card))
                return;

            scene.input.setDraggable(card.cardImg, false);
        })
    }
}