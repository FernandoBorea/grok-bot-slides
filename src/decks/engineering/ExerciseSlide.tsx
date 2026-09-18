import { Bot } from "../../components/Bot";

export function ExerciseSlide() {
  return (
    <section className="slide-canvas slide-exercise">
      <div className="slide-eyebrow">04 / De la idea a la práctica</div>
      <h2 className="slide-heading">
        Let's build<span className="slide-blue">.</span>
      </h2>
      <p className="slide-exercise-lead">
        Una mejora pequeña.
        <br />
        Un resultado que puedas mostrar.
      </p>
      <div className="slide-exercise-bottom">
        <div className="slide-time">
          <strong>08</strong>
          <span>minutos</span>
        </div>
        <ol className="slide-exercise-steps">
          <li>Elige una fricción real.</li>
          <li>Escribe un objetivo y sus límites.</li>
          <li>Construye, revisa y comparte.</li>
        </ol>
      </div>
      <Bot
        className="slide-bot slide-exercise-bot"
        seed={105}
        color="#1688ff"
        shape="flower"
      />
      <div className="slide-footer">
        <span>Lo pequeño también cuenta.</span>
        <span>Engineering / 05</span>
      </div>
    </section>
  );
}
