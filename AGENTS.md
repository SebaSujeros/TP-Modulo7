# AGENTS.md

Instrucciones para trabajar en este repositorio (juego "Rooftop Runner", TP Módulo 7 / Desarrollo Tecnológico 2).

## Comandos

- Instalar deps: `npm install`
- Servidor de desarrollo: `npm run dev-nolog` (vite en el puerto 8080; usa `dev-nolog`/`build-nolog` para evitar la telemetría del template).
- Build de producción: `npm run build-nolog`
- No hay test runner configurado. La verificación es: build sin errores + prueba manual en el navegador (`npm run dev-nolog`).

## Stack y restricciones

- JavaScript puro (sin TypeScript). Sin dependencias extra más allá de Phaser 4 y Vite.
- Phaser 4 ("Caladan"): Arcade Physics viene en el bundle principal; no hace falta `phaser-arcade-physics.js`.
- Código nuevo sin comentarios. Placeholders geométricos (rectángulos/círculos), sin assets externos.

## Estructura

- `src/main.js` — Game config: tamaño de mundo (1024x768), física arcade con gravedad, y registro de escenas.
- `src/scenes/` — `BootScene` (pasa a menú), `MainMenuScene`, `GameScene` (orquesta el gameplay), `GameOverScene` (ganaste/perdiste + reinicio).
- `src/entities/` — `Player`, `Obstacle`, `Coin` (cada uno envuelve su Game Object y su body).
- `src/systems/` — responsabilidades únicas: `AutoRunner` (scroll y parallax, posee el suelo), `SpawnerSystem`, `CollisionSystem`, `DifficultySystem`, `InputSystem`, `Hud`.
- `src/patterns/` — `GameConfig` (todas las constantes/colores), `EventBus` (pub/sub singleton), `GameState` (score/vidas/running).
- `docs/GDD.txt` — GDD en texto (reglas de juego).

## Convenciones importantes

- **Constantes y colores**: centralizados en `src/patterns/GameConfig.js`. No usar números mágicos en el código.
- **Comunicación**: `GameState` + `EventBus`. Los eventos de score/vidas (`'score'`, `'lives'`) se emiten desde `GameState` y los escucha el `Hud`. El HUD debe registrarse en `Hud.destroy()` al cerrar la escena (evento `shutdown`).
- **Salto**: `Player.jump()` es un salto único: solo salta si `body.blocked.down` (en el suelo).
- **Colliders/overlap**: pasar SIEMPRE la misma referencia de array vivo (ej. `spawner.obstacleSprites`), no un `Array.from()` de un grupo (Phaser congela el snapshot una sola vez).
- **Transición de escena**: dentro de sistemas, para arrancar otra escena usar `this.scene.scene.start(key)` (el plugin de escena es `instancia.scene`; la instancia de Scene no tiene `.start`). Fuera de la escena, `time.delayedCall` sí vive en la instancia (`this.scene.time`).
- **Restart**: `GameOverScene` reinicia con `this.scene.start('Game')`; `GameScene.create()` hace `GameState.reset()` y reconstruye todo el mundo.
- **Game Over/Victoria**: `CollisionSystem.endGame(won)` congela al jugador, espera `GameConfig.ui.gameOverDelayMs` y pasa `{ won }` a `GameOverScene`.