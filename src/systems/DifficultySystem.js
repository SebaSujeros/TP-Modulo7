import { GameConfig } from '../patterns/GameConfig.js';

export class DifficultySystem
{
    constructor ()
    {
        this.elapsedSeconds = 0;
    }

    update (deltaMs, runner)
    {
        const delta = deltaMs / 1000;
        this.elapsedSeconds += delta;
        runner.setSpeed(runner.getSpeed() + GameConfig.runner.speedGrowthPerSecond * delta);
    }
}