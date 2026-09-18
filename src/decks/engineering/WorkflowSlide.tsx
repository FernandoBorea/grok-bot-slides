import { Bot } from "../../components/Bot";

export function WorkflowSlide() {
  return (
    <section className="slide-canvas slide-workflow">
      <div className="slide-eyebrow">01 / Empezar por el problema</div>
      <h2 className="slide-heading">
        Del contexto
        <br />
        al código que funciona.
      </h2>
      <div className="slide-workflow-line">
        <div className="slide-workflow-step">
          <span className="slide-step-number">01</span>
          <h3>Entender</h3>
          <p>
            Qué buscamos.
            <br />
            Qué existe.
          </p>
        </div>
        <span className="slide-workflow-arrow" aria-hidden="true">
          ↗
        </span>
        <div className="slide-workflow-step">
          <span className="slide-step-number">02</span>
          <h3>Construir</h3>
          <p>
            Cambios pequeños.
            <br />
            Intención clara.
          </p>
        </div>
        <span className="slide-workflow-arrow" aria-hidden="true">
          ↗
        </span>
        <div className="slide-workflow-step">
          <span className="slide-step-number">03</span>
          <h3>Verificar</h3>
          <p>
            Evidencia real.
            <br />
            Criterio humano.
          </p>
        </div>
      </div>
      <Bot
        className="slide-bot slide-corner-bot"
        seed={111}
        color="#00b9aa"
        shape="square"
      />
      <div className="slide-footer">
        <span>La calidad empieza antes del primer prompt.</span>
        <span>Engineering / 02</span>
      </div>
    </section>
  );
}
