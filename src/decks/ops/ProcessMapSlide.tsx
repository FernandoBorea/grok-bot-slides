import { Bot } from "../../components/Bot";

export function ProcessMapSlide() {
  return (
    <section className="slide-canvas slide-shared-context">
      <div className="slide-eyebrow">01 / Haz visible el proceso</div>
      <h2 className="slide-heading">
        Del paso repetido
        <br />
        <span className="slide-teal">al proceso claro.</span>
      </h2>
      <div className="slide-shared-columns">
        <div>
          <h3>Entrada</h3>
          <p>Qué inicia la tarea y qué información necesitas.</p>
        </div>
        <div>
          <h3>Decisión</h3>
          <p>Qué regla aplicas y quién resuelve las excepciones.</p>
        </div>
        <div>
          <h3>Salida</h3>
          <p>Qué entregas y cómo compruebas que está listo.</p>
        </div>
      </div>
      <Bot
        className="slide-bot slide-corner-bot"
        seed={152}
        color="#00b9aa"
        shape="square"
      />
      <div className="slide-footer">
        <span>Reemplaza esta base con un proceso de tu equipo.</span>
        <span>Ops / 02</span>
      </div>
    </section>
  );
}
