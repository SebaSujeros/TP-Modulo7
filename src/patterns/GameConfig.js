export const GameConfig = {
    worldWidth: 1024,
    worldHeight: 768,
    groundY: 680,
    lives: 3,
    coinValue: 10,
    winScore: 150,
    physics: {
        gravityY: 1300
    },
    player: {
        x: 180,
        width: 44,
        height: 56,
        jumpVelocity: -650
    },
    runner: {
        baseSpeed: 260,
        speedGrowthPerSecond: 6,
        maxSpeed: 420
    },
    spawner: {
        minDelayMs: 900,
        maxDelayMs: 1500,
        obstacleWidth: 46,
        obstacleHeight: 64,
        coinChance: 0.35,
        coinRadius: 16,
        coinMinY: 540,
        coinMaxY: 640
    }
};