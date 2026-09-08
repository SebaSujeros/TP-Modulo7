import { EventBus } from '../patterns/EventBus.js';
import { GameState } from '../patterns/GameState.js';

export class Hud
{
    constructor (scene)
    {
        this.scene = scene;

        this.scoreText = scene.add.text(24, 24, `Puntos: ${GameState.score}`, {
            fontFamily: 'Arial Black',
            fontSize: 28,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        });

        this.livesText = scene.add.text(24, 62, `Vidas: ${GameState.lives}`, {
            fontFamily: 'Arial Black',
            fontSize: 28,
            color: '#ff8888',
            stroke: '#000000',
            strokeThickness: 4
        });

        this._onScore = (event) => this.scoreText.setText(`Puntos: ${event.score}`);
        this._onLives = (event) => this.livesText.setText(`Vidas: ${event.lives}`);

        EventBus.on('score', this._onScore);
        EventBus.on('lives', this._onLives);
    }

    destroy ()
    {
        EventBus.off('score', this._onScore);
        EventBus.off('lives', this._onLives);
    }
}