import { GameConfig } from '../patterns/GameConfig.js';
import { GameState } from '../patterns/GameState.js';
import { Obstacle } from '../entities/Obstacle.js';
import { Coin } from '../entities/Coin.js';

export class SpawnerSystem
{
    constructor (scene)
    {
        this.scene = scene;
        this.obstacles = [];
        this.obstacleSprites = [];
        this.coins = [];
        this.coinSprites = [];
        this.countdownMs = this.nextDelay();
    }

    nextDelay ()
    {
        const { minDelayMs, maxDelayMs } = GameConfig.spawner;
        return minDelayMs + Math.random() * (maxDelayMs - minDelayMs);
    }

    update (deltaMs, speed)
    {
        if (!GameState.running) return;

        for (let i = this.obstacles.length - 1; i >= 0; i--) {
            const obstacle = this.obstacles[i];
            obstacle.move(deltaMs, speed);
            if (obstacle.isOffScreen()) {
                this.removeObstacle(obstacle.sprite);
            }
        }

        for (let i = this.coins.length - 1; i >= 0; i--) {
            const coin = this.coins[i];
            coin.move(deltaMs, speed);
            if (coin.isOffScreen()) {
                this.removeCoin(coin.sprite);
            }
        }

        this.countdownMs -= deltaMs;
        if (this.countdownMs <= 0) {
            this.spawn();
            this.countdownMs = this.nextDelay();
        }
    }

    spawn ()
    {
        if (Math.random() < GameConfig.spawner.coinChance) {
            this.spawnCoin();
        } else {
            this.spawnObstacle();
        }
    }

    spawnObstacle ()
    {
        const obstacle = new Obstacle(this.scene);
        this.obstacles.push(obstacle);
        this.obstacleSprites.push(obstacle.sprite);
    }

    spawnCoin ()
    {
        const coin = new Coin(this.scene);
        this.coins.push(coin);
        this.coinSprites.push(coin.sprite);
    }

    removeObstacle (sprite)
    {
        const index = this.obstacleSprites.indexOf(sprite);
        if (index === -1) return;
        const [obstacle] = this.obstacles.splice(index, 1);
        this.obstacleSprites.splice(index, 1);
        obstacle.destroy();
    }

    removeCoin (sprite)
    {
        const index = this.coinSprites.indexOf(sprite);
        if (index === -1) return;
        const [coin] = this.coins.splice(index, 1);
        this.coinSprites.splice(index, 1);
        coin.destroy();
    }
}