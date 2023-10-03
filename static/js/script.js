import Game from './scenes/game.js'

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#78bdbd',
    scale: {
        mode: Phaser.Scale.FIT,
        // autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
    },
    scene: [
        Game
    ]
};

// console.log(window.innerWidth + " " + window.innerHeight)

const game = new Phaser.Game(config);