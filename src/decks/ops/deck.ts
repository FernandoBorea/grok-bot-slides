import type { Deck } from "../types";
import { OpsWelcomeSlide } from "./OpsWelcomeSlide";
import { ProcessMapSlide } from "./ProcessMapSlide";
import { ProcessExerciseSlide } from "./ProcessExerciseSlide";

export const opsDeck: Deck = {
  slug: "grok-bot-for-ops",
  title: "Grok Bot for Ops",
  description:
    "Plantilla para documentar procesos, revisar tareas repetitivas y probar una mejora con Grok Bot.",
  category: "Ops",
  duration: "15 min",
  accent: "#00b9aa",
  slides: [
    {
      slug: "bienvenida",
      title: "Grok Bot for Ops",
      kicker: "Bienvenida · Plantilla",
      component: OpsWelcomeSlide,
      guide: {
        intro:
          "Esta plantilla propone empezar por una tarea operativa pequeña. Vamos a describir cómo funciona y preparar una mejora que podamos comprobar.",
        sections: [
          {
            title: "Trae una rutina",
            body: "Puede ser preparar un reporte, recibir una solicitud o revisar una entrega. Elige algo cuyo inicio y final puedas explicar.",
          },
        ],
        takeaway:
          "Explora a tu ritmo. Usa «Ir al presentador» para volver a la slide en vivo.",
      },
      question: {
        id: "ops-recurring-task",
        prompt: "¿Tienes una tarea que repites cada semana?",
        type: "poll",
        options: [
          { id: "yes", label: "Sí, ya tengo una en mente" },
          { id: "not-yet", label: "Todavía no identifico una" },
        ],
      },
    },
    {
      slug: "mapear-el-proceso",
      title: "Del paso repetido al proceso claro",
      kicker: "Entrada · Decisión · Salida",
      component: ProcessMapSlide,
      guide: {
        intro:
          "Describe el proceso actual antes de pedir una automatización. Un mapa sencillo permite encontrar pasos ambiguos y revisar la propuesta del bot.",
        sections: [
          {
            title: "Entrada",
            body: "Anota qué dispara la tarea, qué información llega y dónde encuentras los datos que faltan.",
          },
          {
            title: "Decisión",
            body: "Explica las reglas que sigues, las excepciones conocidas y la persona que puede resolver cada duda.",
          },
          {
            title: "Salida",
            body: "Define la entrega, quién la recibe y qué revisión necesita. Incluye una señal concreta de que la tarea terminó.",
          },
        ],
        takeaway:
          "Plantilla: cuando llega [entrada], hacemos [pasos], revisamos [reglas] y entregamos [salida].",
      },
    },
    {
      slug: "mejorar-un-paso",
      title: "Mejora un paso",
      kicker: "Ejercicio · 5 minutos",
      component: ProcessExerciseSlide,
      guide: {
        intro:
          "Usa un ejemplo ficticio o anonimizado de tu rutina. Pide al bot una checklist que otra persona pueda seguir sin contexto adicional.",
        sections: [
          {
            title: "Describe",
            body: "Escribe el inicio, los pasos y la entrega. Señala dónde suele aparecer una demora, una duda o un error.",
          },
          {
            title: "Prepara",
            body: "Pide una checklist breve con responsables y criterios de revisión. Ajusta cualquier supuesto que no corresponda a tu proceso.",
          },
          {
            title: "Comprueba",
            body: "Recorre un caso habitual y otro con información incompleta. Anota qué debe resolverse antes de usar la checklist en una tarea real.",
          },
        ],
        takeaway:
          "Entrega del ejercicio: una checklist y una excepción que ya sabes cómo manejar.",
      },
      question: {
        id: "ops-first-improvement",
        prompt: "¿Qué mejoraría más tu proceso?",
        type: "single",
        options: [
          { id: "inputs", label: "Recibir mejor la información" },
          { id: "steps", label: "Aclarar los pasos" },
          { id: "exceptions", label: "Resolver excepciones" },
          { id: "review", label: "Revisar la entrega" },
        ],
      },
    },
  ],
};
