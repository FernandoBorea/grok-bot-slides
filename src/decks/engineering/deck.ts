import type { Deck } from "../types";
import { WelcomeSlide } from "./WelcomeSlide";
import { WorkflowSlide } from "./WorkflowSlide";
import { ContextSlide } from "./ContextSlide";
import { ReviewSlide } from "./ReviewSlide";
import { ExerciseSlide } from "./ExerciseSlide";
import { ClosingSlide } from "./ClosingSlide";

export const engineeringDeck: Deck = {
  slug: "grok-bot-for-engineering",
  title: "Grok Bot for Engineering",
  description:
    "Del primer prompt al código en producción. Una sesión para construir, revisar y aprender juntos.",
  category: "Engineering",
  duration: "25 min",
  accent: "#ff6b00",
  slides: [
    {
      slug: "bienvenida",
      title: "Grok Bot for Engineering",
      kicker: "Bienvenida",
      component: WelcomeSlide,
      guide: {
        intro:
          "Hoy vamos a explorar cómo trabajar con Grok bot en tareas de ingeniería. Tu teléfono será tu guía y tu espacio para participar.",
        sections: [
          {
            title: "Antes de empezar",
            body: "Cuéntanos si ya has utilizado Grok bot. No necesitas experiencia previa: empezaremos por el contexto y construiremos paso a paso.",
          },
        ],
        takeaway:
          "Explora la guía a tu ritmo. Usa «Ir al presentador» para volver al punto en vivo.",
      },
      question: {
        id: "used-grok-bot",
        prompt: "¿Quiénes han utilizado Grok bot?",
        type: "poll",
        options: [
          { id: "yes", label: "Sí" },
          { id: "no", label: "No" },
        ],
      },
    },
    {
      slug: "del-contexto-al-codigo",
      title: "Del contexto al código",
      kicker: "El flujo de trabajo",
      component: WorkflowSlide,
      guide: {
        intro:
          "Una tarea útil comienza con un problema concreto. Dale al bot suficiente contexto para entenderlo y define cómo comprobarás el resultado.",
        sections: [
          {
            title: "Entender",
            body: "Describe la intención, los usuarios y el comportamiento actual. Señala los archivos o ejemplos que ayudan a entender el proyecto.",
          },
          {
            title: "Construir",
            body: "Trabaja en cambios que puedas revisar. Para tareas grandes, divide el objetivo en resultados pequeños.",
          },
          {
            title: "Verificar",
            body: "Revisa el diff y ejecuta las comprobaciones adecuadas. Confirma que el comportamiento resuelve el problema inicial.",
          },
        ],
        takeaway:
          "Piensa en una tarea de tu semana en la que este flujo podría ayudarte.",
      },
      question: {
        id: "engineering-tasks",
        prompt: "¿En qué tareas te gustaría usar Grok bot?",
        type: "multiple",
        options: [
          { id: "features", label: "Construir funcionalidades" },
          { id: "debugging", label: "Investigar errores" },
          { id: "tests", label: "Escribir y revisar pruebas" },
          { id: "understanding", label: "Entender código existente" },
        ],
      },
    },
    {
      slug: "un-buen-contexto",
      title: "Dale contexto. Después, espacio.",
      kicker: "El primer prompt",
      component: ContextSlide,
      guide: {
        intro:
          "Un prompt no necesita ser largo. Necesita decir qué buscas y qué condiciones debe respetar el resultado.",
        sections: [
          {
            title: "Objetivo",
            body: "Explica qué debe poder hacer la persona al terminar. Por ejemplo: filtrar una lista de proyectos por estado.",
          },
          {
            title: "Contexto y límites",
            body: "Menciona los componentes existentes, las convenciones del repositorio y las partes que no deben cambiar.",
          },
          {
            title: "Evidencia",
            body: "Pide comprobar los estados vacíos, la navegación y los casos relevantes. Define qué significa que la tarea esté lista.",
          },
        ],
        takeaway:
          "Plantilla: quiero lograr [resultado], en [contexto], respetando [límites]. Compruébalo con [evidencia].",
      },
    },
    {
      slug: "implementar-revisar-verificar",
      title: "Implementar. Revisar. Verificar.",
      kicker: "Criterio de ingeniería",
      component: ReviewSlide,
      guide: {
        intro:
          "Que el código compile es una parte de la revisión. El cambio también debe resolver la necesidad y encajar con el proyecto.",
        sections: [
          {
            title: "Revisa la intención",
            body: "Compara el resultado con el objetivo. Busca complejidad innecesaria, supuestos ocultos y casos que no se hayan considerado.",
          },
          {
            title: "Busca evidencia",
            body: "Usa pruebas, comprobaciones estáticas o una verificación manual según el cambio. Lee sus resultados: ejecutar una prueba no garantiza que haya pasado.",
          },
        ],
        takeaway:
          "La responsabilidad sobre lo que se entrega sigue siendo del equipo.",
      },
      question: {
        id: "review-priority",
        prompt: "Al revisar un cambio, ¿qué comprobarías primero?",
        type: "single",
        options: [
          {
            id: "behavior",
            label: "Que resuelva el comportamiento esperado",
          },
          { id: "tests", label: "Que las pruebas relevantes pasen" },
          {
            id: "conventions",
            label: "Que siga las convenciones del proyecto",
          },
          { id: "edge-cases", label: "Que contemple los casos límite" },
        ],
      },
    },
    {
      slug: "vamos-a-construir",
      title: "Let's build",
      kicker: "Ejercicio · 8 minutos",
      component: ExerciseSlide,
      guide: {
        intro:
          "Elige una mejora pequeña en un proyecto que conozcas. Puede ser un estado vacío, un filtro, una validación o una explicación de código.",
        sections: [
          {
            title: "Minutos 1–2 · Enmarca",
            body: "Escribe el resultado que quieres, el contexto y al menos un límite. Añade cómo vas a verificarlo.",
          },
          {
            title: "Minutos 3–6 · Construye",
            body: "Trabaja con el bot y revisa las decisiones mientras avanza. Ajusta el contexto si aparece una suposición equivocada.",
          },
          {
            title: "Minutos 7–8 · Comprueba",
            body: "Verifica el resultado y prepara una demostración breve. Anota una cosa que funcionó y una que cambiarías.",
          },
        ],
        takeaway:
          "Si no tienes un proyecto, diseña el prompt para agregar un filtro por estado a una lista de tareas.",
      },
    },
    {
      slug: "mejores-preguntas-mejor-software",
      title: "Mejores preguntas. Mejor software.",
      kicker: "Para llevar",
      component: ClosingSlide,
      guide: {
        intro:
          "Trabajar con un bot es una habilidad que mejora con práctica, contexto y revisión. Empieza con una tarea pequeña y observa qué aprendes.",
        sections: [
          {
            title: "Tu siguiente paso",
            body: "Elige una tarea real para mañana. Escribe el objetivo antes de abrir el chat y guarda el prompt que te haya funcionado.",
          },
          {
            title: "Compártelo con tu equipo",
            body: "Enseña el resultado y cómo lo verificaste. Los límites y las sorpresas también son aprendizajes útiles.",
          },
        ],
        takeaway: "Contexto claro. Cambios revisables. Resultados comprobados.",
      },
    },
  ],
};
