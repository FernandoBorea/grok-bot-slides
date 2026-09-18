import type { Deck } from "../types";
import { ResearchWelcomeSlide } from "./ResearchWelcomeSlide";
import { HypothesisSlide } from "./HypothesisSlide";
import { ExperimentSlide } from "./ExperimentSlide";

export const researchDeck: Deck = {
  slug: "grok-bot-for-research-and-experiments",
  title: "Grok Bot for Research & Experiments",
  description:
    "De una pregunta a un experimento. Una plantilla para explorar ideas, contrastar evidencia y compartir aprendizajes.",
  category: "Research & Experiments",
  duration: "15 min",
  accent: "#00b9aa",
  slides: [
    {
      slug: "bienvenida",
      title: "Grok Bot for Research & Experiments",
      kicker: "Bienvenida",
      component: ResearchWelcomeSlide,
      guide: {
        intro:
          "Esta sesión propone un punto de partida para explorar preguntas con Grok Bot. Puedes adaptar los ejemplos al tema que estés investigando.",
        sections: [
          {
            title: "Trae una pregunta",
            body: "Elige algo que aún no entiendas o una idea que quieras poner a prueba. Anota qué sabes, qué supones y qué necesitarías comprobar.",
          },
        ],
        takeaway:
          "Explora la guía a tu ritmo. Usa «Ir al presentador» para volver al punto en vivo.",
      },
      question: {
        id: "research-starting-point",
        prompt: "¿Qué te gustaría explorar con Grok Bot?",
        type: "multiple",
        options: [
          { id: "questions", label: "Formular mejores preguntas" },
          { id: "sources", label: "Organizar y contrastar fuentes" },
          { id: "experiments", label: "Diseñar experimentos" },
          { id: "findings", label: "Sintetizar hallazgos" },
        ],
      },
    },
    {
      slug: "una-hipotesis-una-prueba",
      title: "Una hipótesis. Una prueba concreta.",
      kicker: "De la curiosidad a la evidencia",
      component: HypothesisSlide,
      guide: {
        intro:
          "Una hipótesis expresa lo que esperas observar. Diseña una prueba que permita descubrir si esa expectativa se sostiene.",
        sections: [
          {
            title: "Delimita la pregunta",
            body: "Define el contexto y el alcance. Pide al bot que señale supuestos, preguntas pendientes y posibles explicaciones alternativas.",
          },
          {
            title: "Diseña la prueba",
            body: "Describe qué cambiarás, qué observarás y qué mantendrás constante. Decide antes qué resultado apoyaría o cuestionaría la hipótesis.",
          },
          {
            title: "Contrasta la evidencia",
            body: "Revisa las fuentes originales y separa observaciones de interpretaciones. Guarda el procedimiento para que otra persona pueda repetirlo.",
          },
        ],
        takeaway:
          "Plantilla: creemos que [hipótesis]. Lo probaremos con [experimento] y observaremos [medida].",
      },
    },
    {
      slug: "tu-primer-experimento",
      title: "Pregunta. Prueba. Aprende.",
      kicker: "Ejercicio · 5 minutos",
      component: ExperimentSlide,
      guide: {
        intro:
          "Redacta una hipótesis y diseña una prueba pequeña con ayuda del bot. El objetivo del ejercicio es obtener un plan que puedas revisar.",
        sections: [
          {
            title: "Minutos 1–2 · Formula",
            body: "Describe tu pregunta y el resultado que esperas observar. Por ejemplo: instrucciones con un ejemplo podrían reducir las dudas al comenzar una tarea.",
          },
          {
            title: "Minutos 3–4 · Diseña",
            body: "Define cómo compararías las instrucciones con y sin ejemplo. Elige una medida y anota qué podría distorsionar el resultado.",
          },
          {
            title: "Minuto 5 · Revisa",
            body: "Comparte el plan, sus límites y el siguiente paso. Un plan todavía no es un hallazgo: distingue lo que vas a probar de lo que ya observaste.",
          },
        ],
        takeaway: "Conserva la pregunta, el procedimiento y lo que aprendiste.",
      },
      question: {
        id: "research-next-step",
        prompt: "¿Qué te falta para poner a prueba tu idea?",
        type: "single",
        options: [
          { id: "hypothesis", label: "Delimitar la hipótesis" },
          { id: "evidence", label: "Reunir evidencia inicial" },
          { id: "measure", label: "Elegir qué medir" },
          { id: "ready", label: "Ya tengo un plan para probarla" },
        ],
      },
    },
  ],
};
