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
            this.avatar.setSize(Player.avatarSize, Player.avatarSize);
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
            posX = this.sceneWidth/2 - Player.avatarSize / 2;
            posY = Player.avatarSize;
        } else {
            posX = this.sceneWidth/2 - Player.avatarSize / 2;
            posY = this.sceneHeight - Player.avatarSize - 15;
        }

        this.hpText = this.scene.add.text(posX, posY, this.hp, { fontSize: '20px', fill: '#ff00ff'});
    }

    addHp(num) {
        this.hp += num;
        this.hpText.setText(this.hp);

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