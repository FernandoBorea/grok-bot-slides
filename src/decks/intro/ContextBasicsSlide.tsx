import { Bot } from "../../components/Bot";

export function ContextBasicsSlide() {
  return (
    <section className="slide-canvas slide-shared-context">
      <div className="slide-eyebrow">01 / Antes de pedir una respuesta</div>
      <h2 className="slide-heading">
        Dale contexto.
        <br />
        <span className="slide-blue">Pide algo concreto.</span>
      </h2>
      <div className="slide-shared-columns">
        <div>
          <h3>Objetivo</h3>
          <p>
            Qué quieres resolver
            <br />y para quién.
          </p>
        </div>
        <div>
          <h3>Contexto</h3>
          <p>
            Lo que ya sabes,
            <br />
            ejemplos y límites.
          </p>
        </div>
        <div>
          <h3>Resultado</h3>
          <p>
            Qué esperas recibir
            <br />y cómo lo revisarás.
          </p>
        </div>
      </div>
      <Bot
        className="slide-bot slide-corner-bot"
        seed={203}
        color="#1688ff"
        shape="square"
      />
      <div className="slide-footer">
        <span>Revisa la respuesta. Ajusta la pregunta.</span>
        <span>101 / 02</span>
      </div>
    </section>
  );
}
