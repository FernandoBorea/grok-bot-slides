import { Bot } from "../../components/Bot";

export function IdeaToQuestionSlide() {
  return (
    <section className="slide-canvas slide-shared-context">
      <div className="slide-eyebrow">01 / Define qué necesitas aprender</div>
      <h2 className="slide-heading">
        De una idea
        <br />
        <span className="slide-pink">a una pregunta.</span>
      </h2>
      <div className="slide-shared-columns">
        <div>
          <h3>Problema</h3>
          <p>
            Quién lo encuentra
            <br />y en qué situación.
          </p>
        </div>
        <div>
          <h3>Supuesto</h3>
          <p>
            Qué crees que ocurre
            <br />y aún no comprobaste.
          </p>
        </div>
        <div>
          <h3>Señal</h3>
          <p>
            Qué observarías
            <br />
            para decidir el siguiente paso.
          </p>
        </div>
      </div>
      <Bot
        className="slide-bot slide-corner-bot"
        seed={213}
        color="#ff2c9c"
        shape="square"
      />
      <div className="slide-footer">
        <span>Distingue lo que sabes de lo que necesitas comprobar.</span>
        <span>Founders / 02</span>
      </div>
    </section>
  );
}
