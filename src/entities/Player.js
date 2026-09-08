import { GameConfig } from '../patterns/GameConfig.js';

export class Player
{
    constructor (scene)
    {
        const { width, height } = GameConfig.player;
        const x = GameConfig.player.x;
        const y = GameConfig.groundY - height / 2;

        this.sprite = scene.add.rectangle(x, y, width, height, 0x33ccff);
        scene.physics.add.existing(this.sprite);
        this.body = this.sprite.body;
        this.body.setSize(width, height);
        this.isGrounded = false;
    }

    jump ()
    {
        if (!this.isGrounded) return;
        this.body.setVelocityY(GameConfig.player.jumpVelocity);
    }

    update ()
    {
        this.isGrounded = this.body.blocked.down;
    }

    freeze ()
    {
        this.body.setAllowGravity(false);
        this.body.setVelocity(0);
    }
}