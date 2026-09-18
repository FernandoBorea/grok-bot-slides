# Verificación de Grok bot Slides

final result: passed

## Ajuste posterior: lectura independiente de la audiencia

- La audiencia entra en la slide activa y después conserva su selección y lectura. El avance del presentador no reemplaza la guía visible ni ejecuta el scroll al inicio.
- Barra fija con anterior/siguiente, posición de lectura, ubicación del presentador y botón **Ir al presentador**. Este botón salta una vez al punto en vivo, sin activar seguimiento automático posterior.
- Las opciones solo se habilitan cuando la slide visible coincide con la activa, la pregunta está abierta y la sesión sigue en vivo. Se conservan las respuestas propias históricas. Los totales solo aparecen en la slide activa cuando se publican.
- El envío identifica explícitamente el slug del formulario visible. La validación transaccional existente de local/Convex rechaza votos de otra slide, incluso si dos preguntas comparten IDs de opciones.

Verificación con Convex real y almacenamiento separado entre presentador LAN y audiencia localhost:

1. Presentador en slide 1 con encuesta abierta; visitante avanza a slide 2 y encuentra sus opciones deshabilitadas.
2. Visitante vuelve al presentador y responde Sí. Al avanzar el presentador, permanece en la slide 1 y su formulario queda bloqueado sin sustituir la lectura.
3. **Ir al presentador** abre la slide 2 y permite responder su pregunta al habilitarla. Al regresar a la slide 1 se conserva Sí como respuesta propia y no se muestran los totales de la slide 2.
4. Un lector situado en la slide 3 permanece allí cuando el presentador cambia a la 4. El botón en vivo lo lleva a la 4. Se puede seguir hasta la 6, donde siguiente queda deshabilitado; en la primera, anterior queda deshabilitado.
5. La guía real se abrió en un iframe de QA de 390 × 844 CSS px, evitando el problema previo del control externo de viewport. La barra midió 349 px y sus controles 324 px, sin desbordamiento. En 320 px se corrigió un desbordamiento de 4 px ocultando únicamente el icono decorativo del botón; ancho y scrollWidth finales de controles: 254 px, y del botón: 94 px. El espacio inferior de la guía reserva 140 px más el safe area para evitar contenido tapado al llegar al final.

Captura: `artifacts/audience-navigation-mobile.png`. El capturador del navegador reduce el contenido y deja margen exterior; se usó como inspección visual complementaria, no para una comparación de densidad 1:1. La navegación, el estado de controles y las medidas anteriores se comprobaron sobre el DOM real del iframe. La página temporal de QA se retiró tras la prueba. No se afirma una prueba en teléfono físico.

Build aprobado, 28 pruebas de Vitest y 4 del worker aprobadas (32 en total). La nueva regresión verifica que votos adelantados/tardíos no se atribuyan a otra pregunta con opciones idénticas y que cerrar la pregunta impida cambios. React Doctor: cinco advertencias de complejidad existentes, cero errores. Consola de audiencia sin errores ni warnings.

## Ajustes posteriores: tema y resultados proyectados

Las observaciones del usuario se implementaron sin modificar el backend ni la estructura de componentes de las slides:

- Selector sol/luna en la barra del presentador. Cambia los tokens del lienzo, las miniaturas y el panel de resultados; conserva los colores de la aplicación y de la guía móvil. La preferencia se guarda por deck. Se comprobó que se conserva al iniciar una sesión y al volver a abrir el deck.
- Ojos con relleno negro, `fillOpacity=1`, `opacity=1` y mezcla normal. Durante la comparación apareció un problema de pintado al declarar `color-scheme: dark` en el contenedor SVG; se retiró esa declaración innecesaria. La captura posterior muestra los ojos sólidos en ambos temas.
- Pregunta y resultados dentro de `presentation-area`, debajo del lienzo 16:9. Siempre se muestran en la proyección, con actualizaciones en vivo. El botón **Mostrar en móviles** controla únicamente su publicación en la guía del público. Se retiró el duplicado de resultados del panel de controles.

Evidencia final: `artifacts/projected-light-results.png` y `artifacts/projected-dark-results.png`, ambas de 2048 × 1152 px, comparadas juntas con el mismo estado: primera slide, pregunta abierta, una respuesta Sí. En modo de proyección, el panel queda dentro de la superficie ampliada y por encima de los controles. Una pregunta de cuatro opciones también se verificó sin desbordar su contenedor (alto visible y scrollHeight: 979 px; resultados terminan en y=1038 y controles empiezan en y=1099). La slide de contexto sin pregunta se inspeccionó en modo claro para comprobar superficie, texto secundario y cursor invertido.

Se envió un voto desde la vista del público conectada a Convex: la proyección pasó de 0 a 1 respuesta y Sí a 100%, mientras los resultados seguían sin publicarse en el móvil. Al avanzar, la siguiente pregunta mostró su propio conteo de 0. Consola del navegador sin errores ni warnings. Build y las 31 pruebas existentes aprobados; React Doctor conserva las cinco advertencias de complejidad previas, sin errores.

El panel dispone de distribución de una columna y encabezado apilado bajo 640 px. En esta revisión el control de viewport del navegador no aplicó el ancho solicitado; no se toma la captura obtenida como evidencia móvil. La comprobación móvil documentada abajo corresponde a la versión inicial; queda pendiente volver a comprobar visualmente este nuevo panel en un teléfono o viewport móvil efectivo.

## Alcance y referencias

La petición usa los pósteres como inspiración, no como una pantalla que copiar píxel a píxel. Se conservan el fondo negro, la tipografía sans de gran tamaño y los bots de colores. El formato de presentación es 16:9; la biblioteca, los controles y la guía móvil son superficies nuevas necesarias para el producto.

- Referencia principal: `image-1.png`, adjunta al brief original, 1380 × 1380 px.
- Referencias complementarias: `image-2.png`, 1350 × 1406 px, e `image-3.png`, 1416 × 1406 px, en la misma carpeta de adjuntos.
- Implementación: `http://localhost:4173/`, inspeccionada en el navegador integrado de Codex.
- Escritorio: `artifacts/presenter-desktop.png`, 1354 × 1025 px; primera slide de Engineering con pregunta abierta y resultados publicados. El canvas visible mide aproximadamente 1060 × 597 px, correspondiente a 16:9.
- Biblioteca: `artifacts/library-desktop-verified.png`, 1265 × 712 px; viewport CSS 1280 × 720, contenido de 1265 px por la barra de scroll. El navegador informa DPR 2, pero el capturador entrega una imagen normalizada a tamaño próximo a CSS, no un raster al doble. No se infiere fidelidad de píxeles a partir de esa diferencia.
- Móvil: `artifacts/audience-mobile.png`, 375 × 812 px, y `artifacts/audience-mobile-results.png`; viewport CSS 390 × 844 con contenido de 375 px y DPR 1. El capturador ajusta proporcionalmente el área visible. También se revisaron `artifacts/library-mobile.png` y `artifacts/presenter-mobile.png`.

La referencia principal y la captura del presentador se abrieron juntas en una misma entrada de comparación. Se comparó el contenido negro del canvas, excluyendo los controles de la aplicación y los márgenes blancos del póster. Dado el cambio deliberado de formato y contenido, la comparación evalúa dirección visual, jerarquía y legibilidad; no declara equivalencia geométrica 1:1. Los títulos, caras, preguntas y controles eran legibles en las capturas completas, por lo que no fue necesario generar recortes adicionales.

## Superficies visuales revisadas

- **Tipografía:** Arial/Helvetica en las slides aproxima la sans limpia de los pósteres; DM Sans con fallback en la aplicación. Los títulos conservan una jerarquía amplia, cortes de línea intencionales y peso regular. La guía móvil usa texto legible sin reducir la slide a una miniatura.
- **Espaciado:** canvas 16:9, márgenes constantes, miniaturas laterales en escritorio y controles adaptados en móvil. Sin desbordamiento horizontal en el viewport móvil inspeccionado. Los controles importantes permanecen accesibles mediante scroll normal.
- **Color:** negro, blanco, grises de apoyo y bots naranja, azul, turquesa y rosa. Se oscurecieron textos secundarios de la interfaz para corregir contraste insuficiente; los estados de pregunta y resultados tienen texto además del color.
- **Assets:** bots SVG derivados de la geometría real de `bloub`, como pidió el usuario, conservando procedencia y licencia. Son componentes de código editables, no reproducciones rasterizadas de los pósteres. Esta elección responde expresamente a la extracción solicitada. Caras opacas y centradas, sin halos ni deformaciones visibles. Iconos de Phosphor.
- **Contenido:** tres decks, doce componentes independientes y guías propias. La primera pregunta es «¿Quiénes han utilizado Grok bot?», con Sí/No. Se distinguen encuesta, selección múltiple y opción única. El estado sin backend dice «No ha sido configurado Convex».

## Historial de correcciones

1. **P2 — Caras débiles y desplazadas:** la primera adaptación tenía ojos demasiado discretos y proyección descentrada. Se ajustaron escala, centrado y relleno negro. La captura final del presentador muestra ojos nítidos y consistentes con las referencias.
2. **P2 — Texto secundario de bajo contraste:** se corrigieron los tokens de texto de la interfaz y se inspeccionaron nuevamente biblioteca, guía y resultados móviles.
3. **P2 — Estado al navegar:** volver a pulsar la miniatura activa cerraba la pregunta. Se convirtió en una operación sin cambios. Verificado con la pregunta abierta contra Convex.
4. **P2 — Seguimiento móvil:** al cambiar de slide la guía podía conservar el scroll anterior. Ahora vuelve al inicio; se comprobó durante el avance en vivo.
5. **P2 — Acciones con estado anterior:** los comandos de preguntas/resultados y los votos validan la slide esperada. Se verifica también que la sesión corresponda a la versión actual del deck antes de ofrecer controles.

Las capturas finales y el recorrido posterior a las correcciones no muestran hallazgos P0, P1 o P2 pendientes.

## Verificación funcional

- Biblioteca: búsqueda, estado vacío y apertura de los tres decks.
- Presentador: iniciar, miniaturas, anterior/siguiente, teclado, fullscreen, checkbox de pregunta, modal QR, publicación de resultados y finalización.
- Público: entrada sin registro, avatar persistente, guía sincronizada, respuesta Sí/No, selección múltiple, opción única y actualización del voto sin duplicar el conteo.
- Convex real: presentador en localhost y público en origen LAN con almacenamiento separado; recepción de votos, cambios de slide y cierre en tiempo real. Abrir la URL del presentador desde el otro origen no entrega permisos de control.
- Modo local: recorrido completo entre pestañas del mismo origen, sin requerir Convex.
- Sesión finalizada: votos bloqueados, última guía disponible y avatar conservado tras recargar.
- Build de producción: biblioteca y navegación entre slides comprobadas en `http://localhost:4175/`; consola sin warnings ni errores en esa pestaña. El preview temporal se cerró; permanece el servidor de desarrollo en 4173.
- Un error de contexto durante HMR se corrigió recargando al reemplazar el módulo del proveedor. El recorrido posterior funcionó correctamente.

## Comprobaciones automatizadas

- `npm run build`: aprobado, incluyendo TypeScript y preparación del worker.
- `npm test`: 27 pruebas aprobadas de reglas, transporte local, normalización de errores y funciones Convex.
- `npm run test:sites`: 4 pruebas aprobadas del fallback SPA y assets.
- `tsc --noEmit --project convex/tsconfig.json`: aprobado.
- `git diff --check`: aprobado.
- React Doctor: sin errores; quedan cinco advertencias de complejidad/mantenibilidad. El servicio de puntuación no estuvo disponible en la última ejecución, por lo que no se declara un score final.

## Límites y seguimiento

No se probó un teléfono físico ni se publicó el frontend en un dominio público. El comportamiento móvil se validó mediante viewport y navegación LAN. La prueba física puede usar el QR desde un teléfono en la misma Wi-Fi; en producción debe configurarse el origen público. El backend sí se verificó contra un deployment real de desarrollo.

El modo local sincroniza solamente pestañas del mismo origen y perfil. La documentación explica esta diferencia y cómo conectar copias del frontend al mismo Convex mediante workspaces y slugs. Las advertencias restantes de complejidad son seguimiento de mantenimiento, no bloqueos del recorrido probado.

## Checklist de entrega

- [x] Referencias y capturas abiertas y comparadas.
- [x] Tipografía, espaciado, color, assets y contenido revisados.
- [x] Correcciones visuales y funcionales verificadas.
- [x] Recorridos de presentador y público probados.
- [x] Build y 31 pruebas aprobados.
- [x] Instrucciones de configuración, variantes y procedencia documentadas.
- [x] Preview local conservado para el usuario.

## Actualización de plantillas — 18 de septiembre de 2026

La biblioteca ahora incluye, en el orden solicitado: Grok Bot 101, Grok Bot for Engineering, Grok Bot for Founders, Grok Bot for GTM, Grok Bot for Ops y Grok Bot for Research & Experiments. Engineering conserva sus seis slides; cada nueva plantilla tiene tres. Son 21 componentes de slide activos, con guías móviles y preguntas editables. Teams y Playground fueron sustituidos por este catálogo.

- Se verificaron los seis nombres, enlaces y el conteo de la biblioteca en el navegador; la búsqueda de Research devuelve su nueva plantilla.
- Se inspeccionaron las portadas y la composición del título largo de Research & Experiments. La navegación al ejercicio y el cambio de tema solo en las slides funcionan. Captura: `artifacts/research-template-light.png`.
- Los seis manifiestos pasaron `validateManifest`, con slugs de deck únicos.
- `npm run build`, 28 pruebas de Vitest y 4 del worker pasaron.
- React Doctor no reportó errores. Conserva cinco advertencias de complejidad y añade cuatro de JSX parecido entre plantillas: la repetición es intencional para mantener cada slide como componente independiente y editable, según el alcance pedido. El servicio de puntuación no estuvo disponible.
- Este cambio actualiza contenido y registro del frontend; no modifica la configuración ni las funciones de Convex.

## Corrección de proyección 16:9 — 18 de septiembre de 2026

Las preguntas ya no añaden altura debajo de un canvas 16:9. Toda la superficie proyectada mantiene 16:9 y, cuando hay encuesta, distribuye el componente original a la izquierda y los resultados a la derecha. El contenido conserva su propia proporción; el panel escala con el marco y respeta ambos temas. Se eliminó el ancho especial de las encuestas en pantalla completa.

- Comparación en modo de presentación: slides de 101 con y sin pregunta miden 2000 × 1125, ratio 1.7777779 en ambos casos.
- Vista previa con encuesta: 1140.12 × 641.31, ratio 1.7778 y sin scroll interno del panel.
- Engineering, slide de revisión: cuatro opciones largas visibles en modo claro, sin recortes. Captura: `artifacts/projection-16x9-light.png`.
- Vista móvil a 390 px: marco 352.90 × 198.50, ratio 1.77785 por redondeo subpíxel; cero desbordamiento horizontal o vertical del panel.
- El ajuste es CSS; no cambia el envío de votos, la navegación de audiencia ni las funciones de Convex.
- `npm run build` y `git diff --check` pasaron. React Doctor omite el análisis diferencial porque no cambiaron archivos React.
