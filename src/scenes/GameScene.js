import { Scene } from 'phaser';
import { GameConfig } from '../patterns/GameConfig.js';
import { GameState } from '../patterns/GameState.js';
import { Player } from '../entities/Player.js';
import { AutoRunner } from '../systems/AutoRunner.js';
import { SpawnerSystem } from '../systems/SpawnerSystem.js';
import { CollisionSystem } from '../systems/CollisionSystem.js';
import { DifficultySystem } from '../systems/DifficultySystem.js';
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
        this.cameras.main.setBackgroundColor(GameConfig.colors.sky);

        GameState.reset();
        GameState.running = true;

        this.autoRunner = new AutoRunner(this);
        this.difficulty = new DifficultySystem();
        this.player = new Player(this);
        this.spawner = new SpawnerSystem(this);
        this.hud = new Hud(this);

        this.physics.add.collider(this.player.sprite, this.autoRunner.ground);

        this.collisionSystem = new CollisionSystem(this, this.player, this.spawner);
        this.inputSystem = new InputSystem(this, () => this.player.jump());

        this.events.once('shutdown', () => {
            this.hud.destroy();
        });
    }

    update (_time, delta)
    {
        this.autoRunner.update(delta);
        this.difficulty.update(delta, this.autoRunner);
        this.player.update();
        this.spawner.update(delta, this.autoRunner.getSpeed());
    }
}