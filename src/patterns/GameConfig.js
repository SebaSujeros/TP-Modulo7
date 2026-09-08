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
    },
    ui: {
        fontFamily: 'Arial Black',
        gameOverDelayMs: 500,
        roofDecorAlpha: 0.35
    },
    colors: {
        boot: 0x028af8,
        sky: 0x7ec8e3,
        ground: 0x3d5a42,
        player: 0x33ccff,
        obstacle: 0xc0392b,
        coin: 0xffd700,
        gameOver: 0x3a0a0a,
        menu: 0x1b2a4a,
        gold: 0xffd700,
        hudScore: 0xffffff,
        hudLives: 0xff8888,
        skyline: [0x243b4d, 0x1e3242, 0x33506b, 0x2a3f52, 0x24404f],
        roofDecor: [0x7d93a3, 0x93a8b4, 0x6e8494]
    }
};