import { EventBus } from '../patterns/EventBus.js';
import { GameConfig } from '../patterns/GameConfig.js';
import { GameState } from '../patterns/GameState.js';

export class Hud
{
    constructor (scene)
    {
        this.scene = scene;

        this.scoreText = scene.add.text(24, 24, `Puntos: ${GameState.score}`, {
            fontFamily: GameConfig.ui.fontFamily,
            fontSize: 28,
            color: toCss(GameConfig.colors.hudScore),
            stroke: '#000000',
            strokeThickness: 4
        });

        this.livesText = scene.add.text(24, 62, `Vidas: ${GameState.lives}`, {
            fontFamily: GameConfig.ui.fontFamily,
            fontSize: 28,
            color: toCss(GameConfig.colors.hudLives),
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

function toCss (value)
{
    return `#${value.toString(16).padStart(6, '0')}`;
}