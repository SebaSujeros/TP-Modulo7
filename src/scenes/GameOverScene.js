import { Scene } from 'phaser';
import { GameConfig } from '../patterns/GameConfig.js';
import { GameState } from '../patterns/GameState.js';

export class GameOverScene extends Scene
{
    constructor ()
    {
        super('GameOver');
    }

    create (data)
    {
        this.cameras.main.setBackgroundColor(GameConfig.colors.gameOver);

        const won = Boolean(data && data.won);
        const title = won ? '¡Ganaste!' : 'Fin de partida';

        this.add.text(512, 360, title, {
            fontFamily: GameConfig.ui.fontFamily,
            fontSize: 52,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(512, 445, `Puntos: ${GameState.score}`, {
            fontFamily: GameConfig.ui.fontFamily,
            fontSize: 30,
            color: '#ffd700',
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(512, 560, 'Presioná ESPACIO o CLIC para volver a jugar', {
            fontFamily: GameConfig.ui.fontFamily,
            fontSize: 30,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 5,
            align: 'center'
        }).setOrigin(0.5);

        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('Game');
        });

        this.input.once('pointerdown', () => {
            this.scene.start('Game');
        });
    }
}