# Rooftop Runner

Mini arcade auto-runner sobre azoteas de la ciudad. El jugador corre automáticamente, esquiva obstáculos, junta monedas y avanza en un mundo cuya velocidad aumenta con el tiempo.

## Integrante

- Sebastián Sujeros

## Tecnologías

- JavaScript
- Node.js
- Vite
- Phaser

## Instalación

```bash
npm install
```

## Ejecutar

```bash
npm run dev
```

Abrir `http://localhost:8080/` en el navegador.

## Build

```bash
npm run build
```

Genera la salida en `/dist`.

## Gameplay

El mundo avanza solo hacia la izquierda y el jugador solo se salta para evadir lo que se aproxima y juntar monedas. Cada choque con un obstáculo resta una vida, cada moneda suma puntos, y la velocidad de scroll crece de forma gradual con el tiempo.

### Objetivo

Llegar a 150 puntos juntando monedas antes de quedarse sin las 3 vidas.

### Mecánicas principales

- Esquivar obstáculos: cada choque resta 1 vida.
- Juntar monedas: cada una suma 10 puntos.
- Dificultad progresiva: la velocidad aumenta con el tiempo hasta un tope máximo.
- Victoria al alcanzar 150 puntos; derrota al llegar a 0 vidas.

## Controles

| Acción | Control |
|--------|---------|
| Saltar | Espacio |
| Saltar | Clic |

## Arquitectura

El código se organiza por responsabilidades. Las escenas (`src/scenes/`) orquestan el flujo (menú, juego, fin de partida), las entidades (`src/entities/`) encapsulan cada Game Object con su cuerpo físico, y los sistemas (`src/systems/`) concentran una única responsabilidad. Las constantes y el estado compartido viven en `src/patterns/` (`GameConfig`, `EventBus`, `GameState`), lo que permite ajustar el gameplay sin tocar la lógica.

```
GameScene
 ├── Player
 ├── SpawnerSystem
 │   ├── Obstacle
 │   └── Coin
 ├── CollisionSystem
 ├── DifficultySystem
 ├── AutoRunner
 ├── InputSystem
 └── Hud
```

## Principales instrucciones o prompts empleados

- Crear el scaffolding de un videojuego Phaser + Vite (JavaScript) en la carpeta `TP-Modulo7`, con el nombre "Rooftop Runner".
- Desarrollar el juego por etapas en 5 commits: menú + reestructura, MVP (correr y saltar con HUD), obstáculos y colisiones con game over, monedas con victoria y dificultad por tiempo, y cierre (reinicio, constantes y documentación).
- Borrar los rectángulos grises de decoración que confundían al jugador; luego reincorporarlos con menor opacidad y colores apagados para dar sensación de velocidad sin parecer obstáculos.
- Reporte de bug: "las vidas bajan pero no aparece la pantalla de game over"; pedido de corrección mínima y quirúrgica del binding de `this`.
- Adaptar `README.md` y `AGENTS.md` a las plantillas mínimas del TP (contexto, reglas para el agente y configuración utilizada).

## Problemas encontrados y soluciones aplicadas

1. **Problema:** el agente, sin el dato del error de consola, intentó reproducir el bug armando un entorno de testing headless con Chrome, consumiendo mucho tiempo sin resultado. **Solución:** se cortó ese intento y se le dio el error exacto de consola junto con un pedido de corrección mínima y específica, lo que resolvió el problema de inmediato.

2. **Problema:** GameOverScene no se disparaba al perder. **Causa:** `this.scene.start()` fallaba porque `this.scene` referenciaba la instancia de la escena, no su ScenePlugin. **Solución:** usar `this.scene.scene.start('GameOver')` en `CollisionSystem.js`.

Reglas completas en `docs/GDD.pdf`. Guías oficiales de Phaser 4 en `node_modules/phaser/skills/`.