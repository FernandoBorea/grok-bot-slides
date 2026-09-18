import { Bot } from "../../components/Bot";

export function ContextSlide() {
  return (
    <section className="slide-canvas slide-context">
      <div className="slide-eyebrow">02 / Un buen punto de partida</div>
      <h2 className="slide-heading">
        Dale contexto.
        <br />
        <span className="slide-muted">Después, espacio.</span>
      </h2>
      <div className="slide-prompt">
        <div className="slide-prompt-label">
          <span className="slide-status-dot" /> Un prompt para probar
        </div>
        <p>Agrega filtros a la lista de proyectos.</p>
        <p className="slide-muted">
          Respeta los componentes existentes.
          <br />
          Mantén los filtros en la URL.
          <br />
          Verifica estados vacíos y navegación.
        </p>
        <div className="slide-prompt-cursor" aria-hidden="true">
          ↵
        </div>
      </div>
      <div className="slide-context-note">
        Objetivo + contexto + límites + evidencia
      </div>
      <Bot
        className="slide-bot slide-context-bot"
        seed={104}
        color="#ff2c9c"
        shape="triangle"
      />
      <div className="slide-footer">
        <span>Haz explícito lo que para ti es obvio.</span>
        <span>Engineering / 03</span>
      </div>
    </section>
  );
}
