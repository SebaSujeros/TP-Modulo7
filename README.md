# Rooftop Runner

Mini arcade auto-runner desarrollado en **Phaser 4 + Vite** para el TP Módulo 7 de Desarrollo Tecnológico 2.

El jugador corre automáticamente por azoteas de la ciudad, esquiva obstáculos, junta monedas y trata de llegar a 150 puntos antes de perder sus 3 vidas. La velocidad de carrera aumenta con el tiempo.

## Requisitos

- Node.js 18+ y npm.

## Instalación

```bash
npm install
```

## Ejecución

```bash
npm run dev        # servidor de desarrollo (arranca vite en el puerto 8080)
npm run dev-nolog  # igual pero sin telemetría de Phaser
```

Abrí `http://localhost:8080/` en el navegador.

## Compilar para producción

```bash
npm run build        # genera la salida en /dist
npm run build-nolog  # igual pero sin telemetría de Phaser
```

## Controles

- **ESPACIO** o **CLIC** → saltar (salto único; solo se puede volver a saltar al tocar el suelo).

## Reglas (según GDD)

- El mundo avanza solo hacia la izquierda; el jugador no se mueve en X.
- Esquivar los obstáculos rojos: cada choque resta **1 vida**.
- Juntar monedas: cada una suma **10 puntos**.
- Victoria al alcanzar **150 puntos**.
- Derrota al quedarse sin **vidas** (3 en total).
- La velocidad de scroll aumenta de forma gradual con el tiempo, hasta un tope máximo.
- Sin niveles, power-ups, guardado ni multijugador.

## Stack

- JavaScript (sin TypeScript).
- Phaser `4.0.0` (Arcade Physics incluido en el bundle principal).
- Vite `^6.3.x` (el template oficial provee los scripts `dev/build` con telemetría y las variantes `*-nolog`).
- Sin dependencias adicionales; placeholders geométricos (rectángulos/círculos), sin imágenes ni audio.

## Estructura

```
src/
  main.js            # configuración del motor (Game config + escenas)
  scenes/            # BootScene, MainMenuScene, GameScene, GameOverScene
  entities/          # Player, Obstacle, Coin
  systems/           # AutoRunner, SpawnerSystem, CollisionSystem, DifficultySystem, InputSystem, Hud
  patterns/          # GameConfig (constantes), EventBus, GameState
docs/
  GDD.txt            # GDD en texto
  GDD.pdf            # GDD entregado (colocarlo acá para la entrega)
```

## Referencias

- GDD: `docs/GDD.txt`.
- Guías oficiales de Phaser 4 incluidas en `node_modules/phaser/skills/`.