import type { Deck } from "../types";
import { ContextBasicsSlide } from "./ContextBasicsSlide";
import { FirstPromptSlide } from "./FirstPromptSlide";
import { IntroWelcomeSlide } from "./IntroWelcomeSlide";

export const introDeck: Deck = {
  slug: "grok-bot-101",
  title: "Grok Bot 101",
  description:
    "Una introducción para formular tu primera pregunta, aportar contexto y revisar lo que recibes.",
  category: "101",
  duration: "15 min",
  accent: "#1688ff",
  slides: [
    {
      slug: "bienvenida",
      title: "Grok Bot 101",
      kicker: "Bienvenida",
      component: IntroWelcomeSlide,
      guide: {
        intro:
          "Esta plantilla propone una primera sesión con Grok Bot: partir de una tarea pequeña, escribir un pedido claro y revisar el resultado.",
        sections: [
          {
            title: "Tu punto de partida",
            body: "Piensa en una tarea cotidiana que puedas explicar con un ejemplo. La usaremos durante la práctica.",
          },
        ],
        takeaway:
          "Puedes recorrer la guía a tu ritmo. Usa «Ir al presentador» para volver a la slide en vivo.",
      },
      question: {
        id: "intro-used-grok-bot",
        prompt: "¿Has utilizado Grok Bot antes?",
        type: "poll",
        options: [
          { id: "yes", label: "Sí" },
          { id: "no", label: "Todavía no" },
        ],
      },
    },
    {
      slug: "objetivo-contexto-resultado",
      title: "Objetivo, contexto y resultado",
      kicker: "Primeros pasos",
      component: ContextBasicsSlide,
      guide: {
        intro:
          "Un pedido útil explica qué quieres lograr, qué información debe tenerse en cuenta y qué forma debería tener la respuesta.",
        sections: [
          {
            title: "Objetivo",
            body: "Describe una tarea concreta y quién usará el resultado. Por ejemplo: resumir unas notas para compartirlas con tu equipo.",
          },
          {
            title: "Contexto",
            body: "Incluye un ejemplo, la información disponible y las restricciones relevantes. Señala lo que todavía no sabes.",
          },
          {
            title: "Resultado",
            body: "Pide un formato que puedas revisar. Comprueba los datos y los supuestos antes de usar la respuesta.",
          },
        ],
        takeaway:
          "Si algo no encaja, identifica qué falta y reformula una parte del pedido.",
      },
    },
    {
      slug: "tu-primer-experimento",
      title: "Tu primer experimento",
      kicker: "Práctica · 5 minutos",
      component: FirstPromptSlide,
      guide: {
        intro:
          "Elige una tarea breve y escribe un primer pedido. Después agrega contexto o un ejemplo y compara ambas respuestas.",
        sections: [
          {
            title: "Prueba",
            body: "Puedes resumir unas notas de ejemplo, aclarar un concepto o preparar un borrador. Mantén el alcance lo bastante pequeño para revisar todo el resultado.",
          },
          {
            title: "Comparte",
            body: "Cuenta qué cambiaste en el pedido y qué mejoró en la respuesta. Guarda también una limitación que encontraste.",
          },
        ],
        takeaway:
          "Conserva el pedido y tu criterio de revisión para repetir la práctica con otra tarea.",
      },
      question: {
        id: "intro-first-task",
        prompt: "¿Con qué tarea quieres empezar?",
        type: "single",
        options: [
          { id: "summary", label: "Resumir unas notas" },
          { id: "explanation", label: "Entender un concepto" },
          { id: "draft", label: "Preparar un borrador" },
        ],
      },
    },
  ],
};
