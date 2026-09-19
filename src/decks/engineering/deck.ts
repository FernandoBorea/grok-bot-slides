import type { Deck } from "../types";
import {
  EngineeringWelcomeSlide,
  SpeakerSlide,
  SdlcSlide,
  RolesSlide,
  ConnectionsSlide,
  GroupSlide,
  EnvironmentSlide,
  PstackOriginSlide,
  PstackSlide,
  ToolsSlide,
  FeedbackSlide,
  StartSlide,
} from "./EngineeringSlides";

export const engineeringDeck: Deck = {
  slug: "grok-bot-for-engineering",
  title: "Grok Bot for Engineering",
  description:
    "Cómo trabajar con un equipo de bots, darle herramientas y comprobar lo que construye.",
  category: "Engineering",
  duration: "15 min",
  accent: "#ff6b00",
  slides: [
    {
      slug: "bienvenida",
      title: "Grok Bot for Engineering",
      kicker: "Introducción · 0:30",
      component: EngineeringWelcomeSlide,
      guide: {
        intro:
          "Vamos a recorrer una forma de trabajar con Grok Bot: conversar una idea, repartir el trabajo y comprobar lo que se construye. Usaremos una app de tareas como ejemplo que podés adaptar a tu producto.",
        sections: [
          {
            title: "El punto de partida",
            body: "Un bot puede conservar contexto, coordinarse con otros bots y usar herramientas. Para que eso ayude en un proyecto, hay que darle un trabajo concreto y una forma de saber si lo hizo bien.",
          },
          {
            title: "Lo que vamos a seguir",
            body: "Queremos agregar archivos adjuntos a una tarea. Esa idea nos acompañará al hablar del equipo, el entorno de ejecución, pstack y la verificación.",
          },
        ],
        takeaway:
          "Grok Bot puede acompañar el trabajo desde la primera conversación hasta la corrección de un fallo.",
      },
      question: {
        id: "used-grok-bot",
        prompt: "¿Quiénes han utilizado Grok Bot?",
        type: "poll",
        options: [
          { id: "yes", label: "Sí" },
          { id: "no", label: "No" },
        ],
      },
    },
    {
      slug: "walter-morales",
      title: "Walter Morales",
      kicker: "Sobre mí · 0:30",
      component: SpeakerSlide,
      guide: {
        intro:
          "Soy Walter Morales: Ai Labs Co-Founder, SpaceXAI Ambassadors Regional Lead y AI Product Engineer.",
        sections: [
          {
            title: "Por qué esta charla",
            body: "Les voy a compartir el flujo que uso para construir con bots. Lo convertimos en una plantilla para que puedan llevarse las ideas y adaptarlas a su propio proyecto.",
          },
        ],
        takeaway:
          "Una experiencia de trabajo con agentes, contada a través de un ejemplo que podemos reutilizar.",
      },
    },
    {
      slug: "grok-bot-en-el-sdlc",
      title: "De la idea a algo que funciona",
      kicker: "El SDLC · 1:00",
      component: SdlcSlide,
      guide: {
        intro:
          "SDLC es el ciclo de vida del desarrollo de software. Incluye entender qué hace falta, decidir qué construir, hacerlo, probarlo y seguir mejorándolo. En cada parte hay tareas que podemos darles a los bots.",
        sections: [
          {
            title: "Antes de escribir código",
            body: "En nuestra app, pedir archivos adjuntos todavía deja preguntas abiertas: dónde se agregan, quién los ve y qué formatos necesitamos. Research busca referencias y PO nos ayuda a acordar el alcance.",
          },
          {
            title: "Después del primer cambio",
            body: "Builder lleva el trabajo a un agente de Cursor. Las pruebas acompañan la implementación. Vos revisás y hacés merge; después del despliegue, QA vuelve a comprobar el flujo y devuelve sus hallazgos al equipo.",
          },
        ],
        takeaway:
          "Vos seguís orientando el producto y decidiendo qué se entrega.",
      },
    },
    {
      slug: "crear-el-equipo",
      title: "Bots con responsabilidades claras",
      kicker: "Dr Eggbot y los roles · 1:15",
      component: RolesSlide,
      guide: {
        intro:
          "Yo empiezo con Dr Eggbot, el bot que comparte Lauren para ayudar a crear otros bots. Le explico el proyecto y qué trabajo quiero delegar. A partir de ahí definimos responsabilidades, contexto y límites.",
        sections: [
          {
            title: "Un equipo que podés adaptar",
            body: "Nuestra plantilla tiene cuatro bots: Research trae información; PO acuerda el alcance con vos y lleva Linear; Builder coordina la implementación; QA comprueba el resultado. Cada uno mantiene su nombre, forma y color durante la presentación.",
          },
          {
            title: "Cuándo actuar y cuándo esperar",
            body: "Research entrega sus hallazgos al PO. Builder espera una tarea definida y no hace merge. QA reporta a PO y Builder. Las decisiones de producto y la revisión antes de entregar siguen pasando por vos.",
          },
        ],
        takeaway:
          "Explicale a cada bot qué esperás de él y a quién tiene que pasarle el trabajo.",
      },
    },
    {
      slug: "plugins-skills-y-mcp",
      title: "Cómo le damos más capacidades",
      kicker: "Plugins, skills y MCP · 1:30",
      component: ConnectionsSlide,
      guide: {
        intro:
          "Antes de seguir, tres palabras que vamos a usar: un plugin es un paquete de capacidades; una skill explica cómo hacer una tarea; MCP es un estándar para conectar herramientas y datos con una aplicación de IA.",
        sections: [
          {
            title: "Cómo se relacionan",
            body: "Un plugin puede traer skills, conexiones u otras capacidades. pstack reúne skills de ingeniería. MCP significa Model Context Protocol: un servidor MCP ofrece herramientas o datos y una aplicación compatible se conecta a él. No todos los plugins incluyen MCP.",
          },
          {
            title: "Agregar una conexión en Grok Bot",
            body: "Abrí Marketplace, elegí el plugin y pulsá Add. Si lo solicita, conectá la cuenta desde el navegador. Después podés adjuntar el conector con @ en el chat y probar una tarea, como consultar un ticket de Linear. Las skills se referencian con /.",
          },
          {
            title: "Dónde se configura",
            body: "En Marketplace → Your plugins → Manage plugins and skills podés revisar lo instalado y activar o desactivar herramientas. Una conexión MCP personalizada requiere la configuración que indiquen su servidor y la app compatible: dirección o comando, y autenticación si corresponde.",
          },
        ],
        takeaway:
          "Agregar un plugin, conectar una cuenta y probar una tarea nos permite comprobar que el bot ya puede usar esa capacidad.",
      },
    },
    {
      slug: "coordinar-en-grupo",
      title: "Lo hablamos en el grupo",
      kicker: "Contexto y coordinación · 1:30",
      component: GroupSlide,
      guide: {
        intro:
          "La mayor parte del trabajo la converso en un grupo. Ahí comparto documentación, discuto ideas y les doy contexto a los bots. Si necesito un seguimiento individual, les pido que me escriban en nuestro 1:1.",
        sections: [
          {
            title: "Todavía estamos definiendo",
            body: "En la conversación recreada pedimos adjuntar archivos a las tareas. PO menciona a Research para comparar opciones y deja claro que aún no hay que crear tickets. Builder espera el alcance acordado antes de empezar.",
          },
          {
            title: "Dónde queda lo que aprendimos",
            body: "Los bots usan memoria compartida e individual. Cuando acordamos decisiones o trabajo, PO lo registra en Linear para conservar el historial. Las menciones y las rutinas de seguimiento, parecidas a una daily, ayudan a retomar lo pendiente.",
          },
        ],
        takeaway:
          "El grupo nos permite discutir antes de construir y dejar claro quién sigue.",
      },
    },
    {
      slug: "entorno-cloud-agents",
      title: "Un entorno listo para trabajar",
      kicker: "Cursor Cloud Agents · 1:30",
      component: EnvironmentSlide,
      guide: {
        intro:
          "Para que el bot pueda avanzar, necesita un lugar donde ejecutar el proyecto. En este flujo, toda la codificación y la ejecución de QA pasan por Cursor Cloud Agents.",
        sections: [
          {
            title: "Dejar el proyecto listo",
            body: "El environment contiene los repositorios, las dependencias instaladas y las variables de entorno. El agente puede levantar la app, cambiar código y probarlo. Así, pedir la funcionalidad de adjuntos también permite comprobarla en un entorno preparado.",
          },
          {
            title: "Del agente a la entrega",
            body: "Builder entrega un PR, una propuesta de cambios en GitHub. Vos lo revisás y hacés merge. GitHub tiene configurado CI/CD, las comprobaciones y el despliegue automático hacia servicios como Vercel o Railway. QA también usa Cloud Agents para verificar.",
          },
        ],
        takeaway:
          "Preparar el entorno es lo que permite que el agente pase de la conversación al trabajo sobre la app.",
      },
    },
    {
      slug: "lauren-y-pstack",
      title: "La forma de trabajar de Lauren",
      kicker: "El origen de pstack · 1:00",
      component: PstackOriginSlide,
      guide: {
        intro:
          "Lauren, conocida como @poteto, es Software Engineer en xAI y forma parte del equipo de React Compiler. Ha trabajado con grandes bases de código en Meta, Netflix y Cursor.",
        sections: [
          {
            title: "De su trabajo diario a un plugin",
            body: "pstack reúne skills de ingeniería que Lauren usaba en Cursor para investigar, construir, revisar y verificar software. Esa experiencia quedó escrita en procedimientos que los agentes pueden seguir. El plugin está publicado en cursor/plugins.",
          },
          {
            title: "Qué nos llevamos al proyecto",
            body: "Podemos usar esa base y adaptarla a nuestra app. En esta charla nos interesa especialmente cómo crear y mantener una skill que enseñe a los agentes a verificar el producto.",
          },
        ],
        takeaway:
          "pstack viene de una práctica de ingeniería: convertir la forma de trabajar en instrucciones reutilizables.",
      },
    },
    {
      slug: "pstack",
      title: "Enseñale cómo comprobar tu app",
      kicker: "Skills del proyecto · 1:00",
      component: PstackSlide,
      guide: {
        intro:
          "Una skill describe cómo hacer un trabajo. Con pstack podemos crear una verification skill que le explique al agente cómo recorrer nuestra app y comprobar sus funcionalidades.",
        sections: [
          {
            title: "Un procedimiento concreto",
            body: "Para los adjuntos, los pasos podrían ser abrir una tarea, subir un archivo y volver a abrirla para comprobar que sigue ahí. /create-verification-skill ayuda a preparar ese procedimiento, su mapa de funcionalidades y las herramientas necesarias.",
          },
          {
            title: "Mantenerlo útil",
            body: "Cuando cambia la app, también tiene que cambiar la forma de probarla. /maintain-verification-skill ayuda con ese mantenimiento. control-ui y control-cli son capacidades complementarias de cursor-team-kit; no forman parte de pstack.",
          },
        ],
        takeaway:
          "La skill debe explicar qué probar, cómo hacerlo y qué resultado esperamos ver.",
      },
    },
    {
      slug: "tools-para-los-bots",
      title: "Dale herramientas para hacer el trabajo",
      kicker: "Tools del proyecto · 1:45",
      component: ToolsSlide,
      guide: {
        intro:
          "También podemos crear tools para nuestros bots. Por ejemplo, un comando que permita adjuntar un archivo a una tarea de prueba y devuelva un resultado que el agente pueda interpretar.",
        sections: [
          {
            title: "Cómo se conectan las piezas",
            body: "La skill explica el procedimiento. El feature map es un mapa que ubica las funcionalidades. La tool permite hacer una operación: en este ejemplo, recibe una tarea y un archivo. Una CLI ofrece esas operaciones mediante comandos reutilizables.",
          },
          {
            title: "Comprobar lo que ve la persona",
            body: "Que el comando termine bien no basta para dar por probado el flujo visual. QA debe volver a abrir la tarea en la interfaz y comprobar el adjunto. El resultado y las capturas sirven para explicar qué pasó. Es un ejemplo conceptual, no un comando ya implementado.",
          },
        ],
        takeaway:
          "Una tool propia convierte una operación de tu app en algo que los agentes pueden volver a usar.",
      },
    },
    {
      slug: "qa-y-correcciones",
      title: "Si algo falla, vuelve al equipo",
      kicker: "QA y correcciones · 2:15",
      component: FeedbackSlide,
      guide: {
        intro:
          "Después del merge y el despliegue, QA prueba el flujo en develop. Cuenta qué intentó, qué vio y qué falló, y le pasa el resultado a PO y Builder.",
        sections: [
          {
            title: "Recorrer una posible falla",
            body: "Imaginemos que el archivo se sube, pero desaparece al volver a abrir la tarea. QA muestra cómo lo reprodujo. PO lleva el seguimiento en Linear y Builder encarga la corrección. Si falta una prueba para ese recorrido, Builder agrega la cobertura.",
          },
          {
            title: "Volver a probar",
            body: "Vos revisás el nuevo PR y hacés merge. Tras el despliegue, QA repite la verificación. Si pasa, PO cierra el ticket. Si vuelve a fallar, el reporte regresa a ambos. Esta falla es hipotética y sirve para explicar el ciclo.",
          },
        ],
        takeaway:
          "QA devuelve información útil para decidir si hay que corregir o si podemos cerrar la tarea.",
      },
    },
    {
      slug: "tu-primer-flujo",
      title: "Tu primer flujo con Grok Bot",
      kicker: "Cómo empezar · 1:15",
      component: StartSlide,
      guide: {
        intro:
          "Elegí una tarea que conozcás bien y probá delegarla. Podés trabajar con Dr Eggbot para crear un bot que la resuelva, con el contexto y las herramientas de tu proyecto.",
        sections: [
          {
            title: "Un primer encargo",
            body: "Contale qué debe resolver, qué decisiones pasan por vos y cómo querés recibir el resultado. La plantilla de Research, PO, Builder y QA se puede adaptar; podés empezar con una sola responsabilidad.",
          },
          {
            title: "Aprender del resultado",
            body: "Prepará el entorno, pedí una ejecución y revisá lo que entrega. Las correcciones te van a mostrar qué contexto, instrucciones o tools le faltan. Con eso podés mejorar el siguiente intento.",
          },
        ],
        takeaway: "Empezá por una tarea concreta que vos sepas comprobar.",
      },
      question: {
        id: "first-sdlc-stage",
        prompt: "¿En qué parte de tu SDLC empezarías?",
        type: "single",
        options: [
          { id: "discovery", label: "Investigación y definición" },
          { id: "building", label: "Implementación" },
          { id: "verification", label: "Verificación y QA" },
          { id: "followup", label: "Seguimiento del trabajo" },
        ],
      },
    },
  ],
};
