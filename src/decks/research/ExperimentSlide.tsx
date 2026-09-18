import { Bot } from "../../components/Bot";

export function ExperimentSlide() {
  return (
    <section className="slide-canvas slide-share">
      <div className="slide-eyebrow">
        02 / Tu primer experimento · 5 minutos
      </div>
      <h2 className="slide-display">
        Pregunta.
        <br />
        Prueba.
        <br />
        <span className="slide-teal">Aprende.</span>
      </h2>
      <p className="slide-share-note">
        ¿Qué esperas ver?
        <br />
        ¿Cómo lo medirás?
        <br />
        ¿Qué cambiaría tu idea?
      </p>
      <Bot
        className="slide-bot slide-share-bot"
        seed={154}
        color="#1688ff"
        shape="round"
      />
      <div className="slide-footer">
        <span>Registra también lo que no funcionó.</span>
        <span>Research &amp; Experiments / 03</span>
      </div>
    </section>
  );
}
