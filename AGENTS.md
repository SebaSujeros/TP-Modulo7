# AGENTS.md

Instrucciones para trabajar en este repositorio (juego "Rooftop Runner", TP Módulo 7 / Desarrollo Tecnológico 2).

## Contexto del proyecto

Mini arcade auto-runner 2D: el jugador corre automáticamente sobre azoteas, esquiva obstáculos (3 vidas), junta monedas (+10) y gana al llegar a 150 puntos; la velocidad aumenta con el tiempo. Sin niveles, power-ups, guardado ni multijugador. Reglas completas en `docs/GDD.pdf`.

El desarrollo se organizó en 5 commits (C1..C5) siguiendo un plan de 12 tareas: scaffolding + menú, MVP correr/saltar con HUD, obstáculos + colisiones + game-over, monedas + victoria + dificultad, y cierre (reinicio, GameConfig, documentación).

## Configuración utilizada

- **Tecnologías**: JavaScript puro (sin TypeScript). Node.js 18+, npm.
- **Motor**: Phaser `4.0.0` ("Caladan"). Arcade Physics viene en el bundle principal (`src/phaser.js` incluye `Physics` → `physics/index.js` → `Arcade`); no hace falta `phaser-arcade-physics.js`.
- **Build/bundler**: Vite `^6.3.x` con dos configs del template oficial: `vite/config.dev.mjs` (servidor en puerto 8080) y `vite/config.prod.mjs`. `index.html` es la entrada y monta el juego en `#game-container`.
- **Scripts** (`package.json`): `dev`/`build` corren `node log.js` (telemetría del template) y luego vite; `dev-nolog`/`build-nolog` ejecutan vite directo (los usados para verificar).
- **Configuración del motor** (`src/main.js`): `type: AUTO`, mundo 1024x768 (`GameConfig.worldWidth/Height`), `Scale.FIT` + `Scale.CENTER_BOTH` en `#game-container`, `physics.default: 'arcade'` con `gravity.y = 1300`, escenas en orden `[Boot, MainMenu, Game, GameOver]`; color de fondo inicial = `GameConfig.colors.boot`.
- **Constantes del juego**: todas en `src/patterns/GameConfig.js` (mundo, física, jugador, runner, spawner, ui, colores). Ajuste de dificultad: `GameConfig.runner` (baseSpeed 260, speedGrowthPerSecond 6, maxSpeed 420).
- **Entorno de desarrollo**: asistente de código (opencode); donde dice "agent/agente" aquí se refiere a ese asistente.

## Reglas para el agente

- **Verificación**: no hay test runner. Verificar con `npm run build-nolog` (debe pasar) y probando manualmente en `npm run dev-nolog` (http://localhost:8080). Los cambios se entregan listos para que el usuario los pruebe y los comitee; el agente **no debe commitear**.
- **Constantes y colores**: siempre desde `src/patterns/GameConfig.js`. No números mágicos.
- **Comunicación**: `GameState` + `EventBus` (singletons en `src/patterns/`). Eventos `'score'`/`'lives'` emitidos por `GameState`; el `Hud` los escucha y debe limpiarse en `Hud.destroy()` al cerrar la escena (evento `shutdown` de la Scene).
- **Salto**: `Player.jump()` salto único: solo si `body.blocked.down` (en el suelo).
- **Colliders/overlap**: pasar SIEMPRE la misma referencia de array vivo (ej. `spawner.obstacleSprites`), nunca `Array.from()` de un grupo (Phaser congela el snapshot al crear el collider).
- **Transiciones de escena**: dentro de sistemas usar `this.scene.scene.start(key)` (plugin = `instancia.scene`; la instancia de Scene no tiene `.start`). En cambio `time.delayedCall` sí vive en la instancia (`this.scene.time`). La promesa depende de `GameConfig.ui.gameOverDelayMs` + `CollisionSystem.endGame(won)` → `GameOverScene` con `{ won }`.
- **Restart**: `GameOverScene` con `this.scene.start('Game')`; `GameScene.create()` corre `GameState.reset()` y reconstruye todo el mundo (nuevos `AutoRunner`, `Player`, `SpawnerSystem`).
- **Estructura**: una responsabilidad por archivo: `scenes/` (Boot/MainMenu/Game/GameOver), `entities/` (Player/Obstacle/Coin con su GO + body), `systems/` (AutoRunner/SpawnerSystem/CollisionSystem/DifficultySystem/InputSystem/Hud), `patterns/` (GameConfig/EventBus/GameState).
- **Estilo**: JavaScript moderno, código sin comentarios, placeholders geométricos (rectángulos/círculos), sin assets externos ni nuevas dependencias.