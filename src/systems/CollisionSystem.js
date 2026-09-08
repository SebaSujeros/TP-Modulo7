import { GameConfig } from '../patterns/GameConfig.js';
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

        this.scene.physics.add.overlap(
            this.player.sprite,
            this.spawner.coinSprites,
            this.onCoinHit,
            null,
            this
        );
    }

    onObstacleHit (_playerSprite, obstacleSprite)
    {
        this.spawner.removeObstacle(obstacleSprite);
        GameState.loseLife();

        if (GameState.isDefeated()) {
            this.endGame(false);
        }
    }

    onCoinHit (_playerSprite, coinSprite)
    {
        this.spawner.removeCoin(coinSprite);
        GameState.addScore(GameConfig.coinValue);

        if (GameState.hasWon()) {
            this.endGame(true);
        }
    }

    endGame (won)
    {
        if (!GameState.running) return;
        GameState.running = false;
        this.player.freeze();
        this.scene.time.delayedCall(500, () => this.scene.scene.start('GameOver', { won }));
    }
}