import { Bot } from "../../components/Bot";

export function GtmWelcomeSlide() {
  return (
    <section className="slide-canvas slide-template-cover">
      <div className="slide-eyebrow">
        Plantilla / De la audiencia al mensaje
      </div>
      <h1 className="slide-display">
        Grok Bot
        <br />
        for GTM<span className="slide-pink">.</span>
      </h1>
      <p className="slide-template-caption">
        Una audiencia concreta.
        <br />
        Un mensaje para probar.
      </p>
      <div className="slide-template-bots" aria-hidden="true">
        <Bot className="slide-bot" seed={140} color="#ff2c9c" shape="flower" />
        <Bot className="slide-bot" seed={141} color="#ff6b00" shape="round" />
      </div>
      <div className="slide-footer">
        <span>Grok bot Slides</span>
        <span>GTM / 01</span>
      </div>
    </section>
  );
}
