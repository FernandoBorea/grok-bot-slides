import { Bot } from "../../components/Bot";

export function SmallestTestSlide() {
  return (
    <section className="slide-canvas slide-experiment">
      <div className="slide-eyebrow">02 / Práctica · 5 minutos</div>
      <h2 className="slide-heading">
        Una hipótesis.
        <br />
        <span className="slide-pink">Una prueba pequeña.</span>
      </h2>
      <div className="slide-experiment-options">
        <div>
          <span>01</span>
          <h3>Escribe el supuesto</h3>
          <p>¿Qué necesitas aprender primero?</p>
        </div>
        <div>
          <span>02</span>
          <h3>Prepara la prueba</h3>
          <p>Un boceto, una entrevista o una demostración.</p>
        </div>
        <div>
          <span>03</span>
          <h3>Define una señal</h3>
          <p>¿Qué resultado cambiaría tu siguiente paso?</p>
        </div>
      </div>
      <Bot
        className="slide-bot slide-corner-bot"
        seed={214}
        color="#ff6b00"
        shape="flower"
      />
      <div className="slide-footer">
        <span>Usa el bot para preparar la prueba; observa lo que sucede.</span>
        <span>Founders / 03</span>
      </div>
    </section>
  );
}
