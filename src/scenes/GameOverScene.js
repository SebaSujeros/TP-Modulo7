import { Scene } from 'phaser';

export class GameOverScene extends Scene
{
    constructor ()
    {
        super('GameOver');
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(0x3a0a0a);

        this.add.text(512, 384, 'Fin de partida', {
            fontFamily: 'Arial Black', fontSize: 52, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);
    }
}