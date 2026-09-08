import { GameConfig } from '../patterns/GameConfig.js';

export class Coin
{
    constructor (scene)
    {
        const { coinRadius } = GameConfig.spawner;
        const x = GameConfig.worldWidth + coinRadius;
        const y = GameConfig.spawner.coinMinY +
            Math.random() * (GameConfig.spawner.coinMaxY - GameConfig.spawner.coinMinY);

        this.sprite = scene.add.circle(x, y, coinRadius, GameConfig.colors.coin);
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
        return this.sprite.x < -GameConfig.spawner.coinRadius;
    }

    destroy ()
    {
        this.sprite.destroy();
    }
}