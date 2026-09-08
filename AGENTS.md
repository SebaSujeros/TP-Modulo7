# AGENTS.md

## Proyecto

"Rooftop Runner": mini arcade auto-runner desarrollado para el TP Módulo 7 de Desarrollo Tecnológico 2. El jugador corre automáticamente sobre azoteas, esquiva obstáculos (3 vidas), junta monedas (+10) y gana al llegar a 150 puntos. Sin niveles, power-ups, guardado ni multijugador. Reglas completas en `docs/GDD.pdf`.

## Stack

- JavaScript
- Node.js
- Vite
- Phaser

## Objetivo

Desarrollar un videojuego pequeño aplicando:

- Buenas prácticas de organización de código.
- Desarrollo asistido por agentes de programación.

## Arquitectura

El proyecto está organizado de la siguiente manera:

```
src/
├── main.js            # Game config: mundo 1024x768, física arcade, escenas
├── scenes/            # Boot, MainMenu, Game, GameOver
├── entities/          # Player, Obstacle, Coin (GO + body físico)
├── systems/           # AutoRunner, SpawnerSystem, CollisionSystem, DifficultySystem, InputSystem, Hud
├── patterns/          # GameConfig (constantes), EventBus, GameState
└── assets/            # assets (vacío; se usan placeholders geométricos)
```

Cada escena orquesta su gameplay; los sistemas concentran una única responsabilidad; el estado compartido vive en `patterns/` (singletons `GameState` y `EventBus`).

## Reglas para el agente

- Utilizar JavaScript.
- No agregar TypeScript.
- Utilizar Phaser.
- Mantener las clases pequeñas y con responsabilidades claras.
- Evitar concentrar toda la lógica en GameScene.
- Evitar lógica duplicada y variables globales innecesarias (solo existen `GameState` y `EventBus` como singletons).
- No agregar dependencias externas sin justificar su necesidad.
- Priorizar soluciones comprensibles y respetar la arquitectura existente.
- Constantes y colores centralizados en `src/patterns/GameConfig.js`; no usar números mágicos.
- Código nuevo sin comentarios.
- No realzar commits: el agente entrega los cambios verificados y el usuario los revisa y comitea.
- Verificación: `npm run build-nolog` debe pasar; probar manualmente con `npm run dev-nolog` en `http://localhost:8080`.

Detalles específicos de Phaser 4 a respetar:

- Colliders/overlap: pasar SIEMPRE la misma referencia de array vivo (ej. `spawner.obstacleSprites`), nunca `Array.from()` de un grupo (Phaser congela el snapshot al crear el collider).
- Transiciones de escena fuera de la Scene: `this.scene.scene.start(key)` (el plugin es `instancia.scene`; la instancia de Scene no tiene `.start`). En cambio `time.delayedCall` sí vive en la instancia (`this.scene.time`).
- `Player.jump()` es un salto único: solo salta si `body.blocked.down` (en el suelo).
- El HUD (suscripto a `EventBus`) debe limpiarse en `Hud.destroy()` al cerrar la escena (evento `shutdown`).

## Flujo de trabajo

Antes de realizar cambios importantes:

1. Analizar el código existente.
2. Explicar brevemente el cambio propuesto.
3. Identificar las clases afectadas.
4. Implementar el cambio, verificar y refactorizar si es necesario.

## Comandos

- Instalar dependencias: `npm install`
- Ejecutar: `npm run dev`
- Build: `npm run build`

Los scripts del template agregan telemetría (`log.js`); existen variantes `*-nolog` que ejecutan vite directo (`npm run dev-nolog`, `npm run build-nolog`) y son las que se usan para verificar.

## Configuración utilizada

- Motor: Phaser `4.0.0` ("Caladan"); Arcade Physics incluido en el bundle principal (`src/phaser.js` → `physics/index.js` → `Arcade`); no hace falta `phaser-arcade-physics.js`.
- Bundler: Vite `^6.3.x` (`vite/config.dev.mjs` sirve en el puerto 8080; `vite/config.prod.mjs` genera `/dist`). Entrada: `index.html` → `#game-container`.
- Engine (`src/main.js`): `type: AUTO`, mundo 1024x768, `Scale.FIT` + `Scale.CENTER_BOTH`, física `arcade` con `gravity.y = 1300`, escenas `[Boot, MainMenu, Game, GameOver]`.
- Constantes de gameplay: `src/patterns/GameConfig.js` (vidas 3, moneda 10, victoria 150, salto -650, gravedad 1300, baseSpeed 260, speedGrowthPerSecond 6, maxSpeed 420, spawn 900–1500 ms con 35% monedas, colores/ui).
- Entorno: Node.js 18+, npm; desarrollo asistido por un agente de programación (opencode).