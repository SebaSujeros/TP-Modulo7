import { Scene } from 'phaser';

export class MainMenuScene extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(0x1b2a4a);

        this.add.text(512, 280, 'ROOFTOP RUNNER', {
            fontFamily: 'Arial Black', fontSize: 76, color: '#ffffff',
            stroke: '#000000', strokeThickness: 10,
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(512, 400, 'Esquivá obstáculos, juntá monedas y llega a 150 puntos', {
            fontFamily: 'Arial Black', fontSize: 26, color: '#ffd700',
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(512, 520, 'Presioná ESPACIO o CLIC para empezar', {
            fontFamily: 'Arial Black', fontSize: 32, color: '#ffffff',
            stroke: '#000000', strokeThickness: 6,
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