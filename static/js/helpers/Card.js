export default class Card {
    static cardWidth = 130;
    static cardHeight = 180;

    constructor(scene, owner, x, y, cardKey, isOpened, isBlocked) {
        this.scene = scene;
        this.owner = owner;
        this.posX = x;
        this.posY = y;
        this.cardKey = cardKey;
        this.isOpened = isOpened;
        this.isBlocked = isBlocked;

        this.initialize();
    }

    initialize() {
        this.initializeCardImg();

        this.setDepth(0);
    }

    initializeCardImg() {
        if (this.cardImg) {
            this.cardImg.destroy();
        }

        let key = this.isOpened ? this.cardKey : 'cardBack';
        this.cardImg = this.scene.add.image(this.posX, this.posY, key).setOrigin(0, 0).setInteractive();
        this.cardImg.setDisplaySize(Card.cardWidth, Card.cardHeight);

        this.cardImg.card = this;

        if (!this.isBlocked)
            this.scene.input.setDraggable(this.cardImg);
    }

    // TODO Abstract initialize ui for cards + change pos of ui while moving

    flip() {
        if (this.isOpened)
            this.cardImg.setTexture('cardBack');
        else
            this.cardImg.setTexture(this.cardKey);

        this.isOpened = !this.isOpened;
    }

    setTempDepth(depth) {
        this.cardImg.setDepth(depth);
    }

    setDepth(depth) {
        this.depth = depth;
        this.setTempDepth(depth);
    }

    resetDepth() {
        this.setTempDepth(this.depth);
    }

    setPosition(x, y) {
        this.posX = x;
        this.posY = y;
        this.cardImg.setPosition(x, y);
    }

    changeOwner(owner) {
        this.owner = owner;
    }

    destroy() {
        this.cardImg.destroy();
    }

    blockCard() {
        this.scene.input.setDraggable(this.cardImg, false);
    }

    unblockCard() {
        this.scene.input.setDraggable(this.cardImg);
    }
}