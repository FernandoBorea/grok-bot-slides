import type { Deck } from "../types";
import {
  FoundersTitleSlide,
  AndySlide,
  DosModosSlide,
  LoopsSlide,
  AvanzadoSlide,
  CerebroSlide,
  ConstruirSlide,
  PodSlide,
  PruebaSlide,
  ForLoopSlide,
  CierreSlide,
} from "./FoundersSlides";

export const foundersDeck: Deck = {
  slug: "grok-bot-for-founders",
  title: "Grok Bot for Founders",
  description:
    "De la operación al prototipo en una sola mesa: EA, procesos, cerebro compartido y un equipo para construir.",
  category: "Founders",
  duration: "15 min",
  accent: "#ff2c9c",
  slides: [
    {
      slug: "titulo",
      title: "Grok Bot for Founders",
      kicker: "Apertura · 0:45",
      component: FoundersTitleSlide,
      guide: {
        intro:
          "Cómo usar Grok Bot para hacer crecer tu empresa: de la operación al prototipo en una sola mesa.",
        sections: [
          {
            title: "El arco",
            body: "Primero operar con Andy. Después definir flujos. Luego compartir contexto. Al final, construir con el mismo cerebro.",
          },
        ],
        takeaway:
          "Operar y construir pueden vivir en la misma mesa si el contexto es compartido.",
      },
    },
    {
      slug: "andy",
      title: "Andy: tu EA en Grok Bot",
      kicker: "Tu EA · 1:15",
      component: AndySlide,
      guide: {
        intro:
          "Andy es tu executive assistant: un bot que te ayuda a manejar las operaciones del día a día.",
        sections: [
          {
            title: "Qué sostiene",
            body: "Revisa correos, prepara el día en el calendario y avisa si las agendas chocan. Corre rutinas que vos definís una vez.",
          },
          {
            title: "Por qué importa la cara",
            body: "Una identidad estable hace que el equipo trate al bot como un rol, no como un prompt descartable.",
          },
        ],
        takeaway: "Empezá por un EA con responsabilidades claras.",
      },
    },
    {
      slug: "dos-modos",
      title: "Pedir cosas vs definir procesos",
      kicker: "Modos · 1:15",
      component: DosModosSlide,
      guide: {
        intro:
          "Hay dos formas de usar el bot: pedirle cosas sueltas o definir procesos que pueda repetir. El segundo escala.",
        sections: [
          {
            title: "Sólo le pido cosas",
            body: "Cada pedido es nuevo. Vos recordás el contexto. Para escalar, terminás repitiendo el proceso desde otro lugar.",
          },
          {
            title: "Procesos definidos",
            body: "El contexto vive en el SOP. El flujo se reusa y mejora cada vez que se usa.",
          },
        ],
        takeaway: "Si querés escala, diseñá el proceso, no el próximo prompt.",
      },
    },
    {
      slug: "loops-que-pagan",
      title: "Flujos que te devuelven el tiempo",
      kicker: "Correos + agendas · 1:30",
      component: LoopsSlide,
      guide: {
        intro:
          "Un proceso, dos flujos: correos y agendas corren el mismo pipeline y vuelven al inicio.",
        sections: [
          {
            title: "El pago",
            body: "Diseñás el proceso una vez. Andy lo corre. El reporte cierra el loop.",
          },
          {
            title: "Nota al hablar",
            body: "El valor está en diseñar el proceso, no en pedir favores sueltos.",
          },
        ],
        takeaway: "Diseñar el proceso > pedir favores.",
      },
    },
    {
      slug: "lo-mas-avanzado",
      title: "Un solo asistente no alcanza",
      kicker: "Límite · 1:00",
      component: AvanzadoSlide,
      guide: {
        intro:
          "Cuando el trabajo cruza herramientas, un asistente solo pierde el hilo. La solución es contexto compartido.",
        sections: [
          {
            title: "El límite",
            body: "Correo, docs, deploy y base de datos no caben en una conversación aislada.",
          },
          {
            title: "La solución",
            body: "Decisiones, briefs y estado tienen que vivir fuera del chat.",
          },
        ],
        takeaway: "El trabajo entre herramientas.",
      },
    },
    {
      slug: "cerebro-compartido",
      title: "Un espacio de trabajo compartido",
      kicker: "Cerebro · 1:30",
      component: CerebroSlide,
      guide: {
        intro:
          "Un espacio de trabajo compartido entre herramientas: tipos de contenido arriba, stack abajo.",
        sections: [
          {
            title: "El mapa",
            body: "Operación, productos, decisiones y notas. Se llena con el trabajo real.",
          },
          {
            title: "Las herramientas",
            body: "Notion, Vercel, Neon, Cloudflare y Google Workspace sostienen el loop.",
          },
        ],
        takeaway: "Mapa de conocimiento + herramientas, no un producto terminado.",
      },
    },
    {
      slug: "y-construir",
      title: "¿Qué más es posible?",
      kicker: "Construir · 1:00",
      component: ConstruirSlide,
      guide: {
        intro:
          "Con el mismo operador y el mismo contexto pasás de operar a construir.",
        sections: [
          {
            title: "La secuencia",
            body: "Operar con Andy. Contexto compartido. Después construir.",
          },
        ],
        takeaway: "Operar, contexto, construir: misma mesa.",
      },
    },
    {
      slug: "el-pod",
      title: "El equipo de trabajo",
      kicker: "Equipo · 1:30",
      component: PodSlide,
      guide: {
        intro:
          "Harvey specs, Tej research, Mike y Letty build, Chuck reviews. Andy y Marie alimentan a Harvey. Vos decidís y hacés merge.",
        sections: [
          {
            title: "El flujo",
            body: "No es un org chart de autonomía. Es un loop de trabajo con roles claros.",
          },
          {
            title: "Identidades",
            body: "Misma cara, forma y color a lo largo del deck. Borea no aparece acá.",
          },
        ],
        takeaway: "Roles claros, decisión humana.",
      },
    },
    {
      slug: "prueba-en-pantalla",
      title: "Prueba en pantalla",
      kicker: "Capturas · 1:00",
      component: PruebaSlide,
      guide: {
        intro:
          "Dos capturas reales del prototipo: admin overview y portfolio lab.",
        sections: [
          {
            title: "Qué mirar",
            body: "Mostrá el flujo principal y el lab, no una galería entera.",
          },
        ],
        takeaway: "La evidencia en pantalla cierra el argumento del equipo.",
      },
    },
    {
      slug: "el-for-de-construir",
      title: "El for de construir",
      kicker: "Ritmo · 1:00",
      component: ForLoopSlide,
      guide: {
        intro:
          "Construir es un for: counter, ¿seguimos?, Registrar. El cuerpo es Código.",
        sections: [
          {
            title: "Lectura",
            body: "Counter marca la repetición. Registrar deja evidencia. Código es el trabajo en lenguaje claro.",
          },
        ],
        takeaway: "El ritmo importa más que la sintaxis.",
      },
    },
    {
      slug: "cierre",
      title: "Atrévete a construir",
      kicker: "Cierre · 0:45",
      component: CierreSlide,
      guide: {
        intro:
          "Operá. Definí el proceso. Compartí el cerebro. Después, prototipá en la misma mesa.",
        takeaway: "Atrévete a construir.",
      },
    },
  ],
};
