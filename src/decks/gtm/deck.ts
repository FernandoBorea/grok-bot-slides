import type { Deck } from "../types";
import { GtmWelcomeSlide } from "./GtmWelcomeSlide";
import { MessageContextSlide } from "./MessageContextSlide";
import { MessageExerciseSlide } from "./MessageExerciseSlide";

export const gtmDeck: Deck = {
  slug: "grok-bot-for-gtm",
  title: "Grok Bot for GTM",
  description:
    "Plantilla para explorar audiencias, preparar mensajes y diseñar una prueba pequeña con Grok Bot.",
  category: "GTM",
  duration: "15 min",
  accent: "#ff2c9c",
  slides: [
    {
      slug: "bienvenida",
      title: "Grok Bot for GTM",
      kicker: "Bienvenida · Plantilla",
      component: GtmWelcomeSlide,
      guide: {
        intro:
          "Esta plantilla propone un primer ejercicio de go-to-market: convertir lo que sabes de una audiencia en un mensaje que puedas revisar y probar.",
        sections: [
          {
            title: "Trae un caso",
            body: "Elige un producto, una audiencia y un canal. Puedes usar un ejemplo ficticio para completar la práctica.",
          },
        ],
        takeaway:
          "Explora a tu ritmo. Usa «Ir al presentador» para volver a la slide en vivo.",
      },
      question: {
        id: "gtm-starting-point",
        prompt: "¿Dónde te gustaría probar Grok Bot en GTM?",
        type: "multiple",
        options: [
          { id: "audience", label: "Entender una audiencia" },
          { id: "messages", label: "Preparar mensajes" },
          { id: "campaigns", label: "Explorar ideas de campaña" },
          { id: "experiments", label: "Diseñar una prueba" },
        ],
      },
    },
    {
      slug: "contexto-del-mensaje",
      title: "Antes del copy, la persona",
      kicker: "Audiencia · Evidencia · Acción",
      component: MessageContextSlide,
      guide: {
        intro:
          "Dale al bot un contexto concreto antes de pedir un mensaje. Así tendrás criterios para revisar las propuestas.",
        sections: [
          {
            title: "Audiencia",
            body: "Describe a quién quieres llegar, la situación que está viviendo y el problema que quiere resolver. Separa lo que sabes de tus suposiciones.",
          },
          {
            title: "Evidencia",
            body: "Incluye ejemplos, resultados o características verificables. Revisa que el borrador no agregue promesas que no puedas sostener.",
          },
          {
            title: "Acción",
            body: "Define un siguiente paso: responder una pregunta, revisar una demo o registrarse para una prueba. Ajusta el tono y la extensión al canal.",
          },
        ],
        takeaway:
          "Plantilla: escribe para [audiencia], sobre [problema], con [evidencia], para invitar a [acción].",
      },
    },
    {
      slug: "probar-un-mensaje",
      title: "Escribe. Compara.",
      kicker: "Ejercicio · 5 minutos",
      component: MessageExerciseSlide,
      guide: {
        intro:
          "Prepara dos versiones de un mismo mensaje. Usa la misma audiencia y el mismo objetivo para poder comparar los enfoques.",
        sections: [
          {
            title: "Enmarca",
            body: "Escribe la audiencia, el canal y la acción esperada. Añade un ejemplo real o ficticio de tu propuesta.",
          },
          {
            title: "Compara",
            body: "Pide dos enfoques y explica qué cambia entre ellos. Revisa claridad, exactitud y el siguiente paso antes de elegir uno.",
          },
          {
            title: "Define una prueba",
            body: "Anota qué respuesta observarías para aprender si el mensaje se entiende. Deja la publicación o el envío para cuando el equipo lo revise.",
          },
        ],
        takeaway:
          "Entrega del ejercicio: dos borradores y una hipótesis para evaluar.",
      },
      question: {
        id: "gtm-message-review",
        prompt: "¿Qué parte de tu mensaje necesita más trabajo?",
        type: "single",
        options: [
          { id: "audience", label: "La audiencia" },
          { id: "value", label: "La propuesta de valor" },
          { id: "evidence", label: "La evidencia" },
          { id: "action", label: "El siguiente paso" },
        ],
      },
    },
  ],
};
