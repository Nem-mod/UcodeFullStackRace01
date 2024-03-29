import Card from './Card.js';

export default class HeroCard extends Card{
    constructor(scene, owner, x, y, cardKey, isOpened, isBlocked, attack, hp) {
        super(scene, owner, x, y, cardKey, isOpened, isBlocked);
        this.attack = attack;
        this.hp = hp;

        this.initialize();
    }

    initializeCardUI() {
        this.hpImg = this.scene.add.image(-Card.cardWidth / 2, -Card.cardHeight / 2, 'hp')
        this.hpImg.setDisplaySize(Card.iconSize, Card.iconSize);
        this.attackImg = this.scene.add.image(-Card.cardWidth / 2.1, Card.cardHeight / 1.9, 'punch')
        this.attackImg.setDisplaySize(Card.iconSize / 1.2, Card.iconSize / 1.2);

        this.hpText = this.scene.add.text(-Card.cardWidth / 2 - 5, -Card.cardHeight / 2 - Card.iconSize / 7, 0, { font: '800 20px Poppins', fill: '#ffffff'});
        this.attackText = this.scene.add.text(-Card.cardWidth / 2 - 5, Card.cardHeight / 2 - Card.iconSize / 7, 0, { font: '800 20px Poppins', fill: '#ffffff'});

        this.hpText.card = this;
        this.attackText.card = this;
        this.hpImg.card = this;
        this.attackImg.card = this;

        this.cardContainer.add([ this.hpImg, this.attackImg, this.hpText, this.attackText ]);

        this.addHp(0);
        this.addAttack(0);

        if (!this.isOpen)
            this.hideCardUI();
    }

    setCardByData(data) {
        this.attack = data.card_power;
        this.hp = data.card_hitpoints;
        this.cardKey = data.card_img_url;
        this.initialize();
        return this;
    }

    showCardUI() {
        this.hpImg.visible = true;
        this.hpText.visible = true;
        this.attackImg.visible = true;
        this.attackText.visible = true;
    }

    hideCardUI() {
        this.hpImg.visible = false;
        this.hpText.visible = false;
        this.attackImg.visible = false;
        this.attackText.visible = false;
    }

    showPreview() {
        let shiftedY = this.posY <= this.sceneHeight / 2 ? this.posY + Card.cardHeight / 1.5 : this.posY - Card.cardHeight / 1.5;
        this.preview = new HeroCard(this.scene, null, this.posX, shiftedY, this.cardKey, this.isOpen, true, this.attack, this.hp);
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
            this.attack === card.attack &&
            this.hp === card.hp)
            return true;
        return false;
    }

    destroyCard() {
        super.destroyCard();
        this.hpText = null;
        this.attackText = null;
    }

    addHp(num) {
        let lenBefore = (this.hpText.text + "").length;
        this.hp += num;
        this.hpText.setText(this.hp);
        let lenAfter = (this.hpText.text + "").length;

        this.hpText.setPosition(this.hpText.x - (lenAfter - lenBefore) * 5, this.hpText.y);
    }

    addAttack(num) {
        let lenBefore = (this.attackText.text + "").length;
        this.attack += num;
        this.attackText.setText(this.attack);
        let lenAfter = (this.attackText.text + "").length;

        this.attackText.setPosition(this.attackText.x - (lenAfter - lenBefore) * 5, this.attackText.y);
    }

    getCardData() {
        return {
            card_id: this.cardKey,
            card_power: this.attack,
            card_hitpoints: this.hp,
            card_img_url: this.cardKey
        }
    }
}