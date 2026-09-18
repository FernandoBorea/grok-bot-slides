import { Bot } from "../../components/Bot";

export function MessageExerciseSlide() {
  return (
    <section className="slide-canvas slide-exercise">
      <div className="slide-eyebrow">02 / Un mensaje para probar</div>
      <h2 className="slide-heading">
        Escribe. Compara<span className="slide-pink">.</span>
      </h2>
      <p className="slide-exercise-lead">
        Dos versiones de un mensaje.
        <br />
        Una hipótesis que puedas revisar.
      </p>
      <div className="slide-exercise-bottom">
        <div className="slide-time">
          <strong>05</strong>
          <span>minutos</span>
        </div>
        <ol className="slide-exercise-steps">
          <li>Elige audiencia, canal y objetivo.</li>
          <li>Pide dos enfoques distintos.</li>
          <li>Revisa las promesas y el siguiente paso.</li>
        </ol>
      </div>
      <Bot
        className="slide-bot slide-exercise-bot"
        seed={143}
        color="#ff2c9c"
        shape="round"
      />
      <div className="slide-footer">
        <span>Guarda un borrador y una forma de evaluarlo.</span>
        <span>GTM / 03</span>
      </div>
    </section>
  );
}
