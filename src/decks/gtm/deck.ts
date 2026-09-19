import type { Deck } from "../types";
import { Welcome, Speaker, Market, Jobs, Research, Meeting, Compare, Brief, Followup, Experience, Start } from "./CairoseSlides";

export const gtmDeck: Deck = {
  slug: "grok-bot-for-gtm",
  title: "Grok bot for GTM",
  description: "Investigar tu mercado, seguir sus cambios y preparar tu próximo paso con Grok Bot.",
  category: "Estrategia comercial",
  duration: "15 min",
  accent: "#ff2c9c",
  slides: [
    {
      "slug": "bienvenida",
      "title": "Grok bot for GTM",
      "kicker": "Introducción · 0:30",
      "guide": {
        "intro": "Cómo usar Grok Bot para investigar tu mercado, seguir sus cambios y preparar tu próximo paso.",
        "sections": [
          {
            "title": "Para llevarlo a la práctica",
            "body": "Veremos entregas ilustrativas ya preparadas y después mi experiencia real. No hay generación en vivo."
          }
        ],
        "takeaway": "Pensá qué información comercial te ayudaría a avanzar."
      },
      component: Welcome
    },
    {
      "slug": "daniela-huezo",
      "title": "Daniela Huezo",
      "kicker": "Un gusto, soy Daniela · 0:30",
      "guide": {
        "intro": "Soy Daniela Huezo: Co-founder de Ai Labs, Ambassador de SpaceXAI & ElevenLabs y AI Product Engineer.",
        "sections": [
          {
            "title": "Para llevarlo a la práctica",
            "body": "Comparto una experiencia de uso de Grok Bot, incluyendo lo que me sirvió y lo que tuve que corregir."
          }
        ],
        "takeaway": "Vamos a hablar de trabajo que podés encargarle a un bot."
      },
      component: Speaker
    },
    {
      "slug": "que-es-go-to-market",
      "title": "El mapa de go-to-market",
      "kicker": "Go-to-market / Del cliente al aprendizaje · 1:30",
      "guide": {
        "intro": "Go-to-market conecta las decisiones para llevar un producto a sus clientes, entregarles valor y aprender de lo que ocurre.",
        "sections": [
          {
            "title": "Para llevarlo a la práctica",
            "body": "Entender: ¿a quién queremos llegar?, ¿qué problema necesita resolver?, ¿cómo lo resuelve hoy?, ¿qué valor le ofrecemos? Llegar y vender: ¿por qué nos elegiría?, ¿qué le decimos?, ¿dónde lo encontramos?, ¿cómo compra y cuánto paga? Aprender y crecer: ¿cómo recibe valor?, ¿qué hace que se quede?, ¿cómo medimos si funciona?, ¿qué debemos ajustar?"
          }
        ],
        "takeaway": "Cada pregunta genera trabajo de investigación, preparación o análisis que podemos acotar para el bot."
      },
      component: Market
    },
    {
      "slug": "trabajo-para-grok",
      "title": "Tres trabajos para tu GTM",
      "kicker": "El recorrido · 1:00",
      "guide": {
        "intro": "Investigar, seguir cambios y preparar una acción son tres trabajos conectados.",
        "sections": [
          {
            "title": "Para llevarlo a la práctica",
            "body": "Ejemplo ficticio: ofrecés capacitación para equipos de atención. En las siguientes slides vemos qué podrías pedirle al bot y cómo podría organizar una entrega. No son resultados obtenidos por Daniela ni una reproducción de la interfaz."
          }
        ],
        "takeaway": "Grok Bot puede participar antes de que decidas a quién acercarte."
      },
      component: Jobs
    },
    {
      "slug": "investigar-clientes",
      "title": "Investigá esto por mí",
      "kicker": "Ficha de investigación · 1:15",
      "guide": {
        "intro": "Pedile empresas relevantes y razones verificables para considerarlas.",
        "sections": [
          {
            "title": "Para llevarlo a la práctica",
            "body": "En el caso ficticio, Empresa A busca 12 agentes. Una ficha real debería enlazar la vacante e indicar fecha. La necesidad de capacitación externa es una hipótesis: puede que ya tengan formación interna. No presentar este ejemplo como investigación ejecutada."
          }
        ],
        "takeaway": "Pedí evidencia y separala de la interpretación."
      },
      component: Research
    },
    {
      "slug": "preparar-conversacion",
      "title": "Avisame cuando cambie algo",
      "kicker": "Reporte semanal · 1:15",
      "guide": {
        "intro": "Una rutina puede ayudarte a seguir un conjunto definido de empresas.",
        "sections": [
          {
            "title": "Para llevarlo a la práctica",
            "body": "La muestra ficticia contiene dos novedades. Para probarlo, definí empresas, fuentes accesibles, frecuencia y formato. Pedí solo cambios desde la revisión anterior, con enlaces y fechas. Comprobá primero una entrega y después configurá la rutina. No se presenta como una función del dashboard de Cairose."
          }
        ],
        "takeaway": "Definí qué cambio merece tu atención."
      },
      component: Meeting
    },
    {
      "slug": "comparar-alternativas",
      "title": "Ayudame a aprovecharlo",
      "kicker": "Preparar el siguiente paso · 1:15",
      "guide": {
        "intro": "Usá la investigación para preparar una pregunta que ayude a validar la necesidad.",
        "sections": [
          {
            "title": "Para llevarlo a la práctica",
            "body": "El ejemplo propone preguntar cómo preparan al nuevo equipo. Grok Bot puede preparar el borrador a partir del contexto; vos revisás su pertinencia. No se afirma intención de compra, no se inventa una respuesta del cliente y no se envía ningún mensaje durante la presentación."
          }
        ],
        "takeaway": "La señal orienta la conversación; la conversación permite aprender."
      },
      component: Compare
    },
    {
      "slug": "como-pedirlo",
      "title": "Cómo empezar en la aplicación",
      "kicker": "Tu primer encargo · 1:00",
      "guide": {
        "intro": "Abrí una conversación con tu bot y aportá el contexto de negocio.",
        "sections": [
          {
            "title": "Para llevarlo a la práctica",
            "body": "Compartí tu oferta, el perfil que buscás y las fuentes disponibles. Si necesita una conexión, configurá la pertinente antes de pedir el trabajo. Empezá con cinco casos y pedí enlaces, razones y dudas. Esta slide es una guía conceptual, no una captura ni una demo en vivo."
          }
        ],
        "takeaway": "Primero revisá una entrega; después configurá el seguimiento."
      },
      component: Brief
    },
    {
      "slug": "continuar-con-grok",
      "title": "Cómo lo usé yo",
      "kicker": "Experiencia de Daniela · 1:00",
      "guide": {
        "intro": "Usé Grok Bot directamente en su aplicación para investigar el mercado de Cairose.",
        "sections": [
          {
            "title": "Para llevarlo a la práctica",
            "body": "Cairose es software para floristerías. El trabajo incluyó investigar clientes y alternativas. Revisé los hallazgos y afiné el enfoque, corrigiendo la información que lo necesitaba. No atribuir a esta experiencia las rutinas ni el caso ficticio de las slides anteriores."
          }
        ],
        "takeaway": "Mi revisión ayudó a afinar la investigación."
      },
      component: Followup
    },
    {
      "slug": "dashboard",
      "title": "Lo que sí me sirvió",
      "kicker": "El dashboard · 2:00",
      "guide": {
        "intro": "Grok Bot hizo un dashboard que me ayudó a procesar la información.",
        "sections": [
          {
            "title": "Para llevarlo a la práctica",
            "body": "La información organizada me resultó más útil que una respuesta larga en el chat. Mostrá brevemente una lista y una ficha. El panel no garantiza que los datos sean correctos ni realiza seguimiento autónomo: sus ediciones se guardan en el navegador."
          }
        ],
        "takeaway": "La forma de la entrega también puede hacer útil el trabajo."
      },
      component: Experience
    },
    {
      "slug": "aprendizaje-y-siguiente-paso",
      "title": "Tu próximo paso con Grok Bot",
      "kicker": "Cierre · 0:45",
      "guide": {
        "intro": "¿Qué parte de tu mercado te gustaría tener mejor investigada mañana?",
        "sections": [
          {
            "title": "Para llevarlo a la práctica",
            "body": "Elegí un mercado, unas empresas o unos cambios que te interese conocer. Aportá contexto y pedí una primera entrega verificable. No hace falta empezar con un equipo completo de bots."
          }
        ],
        "takeaway": "Elegí una pregunta de negocio y convertíla en un encargo concreto."
      },
      component: Start
    },
  ],
};
