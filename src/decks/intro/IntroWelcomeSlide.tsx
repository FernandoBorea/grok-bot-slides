import { Bot } from "../../components/Bot";

export function IntroWelcomeSlide() {
  return (
    <section className="slide-canvas slide-template-cover">
      <div className="slide-eyebrow">Un punto de partida</div>
      <h1 className="slide-display">
        Grok Bot
        <br />
        101<span className="slide-blue">.</span>
      </h1>
      <p className="slide-template-caption">
        Una pregunta clara.
        <br />
        Tu primer experimento.
      </p>
      <div className="slide-template-bots" aria-hidden="true">
        <Bot className="slide-bot" seed={201} color="#1688ff" shape="round" />
        <Bot className="slide-bot" seed={202} color="#ff6b00" shape="flower" />
      </div>
      <div className="slide-footer">
        <span>Grok bot Slides</span>
        <span>101 / 01</span>
      </div>
    </section>
  );
}
