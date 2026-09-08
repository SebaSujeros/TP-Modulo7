import { GameConfig } from '../patterns/GameConfig.js';
import { GameState } from '../patterns/GameState.js';
import { Obstacle } from '../entities/Obstacle.js';

export class SpawnerSystem
{
    constructor (scene)
    {
        this.scene = scene;
        this.obstacles = [];
        this.obstacleSprites = [];
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

        this.countdownMs -= deltaMs;
        if (this.countdownMs <= 0) {
            this.spawnObstacle();
            this.countdownMs = this.nextDelay();
        }
    }

    spawnObstacle ()
    {
        const obstacle = new Obstacle(this.scene);
        this.obstacles.push(obstacle);
        this.obstacleSprites.push(obstacle.sprite);
    }

    removeObstacle (sprite)
    {
        const index = this.obstacleSprites.indexOf(sprite);
        if (index === -1) return;
        const [obstacle] = this.obstacles.splice(index, 1);
        this.obstacleSprites.splice(index, 1);
        obstacle.destroy();
    }
}