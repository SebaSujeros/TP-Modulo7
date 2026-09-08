import { AUTO, Game, Scale } from 'phaser';
import { GameConfig } from './patterns/GameConfig.js';
import { BootScene } from './scenes/BootScene.js';
import { MainMenuScene } from './scenes/MainMenuScene.js';
import { GameScene } from './scenes/GameScene.js';
import { GameOverScene } from './scenes/GameOverScene.js';

const config = {
    type: AUTO,
    width: GameConfig.worldWidth,
    height: GameConfig.worldHeight,
    parent: 'game-container',
    backgroundColor: '#028af8',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: GameConfig.physics.gravityY }
        }
    },
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH
    },
    scene: [
        BootScene,
        MainMenuScene,
        GameScene,
        GameOverScene
    ]
};

document.addEventListener('DOMContentLoaded', () => {

    new Game(config);

});