import { EventBus } from './EventBus.js';
import { GameConfig } from './GameConfig.js';

class GameStateStore
{
    reset ()
    {
        this.score = 0;
        this.lives = GameConfig.lives;
        this.running = false;
    }

    addScore (points)
    {
        this.score += points;
        EventBus.emit('score', { score: this.score });
    }

    loseLife ()
    {
        this.lives -= 1;
        EventBus.emit('lives', { lives: this.lives });
    }

    hasWon ()
    {
        return this.score >= GameConfig.winScore;
    }

    isDefeated ()
    {
        return this.lives <= 0;
    }
}

export const GameState = new GameStateStore();