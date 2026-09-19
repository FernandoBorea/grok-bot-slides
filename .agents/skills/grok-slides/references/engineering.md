# Contexto de Grok Bot for Engineering

Leé esta referencia solo al trabajar en este deck o reutilizar explícitamente su flujo. Resume decisiones de la conversación; las nuevas instrucciones del usuario pueden cambiarlas. El contenido vigente y los tiempos están en `src/decks/engineering/deck.ts` y [docs/engineering-talk.md](../../../../docs/engineering-talk.md). No fijes el total de slides de una versión anterior.

## Intención de la charla

- Tema central: Grok Bot aplicado al trabajo de ingeniería y al SDLC. El ejemplo lo explica, no lo reemplaza.
- Público mixto, técnico y no técnico. Quince minutos de exposición; preguntas del público después. Ejemplos y resultados preparados, sin demo en vivo.
- La plantilla actual sigue una app de tareas a la que se le agregan archivos adjuntos. Las burbujas son recreaciones editables, no capturas de MediConecto ni resultados reales de esa app hipotética.
- La introducción breve del ponente va después de la portada. Texto proporcionado por Walter: **Walter Morales — Ai Labs Co-Founder, SpaceXAI Ambassadors Regional Lead, AI Product Engineer**. No inventar otros cargos o biografía.
- Plugins, skills y MCP tienen un bloque breve antes de depender de esas palabras. No extender automáticamente el deck Grok Bot 101: su alcance se decide por separado.
- Presentar quién es Lauren y de dónde viene pstack antes de explicar su uso. El guion enlaza las fuentes; revalidar detalles externos cuando se actualicen. Los detalles de `/poteto-mode` se omiten en esta charla.

## Equipo y flujo relatados por Walter

| Bot | Identidad actual | Responsabilidad |
| --- | --- | --- |
| Research | Azul, triángulo, seed 201 | Investiga y lleva fuentes y hallazgos a PO. |
| PO | Verde/teal, flor, seed 202 | Acuerda el alcance con Walter y mantiene tickets, decisiones e historial en Linear. |
| Builder | Naranja, redondo, seed 203 | Coordina implementación en Cloud Agents, prepara PRs y mantiene las verificaciones. |
| QA | Rosa, cuadrado, seed 204 | Usa Cloud Agents para verificar y reporta a PO y Builder. |

Dr Eggbot ayuda a crear y definir los bots. La conversación ocurre principalmente en un grupo; el seguimiento 1:1 se pide cuando hace falta. Menciones directas y rutinas similares a una daily coordinan el trabajo. Los bots tienen memoria compartida e individual; Linear conserva las decisiones y el historial del proyecto.

Tanto la codificación como la ejecución de QA pasan por Cursor Cloud Agents en un environment con repositorios, dependencias y variables de entorno. El agente puede levantar y probar la app. La conexión de Grok Bot con servicios y el entorno de los Cloud Agents son piezas distintas.

El ciclo mostrado es: Research → PO → Builder → revisión y merge humanos → despliegue por CI/CD de GitHub → QA en `develop`. Si falla, QA reporta a **PO y Builder**; PO mantiene el seguimiento y Builder corrige código o cobertura. Tras otro merge y despliegue, QA repite; PO cierra si pasa. Una respuesta correcta de la API no demuestra por sí sola que la interfaz funcione.

pstack aporta skills y procedimientos; las tools/CLIs propias permiten operar el producto. Las verification skills y el mapa de funcionalidades se mantienen cuando cambia la app. `control-ui` y `control-cli` pertenecen a `cursor-team-kit`: no atribuirlos a pstack.

## Fuentes sin confundir productos

El guion mantiene enlaces al perfil de Lauren, pstack, Dr Eggbot, la guía oficial de Engineering y documentación de plugins/MCP. No extrapolar instrucciones de instalación entre Grok Bot, Grok Chat, Grok Build o Cursor. Si una ruta de configuración no está documentada para el producto exacto, explicar el concepto sin inventar pantallas ni comandos.
