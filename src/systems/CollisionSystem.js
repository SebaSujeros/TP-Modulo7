import { GameState } from '../patterns/GameState.js';

export class CollisionSystem
{
    constructor (scene, player, spawner)
    {
        this.scene = scene;
        this.player = player;
        this.spawner = spawner;

        this.scene.physics.add.collider(
            this.player.sprite,
            this.spawner.obstacleSprites,
            this.onObstacleHit,
            null,
            this
        );
    }

    onObstacleHit (_playerSprite, obstacleSprite)
    {
        this.spawner.removeObstacle(obstacleSprite);
        GameState.loseLife();

        if (GameState.isDefeated()) {
            GameState.running = false;
            this.player.freeze();
            this.scene.time.delayedCall(500, () => this.scene.start('GameOver'));
        }
    }
}