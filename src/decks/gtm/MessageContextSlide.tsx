import { Bot } from "../../components/Bot";

export function MessageContextSlide() {
  return (
    <section className="slide-canvas slide-shared-context">
      <div className="slide-eyebrow">01 / El contexto del mensaje</div>
      <h2 className="slide-heading">
        Antes del copy,
        <br />
        <span className="slide-pink">la persona.</span>
      </h2>
      <div className="slide-shared-columns">
        <div>
          <h3>Audiencia</h3>
          <p>Quién lo va a leer y qué intenta resolver.</p>
        </div>
        <div>
          <h3>Evidencia</h3>
          <p>Qué puedes demostrar sobre tu propuesta.</p>
        </div>
        <div>
          <h3>Acción</h3>
          <p>Qué paso quieres que dé esa persona.</p>
        </div>
      </div>
      <Bot
        className="slide-bot slide-corner-bot"
        seed={142}
        color="#ff2c9c"
        shape="flower"
      />
      <div className="slide-footer">
        <span>Reemplaza esta base con un caso de tu equipo.</span>
        <span>GTM / 02</span>
      </div>
    </section>
  );
}
