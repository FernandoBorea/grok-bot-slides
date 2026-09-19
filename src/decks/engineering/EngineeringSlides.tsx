import { useId, type ReactNode } from "react";
import { Bot } from "../../components/Bot";
import "./engineering.css";

const roles = [
  {
    name: "Research",
    job: "Busca opciones y trae fuentes",
    output: "Hallazgos para PO",
    color: "blue",
    shape: "triangle",
    seed: 201,
  },
  {
    name: "PO",
    job: "Define con vos qué construir",
    output: "Ticket en Linear",
    color: "teal",
    shape: "flower",
    seed: 202,
  },
  {
    name: "Builder",
    job: "Lleva la tarea a un Cloud Agent",
    output: "Cambios listos para revisar",
    color: "orange",
    shape: "round",
    seed: 203,
  },
  {
    name: "QA",
    job: "Comprueba qué funciona y qué falla",
    output: "Resultados para PO y Builder",
    color: "pink",
    shape: "square",
    seed: 204,
  },
] as const;

function Frame({
  number,
  label,
  title,
  footer,
  children,
  className = "",
}: {
  number: number;
  label: string;
  title: ReactNode;
  footer: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`slide-canvas eng-slide ${className}`}>
      <div className="slide-eyebrow">Grok Bot for Engineering / {label}</div>
      <h2 className="eng-title">{title}</h2>
      <div className="eng-content">{children}</div>
      <div className="slide-footer">
        <span>{footer}</span>
        <span>{String(number).padStart(2, "0")} / 12</span>
      </div>
    </section>
  );
}

function RoleBot({
  role,
  className = "",
}: {
  role: (typeof roles)[number];
  className?: string;
}) {
  return (
    <Bot
      className={`eng-role-bot ${className}`}
      seed={role.seed}
      color={`var(--slide-${role.color})`}
      shape={role.shape}
    />
  );
}

function Arrow() {
  return (
    <span className="eng-arrow" aria-hidden="true">
      →
    </span>
  );
}

function ChatMessage({
  role,
  children,
}: {
  role?: (typeof roles)[number];
  children: ReactNode;
}) {
  return (
    <div className={`eng-message ${role ? "" : "eng-message-human"}`}>
      {role && <RoleBot role={role} />}
      <div className="eng-message-body">
        <span className={role ? `slide-${role.color}` : "eng-human-name"}>
          {role?.name ?? "Vos"}
        </span>
        <p>{children}</p>
      </div>
    </div>
  );
}

export function EngineeringWelcomeSlide() {
  return (
    <section className="slide-canvas eng-slide eng-cover">
      <div className="slide-eyebrow">Walter Morales / 15 minutos</div>
      <h1 className="eng-cover-title">
        Grok Bot
        <br />
        for Engineering<span className="slide-orange">.</span>
      </h1>
      <p className="eng-cover-caption">
        Un equipo de bots en tu
        <br />
        ciclo de desarrollo de software.
      </p>
      <div className="eng-cover-team" aria-label="Research, PO, Builder y QA">
        {roles.map((role) => (
          <div key={role.name}>
            <RoleBot role={role} />
            <span>{role.name}</span>
          </div>
        ))}
      </div>
      <div className="slide-footer">
        <span>Coordinar, construir y comprobar con Grok Bot</span>
        <span>01 / 12</span>
      </div>
    </section>
  );
}

export function SpeakerSlide() {
  return (
    <Frame
      number={2}
      label="Un gusto, soy Walter"
      title={
        <>
          Walter
          <br />
          Morales<span className="slide-orange">.</span>
        </>
      }
      footer="Hoy les comparto cómo trabajo con un equipo de bots."
      className="eng-speaker-slide"
    >
      <div className="eng-speaker-roles">
        <p>
          <span>Ai Labs</span>
          <strong>Co-Founder</strong>
        </p>
        <p>
          <span>SpaceXAI Ambassadors</span>
          <strong>Regional Lead</strong>
        </p>
        <p>
          <span>Mi trabajo</span>
          <strong>AI Product Engineer</strong>
        </p>
      </div>
      <div className="eng-speaker-mark" aria-hidden="true">
        WM<span>↗</span>
      </div>
    </Frame>
  );
}

export function SdlcSlide() {
  const stages = [
    ["Entender", "Research", "blue"],
    ["Definir", "PO + vos", "teal"],
    ["Construir", "Builder", "orange"],
    ["Comprobar", "Agentes + CI", "pink"],
    ["Entregar", "Vos + CI/CD", "orange"],
    ["Mejorar", "QA + equipo", "teal"],
  ];
  return (
    <Frame
      number={3}
      label="El SDLC"
      title={
        <>
          De la idea a algo
          <br />
          que funciona.
        </>
      }
      footer="SDLC: el ciclo de vida del desarrollo de software"
    >
      <figure
        className="eng-lifecycle"
        aria-label="Ciclo desde entender la necesidad hasta mejorar el producto"
      >
        <ol className="eng-stages">
          {stages.map(([name, owner, color], i) => (
            <li key={name}>
              <span className={`eng-stage-number slide-${color}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{name}</h3>
              <p>{owner}</p>
            </li>
          ))}
        </ol>
        <div className="eng-return-line">
          <span>Lo que aprendemos vuelve al equipo</span>
        </div>
        <figcaption>
          Vos orientás el producto y tomás las decisiones de entrega.
        </figcaption>
      </figure>
    </Frame>
  );
}

export function RolesSlide() {
  return (
    <Frame
      number={4}
      label="Crear el equipo"
      title="Bots con responsabilidades claras."
      footer="Nuestra plantilla: cuatro bots para trabajar en una app de tareas. Adaptala a tu proyecto."
    >
      <div className="eng-eggbot">
        <span className="eng-egg-mark" aria-hidden="true">
          ↳
        </span>
        <div>
          <strong>Dr Eggbot</strong>
          <p>Le contás qué necesitás y te ayuda a armar el equipo.</p>
        </div>
      </div>
      <div className="eng-roles">
        {roles.map((role) => (
          <div className="eng-role" key={role.name}>
            <RoleBot role={role} />
            <h3>{role.name}</h3>
            <p>{role.job}</p>
            <span className={`eng-role-output slide-${role.color}`}>
              {role.output}
            </span>
          </div>
        ))}
      </div>
      <p className="eng-bottom-line">
        El mismo equipo nos va a acompañar durante todo el ejemplo.
      </p>
    </Frame>
  );
}

export function ConnectionsSlide() {
  return (
    <Frame
      number={5}
      label="Plugins, skills y MCP"
      title="Cómo le damos más capacidades."
      footer="Grok Bot: Marketplace → Your plugins para gestionar lo instalado y sus herramientas."
      className="eng-connections-slide"
    >
      <div className="eng-capabilities">
        <section>
          <span className="eng-overline slide-orange">El paquete</span>
          <h3>Plugin</h3>
          <p>
            Lo instalás para agregar skills, conexiones u otras capacidades.
          </p>
          <span className="eng-capability-example">
            pstack reúne skills de ingeniería.
          </span>
        </section>
        <section>
          <span className="eng-overline slide-blue">Cómo trabajar</span>
          <h3>Skill</h3>
          <p>Instrucciones que el bot puede seguir para repetir una tarea.</p>
          <span className="eng-capability-example">
            Cómo comprobar los adjuntos.
          </span>
        </section>
        <section>
          <span className="eng-overline slide-teal">Cómo conectarse</span>
          <h3>MCP</h3>
          <p>Un estándar para conectar herramientas y datos con la IA.</p>
          <span className="eng-capability-example">
            Un plugin puede incluir esa conexión.
          </span>
        </section>
      </div>
      <figure
        className="eng-connect-path"
        aria-label="Para conectar una app en Grok Bot: Marketplace, Add, conectar la cuenta y probar desde el chat"
      >
        <figcaption>Conectar una app en Grok Bot</figcaption>
        <ol>
          <li>
            <span>01</span>
            <strong>Marketplace</strong>
            <small>Elegí el plugin</small>
          </li>
          <li>
            <span>02</span>
            <strong>Add</strong>
            <small>Agregalo</small>
          </li>
          <li>
            <span>03</span>
            <strong>Conectá tu cuenta</strong>
            <small>Si requiere autenticación</small>
          </li>
          <li>
            <span>04</span>
            <strong>Probalo en el chat</strong>
            <small>@ conector · / skill</small>
          </li>
        </ol>
      </figure>
    </Frame>
  );
}

export function GroupSlide() {
  return (
    <Frame
      number={6}
      label="Coordinar"
      title="Lo hablamos en el grupo."
      footer="Conversación ilustrativa. La plantilla se puede adaptar a cualquier producto."
      className="eng-group-slide"
    >
      <div className="eng-group-layout">
        <div className="eng-group-story">
          <div className="eng-conversation-step">
            <span className="slide-blue">01 / Contexto</span>
            <h3>Antes de construir</h3>
            <p>
              Queremos adjuntar archivos a una tarea. Primero hay que definir
              cómo.
            </p>
          </div>
          <div className="eng-conversation-step">
            <span className="slide-teal">02 / Coordinación</span>
            <h3>Cada bot toma su parte</h3>
            <p>
              Las menciones dejan claro quién sigue. El equipo conserva el
              contexto.
            </p>
          </div>
          <div className="eng-conversation-step">
            <span className="slide-orange">03 / Seguimiento</span>
            <h3>Volvemos sobre lo pendiente</h3>
            <p>
              Rutinas como una daily. Si necesito un 1:1, se lo pido al bot.
            </p>
          </div>
        </div>
        <figure
          className="eng-chat-window"
          aria-label="Ejemplo de conversación entre vos, PO, Research y Builder"
        >
          <figcaption>
            Grupo / Nuestro producto <span>Ejemplo</span>
          </figcaption>
          <ChatMessage>
            Quiero adjuntar archivos a las tareas. Veamos qué necesitamos antes
            de construir.
          </ChatMessage>
          <ChatMessage role={roles[1]}>
            <b>@Research</b>, revisá cómo lo hacen otras apps. Después definimos
            el alcance; por ahora, sin tickets.
          </ChatMessage>
          <ChatMessage role={roles[0]}>
            Comparo las opciones y te traigo una propuesta con fuentes,{" "}
            <b>@PO</b>.
          </ChatMessage>
          <ChatMessage role={roles[2]}>
            Espero el ticket acordado. Me avisás cuando esté listo, <b>@PO</b>.
          </ChatMessage>
        </figure>
      </div>
      <div className="eng-memory-line">
        <span>Memoria compartida e individual</span>
        <span>Decisiones e historial → Linear</span>
      </div>
    </Frame>
  );
}

export function EnvironmentSlide() {
  return (
    <Frame
      number={7}
      label="Ejecutar"
      title="Un entorno listo para trabajar."
      footer="Implementación y verificación se ejecutan en Cursor Cloud Agents"
    >
      <figure
        className="eng-environment"
        aria-label="Builder y QA coordinan agentes de Cursor dentro de un entorno con los repositorios y herramientas del proyecto"
      >
        <div className="eng-coordinators">
          <div>
            <RoleBot role={roles[2]} />
            <strong>Builder</strong>
          </div>
          <div>
            <RoleBot role={roles[3]} />
            <strong>QA</strong>
          </div>
          <p>Piden el trabajo y le dan seguimiento</p>
        </div>
        <Arrow />
        <div className="eng-cloud">
          <span className="eng-overline">Cursor Cloud Agents</span>
          <h3>Un entorno con todo lo necesario</h3>
          <div className="eng-env-ingredients">
            <span>Repositorios</span>
            <span>Dependencias</span>
            <span>Variables de entorno</span>
          </div>
          <div className="eng-runtime">
            <span>Levantar la app</span>
            <span>Implementar</span>
            <span>Ejecutar verificaciones</span>
          </div>
        </div>
        <Arrow />
        <div className="eng-artifacts">
          <strong>Cambios</strong>
          <span>PRs en GitHub</span>
          <strong>Evidencia</strong>
          <span>Resultados y capturas</span>
        </div>
      </figure>
      <p className="eng-bottom-line">
        El bot puede pedir el cambio y volver a comprobarlo en ese entorno.
      </p>
    </Frame>
  );
}

export function PstackOriginSlide() {
  return (
    <Frame
      number={8}
      label="De dónde viene pstack"
      title="La forma de trabajar de Lauren."
      footer="Fuentes: perfil público de Lauren y README de pstack en cursor/plugins."
    >
      <div className="eng-origin">
        <div className="eng-author">
          <span className="eng-overline">La autora de pstack</span>
          <h3>
            Lauren<span className="slide-orange"> / @poteto</span>
          </h3>
          <p>
            Software Engineer en xAI.
            <br />
            React Compiler core team.
          </p>
          <div className="eng-author-history">
            <span>Experiencia en</span>
            <strong>Meta · Netflix · Cursor</strong>
          </div>
          <a href="https://github.com/poteto" target="_blank" rel="noreferrer">
            Perfil de Lauren ↗
          </a>
        </div>
        <div className="eng-origin-path">
          <div>
            <span className="slide-blue">01</span>
            <section>
              <h3>Experiencia en proyectos grandes</h3>
              <p>Revisar, probar y mantener código todos los días.</p>
            </section>
          </div>
          <div>
            <span className="slide-orange">02</span>
            <section>
              <h3>pstack</h3>
              <p>Un plugin con las skills que usaba en Cursor.</p>
            </section>
          </div>
          <div>
            <span className="slide-teal">03</span>
            <section>
              <h3>Tu proyecto</h3>
              <p>Una base que adaptás a tu app y a tus bots.</p>
            </section>
          </div>
          <a
            href="https://github.com/cursor/plugins/tree/main/pstack"
            target="_blank"
            rel="noreferrer"
          >
            Ver pstack en cursor/plugins ↗
          </a>
        </div>
      </div>
    </Frame>
  );
}

export function PstackSlide() {
  return (
    <Frame
      number={9}
      label="Método de trabajo"
      title={
        <>
          Enseñale cómo
          <br />
          comprobar tu app.
        </>
      }
      footer="pstack aporta las skills. control-ui y control-cli se suman desde cursor-team-kit."
    >
      <div className="eng-pstack">
        <div className="eng-mode">
          <span className="eng-overline">
            Una verification skill para tu proyecto
          </span>
          <h3>
            Pasos que el agente
            <br />
            pueda repetir.
          </h3>
          <div className="eng-skill-note">
            <span>Verificar archivos adjuntos</span>
            <ol>
              <li>Abrir una tarea.</li>
              <li>Adjuntar un archivo.</li>
              <li>Volver a abrirla y comprobar que sigue ahí.</li>
            </ol>
          </div>
        </div>
        <div className="eng-skill-path">
          <div>
            <span className="slide-blue">01</span>
            <section>
              <h3>Creá la skill con pstack</h3>
              <code>/create-verification-skill</code>
            </section>
          </div>
          <div>
            <span className="slide-teal">02</span>
            <section>
              <h3>Dale el contexto de tu app</h3>
              <p>Flujos, mapa de funcionalidades y tools.</p>
            </section>
          </div>
          <div>
            <span className="slide-orange">03</span>
            <section>
              <h3>Actualizala cuando algo cambie</h3>
              <code>/maintain-verification-skill</code>
            </section>
          </div>
        </div>
      </div>
    </Frame>
  );
}

export function ToolsSlide() {
  return (
    <Frame
      number={10}
      label="Ampliar capacidades"
      title={
        <>
          Dale herramientas
          <br />
          para hacer el trabajo.
        </>
      }
      footer="Ejemplo de una tool propia. Los comandos concretos dependen de cada proyecto."
    >
      <figure className="eng-tool-flow">
        <div className="eng-tool-step">
          <span className="eng-tool-symbol slide-blue" aria-hidden="true">
            01
          </span>
          <h3>La skill explica el flujo</h3>
          <p>
            El feature map ubica
            <br />
            cada parte de la app.
          </p>
          <div className="eng-example">Tarea → adjuntos → subir archivo</div>
        </div>
        <Arrow />
        <div className="eng-tool-step">
          <span className="eng-tool-symbol slide-orange" aria-hidden="true">
            &gt;_
          </span>
          <h3>La tool hace la operación</h3>
          <p>
            Un comando reutilizable
            <br />
            que el agente puede ejecutar.
          </p>
          <div className="eng-example">Recibe una tarea y un archivo</div>
        </div>
        <Arrow />
        <div className="eng-tool-step">
          <span className="eng-tool-symbol slide-teal" aria-hidden="true">
            ✓
          </span>
          <h3>QA comprueba el resultado</h3>
          <p>
            ¿El archivo aparece al
            <br />
            volver a abrir la tarea?
          </p>
          <div className="eng-example">
            Captura + resultado de la verificación
          </div>
        </div>
        <figcaption>
          Cuando cambia la app, el equipo puede volver a correr el mismo flujo.
        </figcaption>
      </figure>
    </Frame>
  );
}

export function FeedbackSlide() {
  const arrowId = useId();
  return (
    <Frame
      number={11}
      label="Verificar y corregir"
      title="Si algo falla, vuelve al equipo."
      footer="GitHub conecta el despliegue con Vercel / Railway. QA verifica el entorno develop."
    >
      <figure
        className="eng-feedback"
        aria-label="Builder prepara PR y CI, Walter revisa y hace merge y despliegue, QA verifica. Si falla, QA reporta a PO y Builder, Builder corrige y el ciclo se repite. Si pasa, PO cierra el ticket."
      >
        <svg
          className="eng-feedback-lines"
          viewBox="0 0 1000 340"
          aria-hidden="true"
        >
          <defs>
            <marker
              id={arrowId}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 10 5 0 10z" fill="currentColor" />
            </marker>
          </defs>
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            markerEnd={`url(#${arrowId})`}
          >
            <path d="M270 48H350" />
            <path d="M650 48H730" />
            <path className="eng-fail-line" d="M805 105V147H550V180" />
            <path className="eng-fail-line" d="M350 238H280" />
            <path className="eng-fail-line" d="M130 180V105" />
            <path className="eng-pass-line" d="M930 105V225" />
          </g>
        </svg>
        <div className="eng-flow-node eng-flow-builder">
          <span className="slide-orange">Builder</span>
          <strong>PR + CI</strong>
          <small>Cambio y checks automáticos</small>
        </div>
        <div className="eng-flow-node eng-flow-human">
          <span>Vos</span>
          <strong>Revisión + merge</strong>
          <small>Despliegue por CI/CD</small>
        </div>
        <div className="eng-flow-node eng-flow-qa">
          <span className="slide-pink">QA</span>
          <strong>Prueba los adjuntos</strong>
          <small>Mediante un Cloud Agent</small>
        </div>
        <span className="eng-branch-label eng-fail-label">Si falla</span>
        <span className="eng-branch-label eng-pass-label">Si pasa</span>
        <div className="eng-flow-node eng-flow-fix">
          <span className="slide-orange">Builder</span>
          <strong>Corrige</strong>
          <small>Código o cobertura de pruebas</small>
        </div>
        <div className="eng-flow-node eng-flow-report">
          <span className="slide-pink">QA reporta a PO + Builder</span>
          <strong>Qué probó y qué encontró</strong>
          <small>PO registra el seguimiento en Linear</small>
        </div>
        <div className="eng-flow-done">
          <span className="slide-teal">✓</span>
          <div>
            <strong>PO cierra</strong>
            <small>Ticket Done</small>
          </div>
        </div>
      </figure>
    </Frame>
  );
}

export function StartSlide() {
  return (
    <Frame
      number={12}
      label="Tu siguiente paso"
      title={
        <>
          Tu primer flujo
          <br />
          con Grok Bot.
        </>
      }
      footer="Una tarea concreta y un resultado que puedas comprobar."
      className="eng-start-slide"
    >
      <ol className="eng-start-steps">
        <li>
          <span>01</span>
          <div>
            <h3>Creá un bot con Dr Eggbot</h3>
            <p>Dale una responsabilidad y límites claros.</p>
          </div>
        </li>
        <li>
          <span>02</span>
          <div>
            <h3>Prepará su entorno y sus tools</h3>
            <p>Que pueda ejecutar la tarea y verificarla.</p>
          </div>
        </li>
        <li>
          <span>03</span>
          <div>
            <h3>Delegá y revisá la evidencia</h3>
            <p>Revisá qué hizo, qué probó y qué quedó pendiente.</p>
          </div>
        </li>
      </ol>
      <div className="eng-first-task">
        <span className="eng-overline">Para empezar</span>
        <p>
          “Ayudame a armar un bot que pueda comprobar este flujo de mi app.”
        </p>
        <span className="slide-orange">→ Dr Eggbot</span>
      </div>
      <div className="eng-resource-links">
        <a
          href="https://x.ai/bot/93gOz3op1UQdBdbekQFLK"
          target="_blank"
          rel="noreferrer"
        >
          Dr Eggbot ↗
        </a>
        <a
          href="https://github.com/cursor/plugins/tree/main/pstack"
          target="_blank"
          rel="noreferrer"
        >
          pstack ↗
        </a>
        <a
          href="https://x.com/poteto/status/2094457600259842065"
          target="_blank"
          rel="noreferrer"
        >
          Guía de Lauren ↗
        </a>
      </div>
    </Frame>
  );
}
