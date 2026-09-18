import { Bot } from "../../components/Bot";

export function FoundersWelcomeSlide() {
  return (
    <section className="slide-canvas slide-template-cover">
      <div className="slide-eyebrow">De la intuición a la prueba</div>
      <h1 className="slide-display">
        Grok Bot
        <br />
        for Founders<span className="slide-pink">.</span>
      </h1>
      <p className="slide-template-caption">
        Aclara una idea.
        <br />
        Hazla comprobable.
      </p>
      <div className="slide-template-bots" aria-hidden="true">
        <Bot className="slide-bot" seed={211} color="#ff2c9c" shape="flower" />
        <Bot className="slide-bot" seed={212} color="#ff6b00" shape="round" />
      </div>
      <div className="slide-footer">
        <span>Grok bot Slides</span>
        <span>Founders / 01</span>
      </div>
    </section>
  );
}
