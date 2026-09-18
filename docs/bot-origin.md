# Procedencia de los bots

Los bots de Grok bot Slides reutilizan la geometría de **bloub**. Su
`package.json` y su README lo identifican como `bloub`; Flow fue el nombre
utilizado para referirse al proyecto durante la extracción.

Fuente original: [Jérémy Perret / bloub](https://github.com/jeremy-prt/bloub).
Revisión local al extraer: `b4bb3c1b5f93c7b87a2e8d620f667c4093d97749`.
Copyright (c) 2026 Jérémy Perret. El texto completo de la licencia MIT se conserva
en [`src/bot/LICENSE`](../src/bot/LICENSE). La licencia cubre el código; los nombres
Grok y x.ai y el diseño visual original pertenecen a sus respectivos titulares.

## Código extraído

- `src/bot/geometry.ts`: funciones de `bloub/src/bot/shape.ts`: muestreo radial de
  64 puntos, proyección del contorno, curvas Catmull–Rom, superelipses, polígonos
  redondeados, unión radial de círculos, interpolación radial y cápsulas.
- `src/bot/face.ts`: proyección ortográfica de los ojos sobre una esfera y las
  medidas originales: separación de 15.46°, ancho 0.186, alto 0.412, mirada
  `yaw: 28.49, pitch: 28.62, roll: -13`.
- `src/bot/expressions.ts`: las 16 expresiones de reposo originales. Se retiró
  únicamente la interpolación temporal y la dependencia de tipos del motor.
- `src/bot/model.ts`: adaptador estático. Conserva el perfil circular, el
  squircle (`superellipseProfile(4.2)` normalizado a 1.15) y el triángulo
  (`regularPolygonProfile(3, 1.12, 0.34, -90)`) del personalizador original.
  La flor adapta la construcción original de unión de círculos a seis pétalos.
  La matriz tangente de los ojos sigue `bloub/src/bot/engine.ts`. Para seguir las
  referencias visuales de estas slides, la pose neutra mira al centro y las
  cápsulas aumentan 1.3 veces su tamaño. Un ajuste estático traslada ambos ojos
  juntos hacia el centro si el contorno es estrecho.

No se importan Vue, GSAP, Hyperframes, el editor, el motor de animaciones ni los
servicios de renderizado y exportación. El repositorio de origen queda intacto.

## Componente React

```tsx
import { Bot } from "./components/Bot";

<Bot shape="flower" color="#d0ef7b" expression="curious" seed={12} />;
```

API: `seed?: number`, `color?: string`, `shape?: 'round' | 'flower' | 'square' |
'triangle'`, `className?: string`, `expression?: string`.

La forma por defecto es `round`; el color es `currentColor`. El seed introduce
una pequeña variación determinista en la mirada. `expression` acepta los IDs
originales y los alias `neutral`, `attentive`, `happy`, `curious`, `surprised`,
`sleepy`, `excited`, `thinking` y `wink`; los valores desconocidos usan la
expresión neutra. `wink` representa la asimetría de ojos `mefiant` original.

El SVG ocupa su contenedor y es decorativo (`aria-hidden`). Los ojos usan negro
sólido (`#050505`) para conservar su color cuando se superponen bots. No hay timers,
bucles de animación ni listeners: la ilustración permanece inmóvil, incluyendo
cuando el usuario solicita movimiento reducido. El componente es compatible con
el render de React sin identificadores SVG compartidos entre instancias.

## Verificación de la extracción

Se compararon directamente los paths resultantes del círculo, el cuadrado y el
triángulo con `shape.ts` y `skins.ts` del proyecto original: son idénticos. La
proyección de ojos también coincide con `face.ts`. Se comprobaron 256
combinaciones de forma, expresión y seed para asegurar geometría finita y
determinista, incluyendo un seed inválido. Los módulos geométricos pasan
TypeScript en modo estricto.
