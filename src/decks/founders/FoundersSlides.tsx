import type { ReactNode } from "react";
import { Bot } from "../../components/Bot";
import type { BotShape } from "../../bot/model";
import boreaAdmin from "./assets/borea-admin.png";
import portfolioLab from "./assets/portfolio-lab.png";
import "./founders.css";

type PodMember = {
  name: string;
  role: string;
  verb: string;
  color: string;
  shape: BotShape;
  seed: number;
};

const andy: PodMember = {
  name: "Andy",
  role: "EA",
  verb: "Sostiene el día",
  color: "var(--slide-blue)",
  shape: "hexagon",
  seed: 301,
};

const marie: PodMember = {
  name: "Marie",
  role: "Experiments Lead",
  verb: "Diseña pruebas",
  color: "#22c55e",
  shape: "triangle",
  seed: 310,
};

const tej: PodMember = {
  name: "Tej",
  role: "Research",
  verb: "Trae hallazgos",
  color: "#ef4444",
  shape: "flower",
  seed: 311,
};

const chuck: PodMember = {
  name: "Chuck",
  role: "Critic",
  verb: "Cuestiona el plan",
  color: "#8b5cf6",
  shape: "round",
  seed: 312,
};

const harvey: PodMember = {
  name: "Harvey",
  role: "PO",
  verb: "Acuerda el alcance",
  color: "#16a34a",
  shape: "round",
  seed: 313,
};

const letty: PodMember = {
  name: "Letty",
  role: "Design",
  verb: "Da forma a la UI",
  color: "var(--slide-pink)",
  shape: "hexagon",
  seed: 314,
};

const mike: PodMember = {
  name: "Mike",
  role: "Forge",
  verb: "Construye el corte",
  color: "var(--slide-teal)",
  shape: "flower",
  seed: 315,
};

const pod: PodMember[] = [marie, tej, chuck, harvey, andy, letty, mike];

const modeRows = [
  { label: "Contexto", ask: "Vos lo recordás", process: "Vive en el SOP" },
  { label: "Repetición", ask: "Cada pedido es nuevo", process: "El flujo se reusa" },
  {
    label: "Escalabilidad",
    ask: "Repetís el proceso desde otro lugar",
    process: "Mejora cada vez que se usa",
  },
];

const loopSteps = ["Revisar", "Filtrar", "Etiquetar", "Priorizar", "Reportar"];

const knowledgeNodes = [
  { name: "Operación", note: "Rutinas y correos" },
  { name: "Productos", note: "Briefs y prototipos" },
  { name: "Decisiones", note: "Qué quedó cerrado" },
  { name: "Notas", note: "Contexto vivo" },
];

const stackTools: { name: string; mark: ReactNode }[] = [
  {
    name: "Notion",
    mark: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M4.459 4.208c.746.606 1.048.703 2.434.747C7.351 5.003 7.824 5 8.124 5c.26 0 .7.01 1.283.023V19.07c0 .49-.05.688-.285.88-.47.348-1.33.698-2.023.698-.7 0-1.17-.197-1.767-.615L4.46 19.4V4.208zm7.288.043c.936-.067 2.167-.112 3.348-.112 1.317 0 2.568.076 3.354.228 1.288.246 2.133.738 2.133 2.245v8.93c0 1.468-.71 2.11-2.226 2.431-1.017.21-2.35.285-3.676.285-1.42 0-2.796-.095-3.684-.313-1.42-.34-2.086-.995-2.086-2.406V6.64c0-1.506.854-2.083 2.226-2.367.398-.085.89-.152 1.561-.152.4 0 .74.02.95.057v10.02c.19.038.493.057.853.057.796 0 1.232-.21 1.232-.9V6.88c-.284-.047-.682-.066-1.136-.066-.398 0-.74.019-.948.057V4.25z"
        />
      </svg>
    ),
  },
  {
    name: "Vercel",
    mark: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M12 2L2 19.875h20L12 2z" />
      </svg>
    ),
  },
  {
    name: "Neon",
    mark: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M3 4.5A1.5 1.5 0 014.5 3h6.75a1.5 1.5 0 011.5 1.5v6.75a1.5 1.5 0 01-1.5 1.5H9.75v4.25A2.5 2.5 0 017.25 20H4.5A1.5 1.5 0 013 18.5V4.5zm9.75 7.5a1.5 1.5 0 011.5-1.5H18A1.5 1.5 0 0119.5 12v7.5A1.5 1.5 0 0118 21h-3.75a1.5 1.5 0 01-1.5-1.5V12z"
        />
      </svg>
    ),
  },
  {
    name: "Cloudflare",
    mark: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M16.508 16.845c.21-.722.116-1.388-.264-1.894-.353-.47-.917-.746-1.583-.78l-8.009-.1a.35.35 0 01-.296-.168.36.36 0 01.012-.37.74.74 0 01.63-.34h.02l8.063.101c1.52.076 3.155-1.06 3.72-2.647a3.7 3.7 0 00.19-1.03A5.615 5.615 0 0012.5 4.01a5.64 5.64 0 00-5.45 4.15 3.37 3.37 0 00-2.52-.54 3.4 3.4 0 00-2.84 3.01 3.3 3.3 0 00.04.66A4.51 4.51 0 000 15.34c0 .14.007.28.022.42.03.14.15.24.29.24h15.7c.16 0 .31-.1.36-.25l.136-.905zm2.63-2.27a.47.47 0 00-.36-.21h-.09c-.9-.05-1.5-.3-1.84-.75a1.57 1.57 0 01-.23-.53l-.2-.95a.35.35 0 00-.34-.27H5.85a.35.35 0 00-.34.44l.34 1.28c.06.24.28.41.52.41h11.98c.2 0 .38-.12.45-.3l.37-.87a.47.47 0 00-.04-.4z"
        />
      </svg>
    ),
  },
  {
    name: "Google Workspace",
    mark: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#4285F4" d="M12 12.5v9l8-4.5v-9l-8 4.5z" />
        <path fill="#34A853" d="M4 17l8 4.5v-9L4 7.5V17z" />
        <path fill="#FBBC05" d="M12 2.5L4 7.5l8 4.5 8-4.5L12 2.5z" />
        <path fill="#EA4335" d="M4 7.5v9.5l3-1.7V9.2L4 7.5z" />
      </svg>
    ),
  },
];

function Frame({
  number,
  label,
  title,
  footer,
  children,
  className = "",
}: {
  number: number;
  label?: string;
  title: ReactNode;
  footer?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`slide-canvas fd-slide ${className}`}>
      {label ? <div className="slide-eyebrow">{label}</div> : null}
      <h2 className="fd-title">{title}</h2>
      <div className="fd-content">{children}</div>
      <div className="slide-footer">
        <span>{footer ?? ""}</span>
        <span>Grok Bot for Founders / {String(number).padStart(2, "0")}</span>
      </div>
    </section>
  );
}

function PodBot({
  member,
  className = "",
}: {
  member: PodMember;
  className?: string;
}) {
  return (
    <Bot
      className={`fd-bot ${className}`}
      seed={member.seed}
      color={member.color}
      shape={member.shape}
    />
  );
}

export function FoundersTitleSlide() {
  return (
    <section className="slide-canvas fd-slide fd-cover">
      <div className="slide-eyebrow">Founders · 15 min</div>
      <h1 className="fd-cover-title">
        Grok Bot
        <br />
        for Founders<span className="slide-pink">.</span>
      </h1>
      <p className="fd-cover-caption">
        ¿Cómo usar Grok Bot para hacer crecer tu empresa?
      </p>
      <div className="fd-cover-bots" aria-hidden="true">
        {pod.map((member) => (
          <PodBot key={member.name} member={member} className="fd-bot-cover" />
        ))}
      </div>
      <div className="slide-footer">
        <span />
        <span>Grok Bot for Founders / 01</span>
      </div>
    </section>
  );
}

export function AndySlide() {
  return (
    <Frame
      number={2}
      label="Tu EA"
      title={
        <>
          Andy<span className="slide-blue">.</span>
        </>
      }
      footer="Correos, calendario y rutinas, con nombre y cara."
      className="fd-andy-slide"
    >
      <div className="fd-andy-layout">
        <div className="fd-andy-hero">
          <PodBot member={andy} className="fd-bot-hero" />
          <div>
            <span className="fd-andy-role slide-blue">Exec. Assistant</span>
            <h3>Tu EA en Grok Bot</h3>
            <p>Un bot que te ayuda a manejar las operaciones del día a día</p>
          </div>
        </div>
        <ul className="fd-andy-duties">
          <li>
            <span className="slide-blue">01</span>
            <div>
              <strong>Correos</strong>
              <p>Revisa, filtra y deja lo que importa a la vista.</p>
            </div>
          </li>
          <li>
            <span className="slide-blue">02</span>
            <div>
              <strong>Calendario</strong>
              <p>Prepara el día y avisa si las agendas chocan.</p>
            </div>
          </li>
          <li>
            <span className="slide-blue">03</span>
            <div>
              <strong>Rutinas</strong>
              <p>Repite procesos que vos definís una vez.</p>
            </div>
          </li>
        </ul>
      </div>
    </Frame>
  );
}

export function DosModosSlide() {
  return (
    <Frame
      number={3}
      title={
        <>
          Pedir cosas vs
          <br />
          definir procesos.
        </>
      }
      className="fd-modes-slide"
    >
      <div className="fd-compare">
        <div className="fd-compare-head">
          <span className="fd-compare-spacer" aria-hidden="true" />
          <h3>Sólo le pido cosas</h3>
          <h3 className="fd-compare-accent">Procesos definidos</h3>
        </div>
        {modeRows.map((row) => (
          <div className="fd-compare-row" key={row.label}>
            <span className="fd-compare-label">{row.label}</span>
            <p>{row.ask}</p>
            <p className="fd-compare-accent-cell">{row.process}</p>
          </div>
        ))}
      </div>
    </Frame>
  );
}

export function LoopsSlide() {
  return (
    <Frame
      number={4}
      label="Flujos que te devuelven el tiempo"
      title={
        <>
          Un proceso, dos flujos
        </>
      }
      footer="Diseñar el proceso > pedir favores"
      className="fd-loops-slide"
    >
      <p className="fd-pipeline-sub">
        Flujos para administrar correos y agendas
      </p>
      <figure
        className="fd-pipeline"
        aria-label="Flujo compartido para correos y agendas"
      >
        <ol className="fd-pipeline-steps">
          {loopSteps.map((step, i) => (
            <li key={step}>
              {i > 0 && (
                <span className="fd-pipeline-arrow" aria-hidden="true">
                  →
                </span>
              )}
              <div className="fd-pipeline-box">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
              </div>
            </li>
          ))}
          <li className="fd-pipeline-return" aria-hidden="true">
            <span className="fd-pipeline-arrow fd-pipeline-return-arrow">↩</span>
          </li>
        </ol>
      </figure>
      <p className="fd-pipeline-payoff">
        Diseñar el proceso <span className="slide-pink">&gt;</span> pedir
        favores
      </p>
    </Frame>
  );
}

export function AvanzadoSlide() {
  return (
    <Frame
      number={5}
      label="¿Y lo más avanzado?"
      title={
        <>
          Un solo asistente
          <br />
          no alcanza.
        </>
      }
      className="fd-avanzado-slide"
    >
      <div className="fd-advanced">
        <div className="fd-advanced-cards">
          <section>
            <span className="fd-overline">El límite</span>
            <h3>Una bandeja, muchas apps</h3>
            <p>
              Cuando el trabajo cruza correo, docs, deploy y base de datos, un
              chat aislado pierde el hilo.
            </p>
          </section>
          <section>
            <span className="fd-overline slide-pink">La solución</span>
            <h3>Contexto compartido</h3>
            <p>
              Hace falta un lugar donde decisiones, briefs y estado vivan fuera
              de la conversación.
            </p>
          </section>
        </div>
        <p className="fd-advanced-line">El trabajo entre herramientas.</p>
      </div>
    </Frame>
  );
}

export function CerebroSlide() {
  return (
    <Frame
      number={6}
      label="Cerebro compartido"
      title={
        <>
          Un espacio de trabajo,
          <br />
          compartido entre herramientas.
        </>
      }
      footer="Árbol simple + herramientas que ya usás."
      className="fd-cerebro-slide"
    >
      <figure className="fd-hq" aria-label="Mapa de tipos de contenido">
        <ul className="fd-hq-branches">
          {knowledgeNodes.map((node) => (
            <li key={node.name}>
              <strong>{node.name}</strong>
              <span>{node.note}</span>
            </li>
          ))}
        </ul>
      </figure>
      <div className="fd-logo-block">
        <p className="fd-logo-title">
          Nivel avanzado: mapa de conocimiento + herramientas
        </p>
        <ul className="fd-logo-row" aria-label="Herramientas en la mesa">
          {stackTools.map((tool) => (
            <li key={tool.name}>
              <span className="fd-logo-mark" aria-hidden="true">
                {tool.mark}
              </span>
              <span>{tool.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </Frame>
  );
}

export function ConstruirSlide() {
  return (
    <Frame
      number={7}
      title={
        <>
          ¿Qué más es posible?
        </>
      }
      className="fd-build-slide"
    >
      <div className="fd-build-path">
        <div className="fd-build-step">
          <span className="slide-blue">01</span>
          <h3>Operar</h3>
          <p>Andy sostiene correos, agenda y rutinas.</p>
        </div>
        <span className="fd-build-arrow" aria-hidden="true">
          →
        </span>
        <div className="fd-build-step">
          <span className="slide-pink">02</span>
          <h3>Contexto</h3>
          <p>El trabajo vive en un espacio compartido.</p>
        </div>
        <span className="fd-build-arrow" aria-hidden="true">
          →
        </span>
        <div className="fd-build-step">
          <span className="slide-teal">03</span>
          <h3>Construir</h3>
        </div>
      </div>
    </Frame>
  );
}

export function PodSlide() {
  return (
    <Frame
      number={8}
      title="El equipo de trabajo"
      footer="Vos decidís y hacés merge."
      className="fd-pod-slide"
    >
      <div className="fd-pod-loop" aria-label="Flujo del equipo">
        <div className="fd-pod-loop-main">
          <article className="fd-pod-card">
            <PodBot member={harvey} />
            <h3>Harvey</h3>
            <p className="fd-pod-role">PO · specs</p>
          </article>
          <span className="fd-pod-flow-arrow" aria-hidden="true">
            →
          </span>
          <article className="fd-pod-card">
            <PodBot member={tej} />
            <h3>Tej</h3>
            <p className="fd-pod-role">Research</p>
          </article>
          <span className="fd-pod-flow-arrow" aria-hidden="true">
            →
          </span>
          <article className="fd-pod-card fd-pod-card-pair">
            <div className="fd-pod-pair-bots">
              <PodBot member={mike} />
              <PodBot member={letty} />
            </div>
            <h3>Mike + Letty</h3>
            <p className="fd-pod-role">Build</p>
          </article>
          <span className="fd-pod-flow-arrow" aria-hidden="true">
            →
          </span>
          <article className="fd-pod-card">
            <PodBot member={chuck} />
            <h3>Chuck</h3>
            <p className="fd-pod-role">Reviews</p>
          </article>
        </div>
        <div className="fd-pod-loop-support">
          <article className="fd-pod-card fd-pod-support">
            <PodBot member={andy} />
            <h3>Andy</h3>
            <p className="fd-pod-role">EA · alimenta a Harvey</p>
          </article>
          <article className="fd-pod-card fd-pod-support">
            <PodBot member={marie} />
            <h3>Marie</h3>
            <p className="fd-pod-role">Experiments · alimenta a Harvey</p>
          </article>
          <p className="fd-pod-flow-line">
            Harvey specs → Tej research → Mike + Letty build → Chuck reviews
          </p>
        </div>
      </div>
    </Frame>
  );
}

export function PruebaSlide() {
  return (
    <Frame
      number={9}
      label="Prueba en pantalla"
      title={
        <>
          El prototipo,
          <br />
          en captura.
        </>
      }
      footer="Admin overview y Portfolio lab."
      className="fd-prueba-slide"
    >
      <div className="fd-shot-row">
        <figure className="fd-shot">
          <div className="fd-shot-chrome">
            <span />
            <span />
            <span />
          </div>
          <div className="fd-shot-body fd-shot-body-img">
            <img src={boreaAdmin} alt="Borea admin overview" />
          </div>
          <figcaption>Admin overview</figcaption>
        </figure>
        <figure className="fd-shot">
          <div className="fd-shot-chrome">
            <span />
            <span />
            <span />
          </div>
          <div className="fd-shot-body fd-shot-body-img">
            <img src={portfolioLab} alt="Portfolio builder lab" />
          </div>
          <figcaption>Portfolio lab</figcaption>
        </figure>
      </div>
    </Frame>
  );
}

export function ForLoopSlide() {
  return (
    <section className="slide-canvas fd-slide fd-for-slide">
      <pre className="fd-for-hero" aria-label="Bucle conceptual de construcción">
        <code>
          {"for (counter; ¿seguimos?; Registrar)"}
          {"\n"}
          {"{"}
          {"\n"}
          {"  Código"}
          {"\n"}
          {"}"}
        </code>
      </pre>
    </section>
  );
}

export function CierreSlide() {
  return (
    <section className="slide-canvas fd-slide fd-cierre">
      <div className="slide-eyebrow">Cierre</div>
      <h1 className="fd-cierre-title">
        Atrévete
        <br />
        a construir<span className="slide-pink">.</span>
      </h1>
      <p className="fd-cierre-caption">
        Operá. Definí el proceso. Compartí el cerebro.
        <br />
        Después, prototipá en la misma mesa.
      </p>
      <div className="fd-cierre-bots" aria-hidden="true">
        {pod.map((member) => (
          <PodBot key={member.name} member={member} />
        ))}
      </div>
      <div className="slide-footer">
        <span>De la operación al prototipo</span>
        <span>Grok Bot for Founders / 11</span>
      </div>
    </section>
  );
}
