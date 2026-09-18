import { Bot } from "../../components/Bot";

export function HypothesisSlide() {
  return (
    <section className="slide-canvas slide-shared-context">
      <div className="slide-eyebrow">01 / De la curiosidad a la evidencia</div>
      <h2 className="slide-heading">
        Una hipótesis.
        <br />
        <span className="slide-teal">Una prueba concreta.</span>
      </h2>
      <div className="slide-shared-columns">
        <div>
          <h3>Pregunta</h3>
          <p>Qué quieres entender y qué sabes hasta ahora.</p>
        </div>
        <div>
          <h3>Experimento</h3>
          <p>Qué vas a cambiar y qué vas a observar.</p>
        </div>
        <div>
          <h3>Evidencia</h3>
          <p>Qué resultado apoyaría o refutaría tu idea.</p>
        </div>
      </div>
      <Bot
        className="slide-bot slide-corner-bot"
        seed={153}
        color="#00b9aa"
        shape="flower"
      />
      <div className="slide-footer">
        <span>Distingue los hallazgos de las suposiciones.</span>
        <span>Research &amp; Experiments / 02</span>
      </div>
    </section>
  );
}
