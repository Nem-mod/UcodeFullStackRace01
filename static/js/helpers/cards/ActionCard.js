import Card from "./Card.js";

export default class ActionCard extends Card {
    constructor(scene, owner, x, y, cardKey, isOpened, isBlocked, strength, action) {
        super(scene, owner, x, y, cardKey, isOpened, isBlocked);
        this.strength = strength;
        this.action = action;
        this.initialize();
    }

    initializeCardUI() {
        // if (this.cardUI) {
        //     this.cardUI.hpText.destroy();
        // }

        this.strengthImg = this.scene.add.image(-Card.cardWidth / 2.1, -Card.cardHeight / 2.2, 'bolt');
        this.strengthImg.setDisplaySize(Card.iconSize, Card.iconSize);

        this.strengthText = this.scene.add.text(-Card.cardWidth / 2 - 5, -Card.cardHeight / 2 - Card.iconSize / 7, 0, { font: '800 20px Poppins', fill: '#ffffff'});

        this.strengthText.card = this;
        this.strengthImg.card = this;

        this.cardContainer.add([ this.strengthImg, this.strengthText ]);

        this.addStrength(0);

        if (!this.isOpened)
            this.hideCardUI();
    }

    setCardByData(data) {
        this.strength = data.strength;  // TODO generate strength on server
        this.cardKey = data.card_id;
        this.action = data.card_action;
        this.initialize();

        return this;
    }

    showCardUI() {
        this.strengthText.visible = true;
        this.strengthImg.visible = true;
    }

    hideCardUI() {
        this.strengthText.visible = false;
        this.strengthImg.visible = false;
    }

    showPreview() {
        this.preview = new ActionCard(this.scene, null, this.sceneWidth / 6, this.sceneHeight / 2, this.cardKey, this.isOpened, true, this.strength);

        this.preview.cardContainer.setScale(2);
    }

    hidePreview() {
        this.preview.destroyCard();
        this.preview = null;
    }

    destroyCard() {
        super.destroyCard();
        this.strengthText = null;
    }

    addStrength(num) {
        let lenBefore = (this.strengthText.text + "").length;
        this.strength += num;
        this.strengthText.setText(this.strength);
        let lenAfter = (this.strengthText.text + "").length;

        this.strengthText.setPosition(this.strengthText.x - (lenAfter - lenBefore) * 5, this.strengthText.y);
    }

    getCardData() {
        return {
            card_id: this.cardKey,
            strength: this.strength,
            card_action: this.action
        }
    }
}