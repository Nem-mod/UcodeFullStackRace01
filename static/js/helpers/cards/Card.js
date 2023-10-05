export default class Card {
    static cardWidth = 130;
    static cardHeight = 180;
    static iconSize = 60;

    constructor(scene, owner, x, y, cardKey, isOpened, isBlocked) {
        this.scene = scene;
        this.owner = owner;
        this.posX = x;
        this.posY = y;
        this.cardKey = cardKey;
        this.isOpened = isOpened;
        this.isBlocked = isBlocked;
        this.preview = null;

        let { width, height } = this.scene.sys.game.canvas;
        this.sceneWidth = width;
        this.sceneHeight = height;
    }

    initialize() {
        if (this.cardContainer)
            this.destroyCard();

        this.cardContainer = this.scene.add.container(this.posX, this.posY);
        this.cardContainer.setSize(Card.cardWidth, Card.cardHeight).setInteractive();
        this.cardContainer.card = this;

        this.initializeCardImg();
        this.initializeCardUI();

        if (!this.isBlocked)
            this.scene.input.setDraggable(this.cardContainer);

        this.setDepth(0);
    }

    initializeCardImg() {
        if (this.cardImg) {
            this.cardImg.destroy();
        }

        let key = this.isOpened ? this.cardKey : 'cardBack';

        this.cardImg = this.scene.add.image(0 ,0, key);
        this.cardImg.setDisplaySize(Card.cardWidth, Card.cardHeight);
        this.cardImg.card = this;

        this.cardContainer.add(this.cardImg);
    }

    initializeCardUI() {}

    hideCardUI() {}

    showCardUI() {}

    showPreview() {}

    hidePreview() {}

    // TODO Abstract initialize ui for cards + change pos of ui while moving

    flip() {
        if (this.isOpened) {
            this.cardImg.setTexture('cardBack');
            this.hideCardUI();
        }
        else {
            this.cardImg.setTexture(this.cardKey);
            this.showCardUI();
        }

        this.isOpened = !this.isOpened;
    }

    setTempDepth(depth) {
        this.cardContainer.setDepth(depth);
    }

    setDepth(depth) {
        this.depth = depth;
        this.setTempDepth(depth);
    }

    resetDepth() {
        this.setTempDepth(this.depth);
    }

    setPosition(x, y) {
        this.posX = x + Card.cardWidth / 2;
        this.posY = y + Card.cardHeight / 2;
        this.cardContainer.setPosition(this.posX, this.posY);
    }

    changeOwner(owner) {
        this.owner = owner;
    }

    destroyCard() {
        this.cardContainer.removeAll(true);
        this.cardImg = null;
    }

    blockCard() {
        this.scene.input.setDraggable(this.cardContainer, false);
    }

    unblockCard() {
        this.scene.input.setDraggable(this.cardContainer);
    }
}