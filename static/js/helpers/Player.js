export default class Player {
    static avatarSize = 200;

    constructor(scene, name, isTop, hp) {

        this.scene = scene;
        this.avatarName = name;
        this.isTop = isTop;
        this.hp = hp;

        let { width, height } = this.scene.sys.game.canvas;
        this.sceneWidth = width;
        this.sceneHeight = height;

        this.initialize();
    }

    initialize() {
        if (this.avatar) {
            this.avatar.destroy();
        }

        let posX, posY;

        if (this.isTop) {
            posX = this.sceneWidth / 2 - Player.avatarSize / 2;
            posY = 0;
        } else {
            posX = this.sceneWidth / 2 - Player.avatarSize / 2;
            posY = this.sceneHeight - Player.avatarSize;
        }

        if (this.scene.textures.exists(this.avatarName)) {
            this.avatar = this.scene.add.rexCircleMaskImage(posX, posY, this.avatarName).setOrigin(0, 0);
            this.avatar.setDisplaySize(Player.avatarSize, Player.avatarSize);
            this.renderPlayerUX();
            return;
        }

        this.avatar = this.scene.add.rexCircleMaskImage(posX, posY, 'placeholder').setOrigin(0, 0);
        this.scene.load.image(this.avatarName, `../../assets/${this.avatarName}.jpg`);
        this.scene.load.once(Phaser.Loader.Events.COMPLETE, () => {
            this.avatar.setTexture('avatarOur');
            this.avatar.setDisplaySize(Player.avatarSize, Player.avatarSize);
            this.renderPlayerUX();
        });
        this.scene.load.start();
    }

    renderPlayerUX() {
        if (this.hpText) {
            this.hpText.destroy();
        }

        let posX, posY;

        if (this.isTop) {
            posX = this.sceneWidth / 2 - Player.avatarSize / 2.5;
            posY = Player.avatarSize / 1.1;
        } else {
            posX = this.sceneWidth / 2 - Player.avatarSize / 2.5;
            posY = this.sceneHeight - Player.avatarSize / 1.1;
        }

        this.hpImg = this.scene.add.image(posX, posY, 'hp');
        this.hpImg.setDisplaySize(Player.avatarSize / 3, Player.avatarSize / 3);

        this.hpText = this.scene.add.text(posX - 6, posY - 10, 0, { fontSize: '20px', fill: '#ffffff'});

        this.addHp(0);
    }

    addHp(num) {
        let lenBefore = (this.hpText.text + "").length;
        this.hp += num;
        this.hpText.setText(this.hp);
        let lenAfter = (this.hpText.text + "").length;

        this.hpText.setPosition(this.hpText.x - (lenAfter - lenBefore) * 6, this.hpText.y);

        if (this.isDead())
            this.setDead();
    }

    removeHp(num) {
        this.addHp(-num);
    }

    setDead() {
        this.avatar.setTint(0xff9090);
    }

    isDead() {
        return this.hp < 1;
    }
}