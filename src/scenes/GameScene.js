import { Scene } from 'phaser';
import { GameState } from '../patterns/GameState.js';
import { Player } from '../entities/Player.js';
import { AutoRunner } from '../systems/AutoRunner.js';
import { InputSystem } from '../systems/InputSystem.js';
import { Hud } from '../systems/Hud.js';

export class GameScene extends Scene
{
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(0x7ec8e3);

        GameState.reset();
        GameState.running = true;

        this.autoRunner = new AutoRunner(this);
        this.player = new Player(this);
        this.hud = new Hud(this);

        this.physics.add.collider(this.player.sprite, this.autoRunner.ground);

        this.inputSystem = new InputSystem(this, () => this.player.jump());

        this.events.once('shutdown', () => {
            this.hud.destroy();
        });
    }

    update (_time, delta)
    {
        this.autoRunner.update(delta);
        this.player.update();
    }
}