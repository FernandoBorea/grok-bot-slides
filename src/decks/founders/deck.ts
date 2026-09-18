import type { Deck } from "../types";
import { FoundersWelcomeSlide } from "./FoundersWelcomeSlide";
import { IdeaToQuestionSlide } from "./IdeaToQuestionSlide";
import { SmallestTestSlide } from "./SmallestTestSlide";

export const foundersDeck: Deck = {
  slug: "grok-bot-for-founders",
  title: "Grok Bot for Founders",
  description:
    "Una plantilla para aclarar un problema, reconocer supuestos y preparar una prueba pequeña.",
  category: "Founders",
  duration: "15 min",
  accent: "#ff2c9c",
  slides: [
    {
      slug: "bienvenida",
      title: "Grok Bot for Founders",
      kicker: "Bienvenida",
      component: FoundersWelcomeSlide,
      guide: {
        intro:
          "En esta sesión vamos a usar Grok Bot para ordenar una idea y preparar una forma sencilla de poner a prueba uno de sus supuestos.",
        sections: [
          {
            title: "Trae una idea",
            body: "Elige una situación que hayas observado o una pregunta de tu proyecto. Separa lo que ya viste de lo que todavía imaginas.",
          },
        ],
        takeaway:
          "El objetivo de la práctica es definir qué aprender antes de invertir más esfuerzo.",
      },
      question: {
        id: "founders-starting-point",
        prompt: "¿En qué punto está la idea que traes hoy?",
        type: "single",
        options: [
          { id: "problem", label: "Explorando un problema" },
          { id: "prototype", label: "Preparando un prototipo" },
          { id: "feedback", label: "Aprendiendo de usuarios" },
        ],
      },
    },
    {
      slug: "de-la-idea-a-la-pregunta",
      title: "De una idea a una pregunta",
      kicker: "Problema y supuestos",
      component: IdeaToQuestionSlide,
      guide: {
        intro:
          "Describe a quién afecta el problema, cuándo ocurre y qué parte de tu explicación todavía necesita evidencia.",
        sections: [
          {
            title: "Problema",
            body: "Cuenta una situación concreta. Incluye cómo la persona la resuelve hoy y qué dificultad observaste.",
          },
          {
            title: "Supuesto",
            body: "Pide al bot que identifique los supuestos de tu propuesta. Elige uno que, si resulta falso, cambiaría lo que harías después.",
          },
          {
            title: "Señal",
            body: "Define qué comportamiento o evidencia te ayudaría a revisar ese supuesto. Las respuestas del bot sirven como borrador, no como evidencia de usuarios.",
          },
        ],
        takeaway:
          "Convierte una afirmación amplia en una pregunta que puedas investigar.",
      },
    },
    {
      slug: "una-prueba-pequena",
      title: "Una hipótesis, una prueba pequeña",
      kicker: "Práctica · 5 minutos",
      component: SmallestTestSlide,
      guide: {
        intro:
          "Elige un supuesto y usa Grok Bot para preparar una prueba acotada. Define qué mostrarás o preguntarás y qué observarás.",
        sections: [
          {
            title: "Prepara",
            body: "Puedes bosquejar una interacción, redactar preguntas para una entrevista o preparar una demostración breve. Revisa el material antes de compartirlo.",
          },
          {
            title: "Decide qué registrar",
            body: "Escribe una señal que apoyaría tu hipótesis y otra que la cuestionaría. Guarda los resultados observados separados de tus interpretaciones.",
          },
        ],
        takeaway:
          "Cierra con un siguiente paso basado en lo que aprendiste, aunque sea cambiar la pregunta.",
      },
      question: {
        id: "founders-test-choice",
        prompt: "¿Qué prueba te ayudaría a aprender primero?",
        type: "single",
        options: [
          { id: "interview", label: "Una conversación con un usuario" },
          { id: "sketch", label: "Un boceto de la solución" },
          { id: "demo", label: "Una demostración breve" },
        ],
      },
    },
  ],
};
