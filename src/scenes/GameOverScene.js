import { Scene } from 'phaser';
import { GameState } from '../patterns/GameState.js';

export class GameOverScene extends Scene
{
    constructor ()
    {
        super('GameOver');
    }

    create (data)
    {
        this.cameras.main.setBackgroundColor(0x3a0a0a);

        const title = (data && data.won) ? '¡Ganaste!' : 'Fin de partida';

        this.add.text(512, 384, title, {
            fontFamily: 'Arial Black', fontSize: 52, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(512, 470, `Puntos: ${GameState.score}`, {
            fontFamily: 'Arial Black', fontSize: 30, color: '#ffd700',
            align: 'center'
        }).setOrigin(0.5);
    }
}