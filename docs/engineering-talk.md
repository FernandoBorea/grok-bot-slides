# Grok Bot for Engineering

Charla de 15 minutos para audiencia mixta. Grok Bot es el tema central. Una app de tareas sirve como plantilla para seguir la misma idea —agregar archivos adjuntos— durante la presentación. Las preguntas del público ocurren después de la exposición. No hay demo en vivo ni ejercicio de implementación.

| Slide                                       | Tiempo | Acumulado | Guía del presentador                                                                                                                                                                         |
| ------------------------------------------- | ------ | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Grok Bot for Engineering                 | 0:30   | 0:30      | Presentar el recorrido y hacer la encuesta breve de uso previo.                                                                                                                              |
| 2. Walter Morales                           | 0:30   | 1:00      | Ai Labs Co-Founder, SpaceXAI Ambassadors Regional Lead, AI Product Engineer.                                                                                                                 |
| 3. De la idea a algo que funciona           | 1:00   | 2:00      | Definir SDLC y ubicar a los bots junto a las decisiones humanas.                                                                                                                             |
| 4. Bots con responsabilidades claras        | 1:15   | 3:15      | Dr Eggbot y la plantilla de cuatro roles. Explicar qué recibe y a quién entrega cada bot.                                                                                                    |
| 5. Cómo le damos más capacidades            | 1:30   | 4:45      | Plugin = paquete; skill = instrucciones; MCP = estándar de conexión. Mostrar Marketplace → Add → conectar cuenta → probar desde el chat. Mencionar Your plugins para gestionar herramientas. |
| 6. Lo hablamos en el grupo                  | 1:30   | 6:15      | Pedimos adjuntos, PO encarga investigación y Builder espera el alcance. Memorias, menciones, rutinas y decisiones en Linear.                                                                 |
| 7. Un entorno listo para trabajar           | 1:30   | 7:45      | Builder y QA usan Cursor Cloud Agents. Repositorios, dependencias y variables para ejecutar y probar.                                                                                        |
| 8. La forma de trabajar de Lauren           | 1:00   | 8:45      | Rol actual en xAI y React Compiler; experiencia en Meta, Netflix y Cursor. pstack recoge skills de su trabajo en Cursor.                                                                     |
| 9. Enseñale cómo comprobar tu app           | 1:00   | 9:45      | Una verification skill para los adjuntos. Crear, adaptar y mantener la skill con pstack.                                                                                                     |
| 10. Dale herramientas para hacer el trabajo | 1:45   | 11:30     | Skill, feature map, tool propia y comprobación visual. Ejemplo conceptual de una tool que recibe una tarea y un archivo.                                                                     |
| 11. Si algo falla, vuelve al equipo         | 2:15   | 13:45     | Fallo hipotético: el adjunto desaparece. QA reporta a PO y Builder; Builder corrige; vos revisás y hacés merge; CI/CD despliega; QA repite en develop. PO cierra si pasa.                    |
| 12. Tu primer flujo con Grok Bot            | 1:15   | 15:00     | Empezar con Dr Eggbot y una tarea conocida. Encuesta final breve.                                                                                                                            |

## Plugins y MCP: alcance del bloque breve

La slide 5 da el contexto mínimo antes de ver integraciones y pstack. Puede funcionar como puente desde Grok Bot 101. El deck 101 conserva su contenido actual hasta acordar el alcance de esa presentación.

La ruta Marketplace → Add → autenticación → @ conector está documentada para Grok Bot. La gestión de herramientas está en Marketplace → Your plugins → Manage plugins and skills. No se atribuyen a Grok Bot los comandos de instalación de Cursor ni los de Grok Build.

MCP significa Model Context Protocol. Se explica como protocolo, no como otro paquete que haya que instalar siempre. Un servidor ofrece herramientas o datos; el cliente compatible configura la conexión según su documentación. No se presenta una ruta de interfaz para MCP personalizados en Grok Bot, porque no se encontró documentada públicamente.

## Plantilla y evidencia

- Las burbujas son componentes editables. La conversación y la app de tareas son ejemplos ilustrativos adaptados del flujo explicado por Walter; no son transcripciones ni resultados de un proyecto real.
- Research es azul/triángulo, PO verde/flor, Builder naranja/redondo y QA rosa/cuadrado. Solo se repite un avatar cuando representa al mismo bot del equipo.
- La definición de roles, el uso del environment, la memoria, Linear y las rutinas provienen de la explicación de Walter. La presentación breve usa los tres roles que él proporcionó.
- No se usan las capturas suministradas como assets de la presentación.
- No se afirman métricas de productividad, bugs corregidos ni pruebas pasadas. El fallo de adjuntos es una situación hipotética para explicar el ciclo de corrección.
- No se inspeccionó la configuración privada del producto. Las slides explican una plantilla adaptable, no un inventario verificado de archivos del repositorio.
- La verificación mostrada corresponde a develop. El diagrama no afirma verificación de producción.
- El flujo de Walter usa /poteto-mode, pero la charla omite sus detalles y se centra en las verification skills y las tools.

## Fuentes

Consultadas el 18 de septiembre de 2026:

- [Conectar apps en Grok Bot](https://docs.x.ai/grok-bot/computer-and-apps#connect-an-app)
- [Gestionar plugins y herramientas](https://docs.x.ai/grok-bot/settings-and-notifications#plugins)
- [Skills y rutinas](https://docs.x.ai/grok-bot/skills-routines-and-automations)
- [Qué es MCP](https://modelcontextprotocol.io/docs/getting-started/intro)
- [Perfil de Lauren (@poteto)](https://github.com/poteto): Software Engineer en xAI y React Compiler core team.
- [pstack](https://github.com/cursor/plugins/tree/main/pstack): experiencia de Lauren en Meta, Netflix y Cursor; origen y capacidades del plugin. La redacción del README sobre su trabajo en Cursor describe el contexto de origen; el cargo actual se toma de su perfil.
- [Grok Bot for Engineering, guía oficial](https://x.ai/bot/guides/grok-bot-for-engineering)
- [The Complete Guide to pstack Pt. 1, Lauren](https://x.com/poteto/status/2094457600259842065)
- [Dr Eggbot](https://x.ai/bot/93gOz3op1UQdBdbekQFLK)
- [Crear una verification skill](https://github.com/cursor/plugins/blob/main/pstack/skills/create-verification-skill/SKILL.md)
- [Mantener la verification skill](https://github.com/cursor/plugins/blob/main/pstack/skills/maintain-verification-skill/SKILL.md)
- [Build the Lever](https://github.com/cursor/plugins/blob/main/pstack/skills/principle-build-the-lever/SKILL.md)

El README de pstack identifica control-ui y control-cli como skills de cursor-team-kit. No se atribuyen a pstack.
