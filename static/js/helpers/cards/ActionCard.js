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

        if (!this.isOpen)
            this.hideCardUI();
    }

    setCardByData(data) {
        this.strength = data.card_power;
        this.cardKey = data.card_img;
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
        let shiftedY = this.posY <= this.sceneHeight / 2 ? this.posY + Card.cardHeight / 1.5 : this.posY - Card.cardHeight / 1.5;
        this.preview = new ActionCard(this.scene, null, this.posX, shiftedY, this.cardKey, this.isOpen, true, this.strength);
        this.preview.disableAllInteractive();
        this.preview.setDepth(99);

        this.preview.cardContainer.setScale(2.5);
    }

    hidePreview() {
        if (!this.preview)
            return;

        this.preview.destroyCard();
        this.preview = null;
    }

    isEquals(card) {
        if (super.isEquals(card) &&
            this.strength === card.strength)
            return true;
        return false;
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
            card_action: this.action,
            card_img_url: this.card_img
        }
    }
}