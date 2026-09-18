import { Bot } from "../../components/Bot";

export function ProcessExerciseSlide() {
  return (
    <section className="slide-canvas slide-exercise">
      <div className="slide-eyebrow">02 / De la rutina a la mejora</div>
      <h2 className="slide-heading">
        Mejora un paso<span className="slide-teal">.</span>
      </h2>
      <p className="slide-exercise-lead">
        Una tarea que se repite.
        <br />
        Una checklist para probar.
      </p>
      <div className="slide-exercise-bottom">
        <div className="slide-time">
          <strong>05</strong>
          <span>minutos</span>
        </div>
        <ol className="slide-exercise-steps">
          <li>Describe entrada, pasos y salida.</li>
          <li>Pide una checklist breve.</li>
          <li>Prueba un caso y una excepción.</li>
        </ol>
      </div>
      <Bot
        className="slide-bot slide-exercise-bot"
        seed={153}
        color="#00b9aa"
        shape="flower"
      />
      <div className="slide-footer">
        <span>Primero entiende la rutina. Después, mejórala.</span>
        <span>Ops / 03</span>
      </div>
    </section>
  );
}
