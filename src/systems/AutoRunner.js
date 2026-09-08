import { GameConfig } from '../patterns/GameConfig.js';

export class AutoRunner
{
    constructor (scene)
    {
        this.scene = scene;
        this.speed = GameConfig.runner.baseSpeed;
        this.farLayer = [];
        this.nearLayer = [];
        this.createGround();
        this.createSkyline();
        this.createRoofDecorations();
    }

    createGround ()
    {
        const { worldWidth, groundY } = GameConfig;
        this.ground = this.scene.add.rectangle(worldWidth / 2, groundY + 8, worldWidth, 16, 0x3d5a42);
        this.scene.physics.add.existing(this.ground, true);
    }

    createSkyline ()
    {
        const { worldWidth, groundY } = GameConfig;
        const colors = [0x243b4d, 0x1e3242, 0x33506b, 0x2a3f52, 0x24404f];
        let x = -80;
        let colorIndex = 0;
        while (x < worldWidth + 80) {
            const width = 90 + Math.floor(Math.random() * 90);
            const height = 130 + Math.floor(Math.random() * 150);
            const rect = this.scene.add.rectangle(x, groundY, width, height, colors[colorIndex % colors.length]);
            rect.setOrigin(0.5, 1);
            this.farLayer.push(rect);
            x += width + 50;
            colorIndex++;
        }
    }

    createRoofDecorations ()
    {
        const { worldWidth, groundY } = GameConfig;
        const colors = [0x7d93a3, 0x93a8b4, 0x6e8494];
        let x = -80;
        let colorIndex = 0;
        while (x < worldWidth + 80) {
            const width = 26 + Math.floor(Math.random() * 40);
            const height = 30 + Math.floor(Math.random() * 50);
            const rect = this.scene.add.rectangle(x, groundY, width, height, colors[colorIndex % colors.length]);
            rect.setOrigin(0.5, 1);
            rect.setAlpha(0.35);
            this.nearLayer.push(rect);
            x += width + 170;
            colorIndex++;
        }
    }

    getSpeed ()
    {
        return this.speed;
    }

    setSpeed (value)
    {
        this.speed = Math.min(value, GameConfig.runner.maxSpeed);
    }

    update (deltaMs)
    {
        const delta = deltaMs / 1000;
        const { worldWidth } = GameConfig;

        for (const rect of this.farLayer) {
            rect.x -= this.speed * 0.35 * delta;
            if (rect.x < -rect.width) rect.x += worldWidth + rect.width;
        }

        for (const rect of this.nearLayer) {
            rect.x -= this.speed * delta;
            if (rect.x < -rect.width) rect.x += worldWidth + rect.width;
        }
    }
}