import Button from "./Button.js"
import Game from "../scenes/game.js";

export default class GameButton {
    static buttonWidth = 400;
    static buttonHeight = 100;

    constructor(scene) {
        this.scene = scene;

        let { width, height } = this.scene.sys.game.canvas;
        this.sceneWidth = width;
        this.sceneHeight = height;

        this.initialize();
    }

    initialize() {
        this.btnContainer = this.scene.add.container(this.sceneWidth - GameButton.buttonWidth, this.sceneHeight / 2);
        this.scene.input.enableDebug(this.btnContainer);

        this.btn = new Button(this.scene, 0, 0, 'button', this.buttonPressHandler.bind(this));
        this.btn.setDisplaySize(GameButton.buttonWidth, GameButton.buttonHeight);

        this.btnText = this.scene.add.text(0, -GameButton.buttonHeight / 4, 0, { font: '800 40px Poppins', fill: '#ffffff'});

        this.btnContainer.add([ this.btn, this.btnText ]);
        this.btnContainer.visible = false;
    }

    changeText(newStr) {
        let lenBefore = (this.btnText.text + "").length;
        this.btnText.setText(newStr);
        let lenAfter = (this.btnText.text + "").length;

        this.btnText.setPosition(this.btnText.x - (lenAfter - lenBefore) * 11, this.btnText.y);
    }

    showReadyButton() {
        this.changeText("Ready");
        this.action = 'ready';
        this.btnContainer.visible = true;
    }

    showEndButton() {
        this.changeText("End turn");
        this.action = 'endturn';
        this.btnContainer.visible = true;
    }

    hideButton() {
        this.btnContainer.visible = false;
    }

    buttonPressHandler() {
        console.log("Pressed " + this.action);
    }
}