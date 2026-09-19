# Grok bot Slides

Presentaciones en React con una guía móvil para explorar a tu ritmo y preguntas en vivo. Cada slide es su propio componente: puedes cambiar su diseño directamente, copiar un deck o compartir tu variante del proyecto.

El frontend usa **React 19, TypeScript, TanStack Router y Vite**. Es una SPA; no usa TanStack Start ni SSR. Convex conserva las sesiones y sincroniza a los participantes cuando está configurado. La biblioteca y el recorrido de demostración funcionan también sin Convex.

## Empezar

Requisitos: Node.js 22.12 o posterior y npm.

```bash
npm install
npm run dev
```

Abre la dirección que imprime Vite, normalmente `http://localhost:5173`. No hace falta crear un proyecto de Convex para explorar la biblioteca, presentar, abrir el QR o probar las preguntas.

El repositorio incluye los archivos generados de Convex en `convex/_generated/`, incluidas las referencias de API y los builders del servidor. Puedes clonar, instalar y compilar el proyecto sin configurar variables de entorno; en ese caso se utiliza el modo local. `npm run convex:dev` actualiza esos archivos al conectar o modificar el backend.

Sin `VITE_CONVEX_URL`, aparece **«No ha sido configurado Convex»**. El modo local guarda la sesión en el navegador y sincroniza pestañas del **mismo origen y perfil de navegador**. No conecta otros móviles, otros navegadores, perfiles privados ni direcciones distintas. Para probar, usa **Abrir vista del público** desde el modal del QR; verás una identidad de participante de prueba compartida por las pestañas de ese navegador.

## Qué incluye

| Deck                                | Slug                                    | Slides |
| ----------------------------------- | --------------------------------------- | -----: |
| Grok Bot 101                        | `grok-bot-101`                          |      3 |
| Grok Bot for Engineering            | `grok-bot-for-engineering`              |     12 |
| Grok Bot for Founders               | `grok-bot-for-founders`                 |     11 |
| Grok Bot for GTM                    | `grok-bot-for-gtm`                      |     11 |
| Grok Bot for Ops                    | `grok-bot-for-ops`                      |      3 |
| Grok Bot for Research & Experiments | `grok-bot-for-research-and-experiments` |      3 |

Los seis decks incluyen 35 slides con componentes React, guías móviles y preguntas editables. Engineering contiene doce slides para una charla de 15 minutos: presentación de Walter, SDLC, Dr Eggbot y roles, plugins y MCP, coordinación en grupo, Cursor Cloud Agents, Lauren y el origen de pstack, verification skills, tools propias y el ciclo de corrección de QA. Tiene preguntas solo en la apertura y el cierre. Los diagramas y las burbujas de conversación son componentes editables. Una app de tareas sirve de ejemplo genérico durante toda la charla, y cada bot mantiene su identidad visual. Las conversaciones y la posible falla de adjuntos son ilustrativas; no se muestran capturas de proyectos reales. GTM contiene once slides en español centradas en investigación comercial, seguimiento de cambios y preparación del siguiente paso con Grok Bot; el [guion de GTM](docs/gtm-talk.md) recoge tiempos y fuentes. Los demás decks parten de una bienvenida, un concepto y un ejercicio. Los metadatos viven en el `deck.ts` de cada carpeta; `src/decks/index.ts` establece el orden de la biblioteca. El [guion de Engineering](docs/engineering-talk.md) recoge los tiempos y las fuentes.

La vista del presentador muestra la slide 16:9, miniaturas, navegación por teclado, pantalla completa, guía y controles de participación. El botón de sol/luna cambia solo las slides y sus miniaturas entre claro y oscuro; la preferencia se guarda por deck en este navegador. Todas las proyecciones mantienen un marco 16:9. Las slides con preguntas distribuyen el contenido a la izquierda y la encuesta con sus resultados a la derecha, dentro de ese mismo marco, también en pantalla completa. La vista del público muestra texto pensado para leer en el teléfono, su avatar y la pregunta de la slide que está leyendo. Tiene navegación anterior/siguiente y un botón **Ir al presentador** para volver al punto en vivo sin que los cambios interrumpan la lectura. No necesita reproducir el diseño de la pantalla proyectada.

## Probar una presentación

1. Abre un deck y pulsa **Iniciar presentación**.
2. En una slide con pregunta, activa el checkbox **Activar pregunta**.
3. Pulsa **Mostrar QR** y abre la vista del público. Con Convex conectado, el público puede escanearlo desde sus teléfonos y recibe un nombre y un bot automáticamente, sin registro.
4. Envía una respuesta. Los resultados se actualizan automáticamente dentro de la slide. El botón **Mostrar en móviles** permite publicarlos también en los teléfonos; una respuesta puede actualizarse mientras la pregunta siga abierta.
5. Avanza con las miniaturas, los botones o las flechas del teclado. Cada visitante conserva su lugar y puede avanzar o retroceder por su cuenta. **Ir al presentador** salta a tu slide actual; no activa cambios automáticos posteriores. Solo se puede responder la pregunta de tu slide actual mientras la tengas abierta. Cada cambio de slide cierra la pregunta y oculta sus resultados en los móviles hasta que vuelvas a publicarlos. La proyección siempre conserva el conteo de la pregunta correspondiente.
6. Pulsa **Finalizar** para cerrar la sesión. El público conserva acceso a todas las guías y puede seguir navegando, pero ya no puede votar. Puedes iniciar una nueva sesión desde el mismo deck.

También funcionan Espacio para avanzar y Home/End para ir al principio/final, cuando el foco no está en un control interactivo.

## Conectar Convex

Crea `.env.local` a partir de `.env.example` si todavía no existe. Después ejecuta en una terminal:

```bash
npm run convex:dev
```

Sigue las instrucciones de la CLI para crear o seleccionar tu proyecto. El comando sincroniza el esquema y las funciones de `convex/` con el deployment de desarrollo. Configura el frontend en `.env.local`:

```dotenv
VITE_CONVEX_URL=https://tu-deployment.convex.cloud
VITE_WORKSPACE_SLUG=grok-bot-slides
VITE_PUBLIC_URL=
```

Conserva las variables que añada la CLI y reinicia `npm run dev` después de cambiar el archivo. La URL debe ser la del deployment de Convex, sin rutas, parámetros ni fragmentos. Si dejas la URL vacía, vuelves al modo local; una URL configurada cuyo backend no responde produce un error de conexión en la sesión.

La integración se comprobó contra un deployment remoto de Convex: creación de sesión, ingreso, votación, actualización de la sesión, publicación de resultados y navegación sincronizada. Se usaron entornos de navegador con almacenamiento separado, uno en `localhost` y otro en la dirección LAN. **No se ha probado en un teléfono físico.** El flujo de configuración sigue la [guía oficial de Convex para React y Vite](https://docs.convex.dev/quickstart/react).

### Variables del frontend

| Variable              | Uso                                                                                                                                                        |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_CONVEX_URL`     | URL del deployment compartido. Vacía activa el modo local.                                                                                                 |
| `VITE_WORKSPACE_SLUG` | Identificador de tu variante. Por defecto, `grok-bot-slides`; admite minúsculas, números y guiones, hasta 80 caracteres, empezando por letra o número.     |
| `VITE_PUBLIC_URL`     | Origen público del frontend para el QR, por ejemplo `https://slides.example.com`. Tiene prioridad sobre el origen actual y la detección LAN de desarrollo. |

Las variables `VITE_*` forman parte del frontend compilado. Después de cambiarlas en producción, vuelve a compilar y publicar. `VITE_PUBLIC_URL` solo cambia el destino del QR: no publica la aplicación ni conecta dispositivos por sí misma. Usa una dirección accesible para el público y servida con la misma configuración de Convex y workspace; `localhost` en un teléfono se refiere al propio teléfono.

En desarrollo, al abrir la aplicación desde `localhost` con Convex conectado, el QR usa automáticamente una dirección IPv4 LAN detectada en el equipo, si está disponible. Conecta el teléfono a la misma red Wi-Fi y mantén Vite en ejecución. Si la dirección detectada no es accesible, abre la aplicación con la dirección de red correcta de Vite o configura `VITE_PUBLIC_URL`. En modo local se mantiene el origen actual; en el build de producción no hay detección LAN y puedes fijar el dominio público con `VITE_PUBLIC_URL`.

## Sesiones y variantes

Cada presentación crea un ID de sesión nuevo y toma una copia de los metadatos, las guías y las preguntas del deck. El componente React permanece en el frontend. Después de editar contenido, inicia otra sesión para que la audiencia reciba la versión nueva.

La clave aleatoria del presentador se conserva en `localStorage` del navegador que inicia la sesión. El QR y las respuestas públicas de Convex no incluyen esa clave; las mutaciones de control la comprueban en el servidor. Copiar la URL del presentador a otro navegador no transfiere sus permisos. Borrar el almacenamiento o cambiar de origen pierde ese acceso; en esta versión no hay cuentas ni recuperación de sesiones. Cada participante guarda un token propio por sesión para conservar avatar y respuesta al recargar.

Varias copias del frontend pueden usar el **mismo deployment de Convex** con distintos `VITE_WORKSPACE_SLUG`. El slug organiza las sesiones de cada variante y no es una contraseña. La creación de sesiones es pública en este MVP. El modo local es una demostración: almacena todos sus datos en el navegador; la autoridad del servidor se aplica al usar Convex.

Consulta [cómo personalizar decks y compartir una variante](docs/customize.md) y [el modelo de Convex](convex/README.md).

## Comandos

| Comando                 | Resultado                                                                        |
| ----------------------- | -------------------------------------------------------------------------------- |
| `npm run dev`           | Servidor Vite accesible en la red local.                                         |
| `npm run typecheck`     | Comprobación TypeScript sin generar archivos.                                    |
| `npm test`              | Pruebas de Vitest.                                                               |
| `npm run test:sites`    | Pruebas del fallback SPA del worker de hosting.                                  |
| `npm run build`         | TypeScript, compilación Vite en `dist/client` y preparación del worker de Sites. |
| `npm run preview`       | Vista local del build; no publica la aplicación.                                 |
| `npm run convex:dev`    | Configura/sincroniza el backend de desarrollo.                                   |
| `npm run convex:deploy` | Despliega las funciones y el esquema al backend de producción seleccionado.      |

## Publicar

### Vercel

El archivo `vercel.json` configura Vite, la salida `dist/client` y las rutas de la SPA para que los enlaces a decks, sesiones y guías funcionen también al recargar. Los assets inexistentes conservan una respuesta 404.

Configura en el proyecto de Vercel las variables `VITE_CONVEX_URL`, `VITE_WORKSPACE_SLUG` y `VITE_PUBLIC_URL` antes de compilar. Para este frontend, el dominio previsto es `https://slides.ailabs.sv`. `VITE_CONVEX_URL` debe apuntar al deployment que quieras utilizar; publicar el frontend no modifica ni despliega el backend de Convex.

```bash
vercel link --project grok-bot-slides
vercel --prod
```

Conecta el repositorio desde `vercel git connect` si quieres publicar automáticamente los siguientes cambios de `main`. Las variables locales y la vinculación de `.vercel/` se excluyen del repositorio.

### Backend y otros proveedores

Despliega el backend con `npm run convex:deploy`. Configura `VITE_CONVEX_URL` con su URL de **producción**, junto con el workspace y el origen público, antes de ejecutar `npm run build`.

El frontend estático está en `dist/client`. El hosting debe servir `index.html` para las rutas de la aplicación, como `/deck/grok-bot-for-engineering`, `/present/...` y `/join/...`, incluso al abrirlas directamente o recargar. Conserva los 404 para assets que no existen. La configuración incluida para Sites añade `dist/server/index.js` con ese fallback; otro hosting debe configurar una reescritura SPA equivalente. La aplicación espera publicarse en la raíz de su dominio.

También puedes compilar con la URL de producción inyectada por la CLI:

```bash
npm run convex:deploy -- --cmd 'npm run build'
```

Después publica el frontend generado en tu hosting. Desplegar Convex no publica la web. Este proceso está descrito en la [documentación oficial de hosting de Convex](https://docs.convex.dev/production/hosting/custom).

## Estructura y procedencia

- `src/decks/`: componentes de slides, registro de decks, guías y preguntas.
- `src/pages/`: biblioteca, presentador y público.
- `src/router.tsx`: rutas de TanStack Router, definidas en código.
- `src/live/`: contrato de sesión, reglas y transportes local/Convex.
- `convex/`: esquema y funciones de sesiones, participantes y votos.
- `convex/_generated/`: referencias de API, tipos y builders generados por la CLI; están incluidos para que la demo local compile sin configuración adicional.
- `src/bot/` y `src/components/Bot.tsx`: geometría de bots y componente SVG estático.

Los bots se extrajeron del proyecto local **bloub**, referido como Flow en el pedido original. Se conservó su geometría y licencia MIT, sin importar el editor ni su motor de animación/renderizado. La extracción está documentada en [Procedencia de los bots](docs/bot-origin.md).

Las rutas usan las APIs `createRootRoute`, `createRoute` y `createRouter` de [TanStack Router con rutas definidas en código](https://tanstack.com/router/latest/docs/routing/code-based-routing).
