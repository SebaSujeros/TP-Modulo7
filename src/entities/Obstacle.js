import { GameConfig } from '../patterns/GameConfig.js';

export class Obstacle
{
    constructor (scene)
    {
        const { obstacleWidth, obstacleHeight } = GameConfig.spawner;
        const x = GameConfig.worldWidth + obstacleWidth / 2;
        const y = GameConfig.groundY - obstacleHeight / 2;

        this.sprite = scene.add.rectangle(x, y, obstacleWidth, obstacleHeight, 0xc0392b);
        scene.physics.add.existing(this.sprite);
        this.body = this.sprite.body;
        this.body.setAllowGravity(false);
    }

    move (deltaMs, speed)
    {
        this.sprite.x -= (speed * deltaMs) / 1000;
    }

    isOffScreen ()
    {
        return this.sprite.x < -GameConfig.spawner.obstacleWidth;
    }

    destroy ()
    {
        this.sprite.destroy();
    }
}