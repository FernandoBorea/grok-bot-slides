# Personalizar Grok bot Slides

Cada slide es un componente React escrito a mano. El archivo `deck.ts` de cada carpeta en `src/decks/` ordena sus componentes y añade su guía móvil y pregunta opcional. El registro de `src/decks/index.ts` establece el orden de los seis decks de la biblioteca. No hay un esquema de layouts, un editor visual ni un motor de renderizado que debas extender.

## Crear una slide

Crea un archivo dentro de la carpeta de tu deck, por ejemplo `src/decks/mi-equipo/WelcomeSlide.tsx`:

```tsx
import { Bot } from "../../components/Bot";

export function WelcomeSlide() {
  return (
    <section className="slide-canvas">
      <div className="slide-eyebrow">Una sesión para construir juntos</div>
      <h1 className="slide-display">
        Hola, equipo<span className="slide-teal">.</span>
      </h1>
      <Bot
        className="slide-bot slide-corner-bot"
        shape="flower"
        color="#00b9aa"
        seed={42}
      />
      <div className="slide-footer">
        <span>Mi equipo</span>
        <span>01</span>
      </div>
    </section>
  );
}
```

El presentador envuelve el componente en `.slide-stage`, un contenedor 16:9. La proyección completa también mantiene 16:9: cuando hay una pregunta, el componente se centra en la columna izquierda conservando sus proporciones, y la encuesta ocupa la columna derecha. No agregues altura fuera del marco para los resultados. Los estilos de `src/decks/slides.css` usan unidades `cqw` para que texto y composición escalen con la slide, también en miniaturas. Puedes usar clases propias con prefijo `slide-` y escribir el JSX que necesites. Usa los tokens `--slide-bg`, `--slide-fg`, `--slide-muted`, `--slide-surface` y `--slide-border` para respetar el selector claro/oscuro. Los acentos textuales también tienen tokens; los cuerpos de los bots conservan sus colores y los ojos permanecen negros y opacos. El tema se limita a la proyección y las miniaturas, sin modificar la aplicación ni la guía móvil.

## Registrar un deck

En `src/decks/mi-equipo/deck.ts`, importa el componente y describe tu deck:

```tsx
import type { Deck } from "../types";
import { WelcomeSlide } from "./WelcomeSlide";

export const miEquipoDeck: Deck = {
  slug: "grok-bot-mi-equipo",
  title: "Grok Bot para mi equipo",
  description: "Una sesión práctica con nuestros propios ejemplos.",
  category: "Workshop",
  duration: "15 min",
  accent: "#00b9aa",
  slides: [
    {
      slug: "bienvenida",
      title: "Hola, equipo",
      kicker: "Antes de empezar",
      component: WelcomeSlide,
      guide: {
        intro: "Usa esta guía para seguir la sesión desde tu teléfono.",
        sections: [
          {
            title: "Tu punto de partida",
            body: "Piensa en una tarea repetitiva que te gustaría mejorar.",
          },
        ],
        takeaway:
          "Nos enfocaremos en una mejora pequeña que podamos comprobar.",
      },
      question: {
        id: "experiencia-inicial",
        prompt: "¿Ya has utilizado Grok bot?",
        type: "poll",
        options: [
          { id: "yes", label: "Sí" },
          { id: "no", label: "No" },
        ],
      },
    },
  ],
};
```

Después, importa `miEquipoDeck` desde `./mi-equipo/deck` en `src/decks/index.ts` y añádelo al array `decks` en la posición deseada. Se mostrará automáticamente en la biblioteca y estará disponible en `/deck/grok-bot-mi-equipo`. Para enlazar una slide de la vista previa usa `/deck/grok-bot-mi-equipo?slide=bienvenida`. Añadir una slide consiste en crear su componente y añadir otra entrada a `slides` en el `deck.ts` correspondiente; el orden del array es el de la presentación.

Los tipos están en `src/decks/types.ts` y `src/live/types.ts`. `component` recibe una referencia al componente, no un elemento como `<WelcomeSlide />`. Las guías y las preguntas son metadatos serializables; no incluyas funciones ni JSX dentro de `guide` o `question`.

## Diseñar para dos lecturas

La slide proyectada puede tener una frase grande, un diagrama o código. La guía móvil debe explicar la idea con contexto suficiente para acompañar a quien está escuchando:

- `title` y `kicker` identifican el momento de la presentación.
- `guide.intro` resume la idea principal.
- `guide.sections` añade pasos, ejemplos o explicación; es opcional.
- `guide.takeaway` guarda una conclusión o acción concreta; es opcional.
- `question` activa la participación en esa slide; omítelo si no hace falta.

Al entrar, el público abre la guía de `activeSlideSlug`. Después, cada persona conserva su slide y posición de lectura aunque el presentador avance. Puede navegar hacia atrás o adelante y usar **Ir al presentador** para saltar al punto en vivo; este botón no activa un avance automático posterior. No se envía el componente React de la slide a Convex ni se intenta mostrar una copia reducida de la presentación en el teléfono.

Al iniciar una sesión, la aplicación guarda una copia de estos metadatos en Convex o en el almacenamiento local. Los cambios posteriores en el código no reescriben ese contenido: inicia una sesión nueva después de editar el deck. Evita reemplazar el frontend de una presentación que esté en curso.

## Preguntas

| Tipo       | Comportamiento                                                                      |
| ---------- | ----------------------------------------------------------------------------------- |
| `poll`     | Encuesta con una sola opción por participante; por ejemplo Sí/No.                   |
| `single`   | Selección de una sola opción. No hay respuestas correctas ni puntuación automática. |
| `multiple` | Selección de una o varias opciones.                                                 |

Cada pregunta acepta entre 2 y 20 opciones con IDs únicos. `id` identifica la pregunta; cada opción tiene `id` y `label`. Conserva esos IDs cuando ajustes únicamente el texto. El participante puede actualizar su voto mientras esté abierta; reemplaza su respuesta anterior, no agrega otra.

El presentador controla el checkbox **Activar pregunta**. La pregunta y sus resultados se muestran a la derecha del contenido, dentro del mismo marco 16:9: se actualizan en tiempo real y permanecen visibles en pantalla completa. Las slides con y sin encuestas utilizan las mismas dimensiones de proyección. **Mostrar en móviles** y **Ocultar en móviles** controlan solamente su publicación en las guías del público. La pregunta empieza cerrada en una sesión nueva; avanzar a otra slide vuelve a cerrar la participación y ocultar los resultados en los móviles. La proyección conserva los votos de cada pregunta al regresar a ella. En el público, solo se habilita la respuesta cuando la slide leída coincide con `activeSlideSlug`, la pregunta está abierta y la sesión sigue en vivo. Cada envío incluye el slug de la slide leída: el backend rechaza votos adelantados o atrasados incluso si las opciones de dos preguntas comparten IDs. Los resultados agregados solo se muestran en la slide activa cuando se han publicado; las respuestas propias anteriores se conservan. El QR identifica la sesión, por eso basta escanearlo una vez.

## Slugs e identidad

Hay tres identificadores con funciones distintas:

| Identificador         | Ejemplo              | Alcance                                          |
| --------------------- | -------------------- | ------------------------------------------------ |
| `VITE_WORKSPACE_SLUG` | `equipo-diseno`      | Variante del frontend que comparte el backend.   |
| `deck.slug`           | `grok-bot-mi-equipo` | Deck y su ruta en la biblioteca.                 |
| `slide.slug`          | `bienvenida`         | Slide dentro de un deck y su navegación en vivo. |

Usa slugs de deck únicos en la biblioteca y slugs de slide únicos dentro de cada deck. Decks distintos pueden tener una slide llamada `bienvenida`. Para ambos usa letras minúsculas, números y guiones entre palabras, con un máximo de 100 caracteres. Conserva los slugs al corregir textos para mantener los enlaces existentes. Un deck puede tener entre 1 y 100 slides.

El workspace admite hasta 80 caracteres, con letras minúsculas, números y guiones, y debe empezar con una letra o un número. Usa un identificador estable por variante. Cambiarlo hace que ese frontend consulte otro grupo de sesiones.

## Compartir una variante con el mismo Convex

1. Copia o crea un fork del frontend y adapta sus componentes y metadatos.
2. Usa la misma `VITE_CONVEX_URL` del deployment que ya tiene publicadas las funciones compatibles de `convex/`.
3. Asigna un `VITE_WORKSPACE_SLUG` propio, por ejemplo `equipo-diseno`.
4. Configura `VITE_PUBLIC_URL` con el origen donde publicarás esa variante.
5. Compila y publica el frontend. Inicia una sesión nueva desde esa dirección y comparte su QR.

```dotenv
VITE_CONVEX_URL=https://deployment-compartido.convex.cloud
VITE_WORKSPACE_SLUG=equipo-diseno
VITE_PUBLIC_URL=https://slides-mi-equipo.example.com
```

La creación de contenido ocurre en el repositorio de cada variante; no hay que desplegar cambios del backend por editar una slide. Si necesitas cambiar `convex/`, coordina el despliegue con quien mantiene el proyecto compartido: ese cambio puede afectar a todas las variantes. Puedes mantener los mismos slugs de decks en workspaces distintos.

Los archivos `convex/_generated/api.*`, `server.*` y `dataModel.d.ts` están incluidos en el proyecto. Conserva estos archivos al compartir la variante: permiten compilar la demo sin un `.env.local`. Si modificas funciones o el esquema, deja que `npm run convex:dev` actualice las referencias y los tipos; no edites manualmente el código generado.

El workspace organiza sesiones, no controla permisos. La clave del presentador está en el almacenamiento del navegador que inició la sesión, nunca en el enlace público. Compartir la URL del presentador o cambiar de dominio no transfiere esa clave. En esta versión, la sesión no tiene inicio de sesión ni recuperación de acceso.

En modo local, el almacenamiento y la identidad se comparten solo entre pestañas del mismo origen y perfil de navegador. Un móvil no puede unirse a esa demostración; necesita el frontend accesible y Convex configurado. Cambiar `VITE_PUBLIC_URL` por sí solo no resuelve la sincronización.

Para probar en la misma Wi-Fi durante el desarrollo, abre `localhost` con Convex conectado: el QR sustituye ese host por una dirección LAN detectada automáticamente, si existe. Mantén Vite en ejecución y comprueba que el teléfono puede acceder a esa dirección. Si la detección elige otra interfaz, abre el frontend desde la dirección de red correcta o define `VITE_PUBLIC_URL`. Esta variable tiene prioridad y permite fijar el dominio del QR al publicar; el build de producción no incorpora una dirección LAN.

## Adaptar los bots

Usa `Bot` con `shape`, `color`, `seed`, `expression` y `className`. Las formas disponibles son `round`, `flower`, `square` y `triangle`. Un seed numérico fijo mantiene la misma variación al renderizar. El componente es SVG decorativo y estático.

La geometría se extrajo de **bloub**, el proyecto local que se había mencionado como Flow. Si redistribuyes el código, conserva `src/bot/LICENSE` y su atribución. Consulta [la procedencia y API de los bots](bot-origin.md) antes de modificar su geometría.

## Comprobar y publicar tu variante

```bash
npm run typecheck
npm test
npm run test:sites
npm run build
npm run preview
```

Revisa tu deck en vista previa, sus miniaturas y la guía del público a tamaño móvil. Inicia una sesión nueva, abre/cierra una pregunta, envía y actualiza una respuesta, cambia de slide y termina la sesión. Después de conectar o publicar tu variante, repite el flujo entre el navegador del presentador y un teléfono.

En la versión inicial se comprobó el flujo real con Convex remoto —creación, ingreso, votación, actualización, resultados y navegación— entre entornos de navegador con almacenamiento separado en `localhost` y la dirección LAN. Esa comprobación no incluyó un teléfono físico; valida el QR y la conectividad en los dispositivos que usarás durante la presentación.

Publica `dist/client` con fallback SPA a `index.html` para que funcionen los enlaces directos a `/deck/...`, `/present/...` y `/join/...`. La salida incluye también el worker de Sites en `dist/server/index.js`; en otro hosting configura el equivalente. Consulta [la publicación en el README](../README.md#publicar).

Las rutas programáticas están en `src/router.tsx`; la [documentación oficial de TanStack Router](https://tanstack.com/router/latest/docs/routing/code-based-routing) explica sus APIs. Para conectar y publicar el backend, consulta [Convex con React](https://docs.convex.dev/quickstart/react) y [hosting del frontend con Convex](https://docs.convex.dev/production/hosting/custom).
