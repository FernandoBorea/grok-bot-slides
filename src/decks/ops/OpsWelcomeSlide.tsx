import { Bot } from "../../components/Bot";

export function OpsWelcomeSlide() {
  return (
    <section className="slide-canvas slide-template-cover">
      <div className="slide-eyebrow">Plantilla / Una operación más clara</div>
      <h1 className="slide-display">
        Grok Bot
        <br />
        for Ops<span className="slide-teal">.</span>
      </h1>
      <p className="slide-template-caption">
        Entiende el proceso.
        <br />
        Mejora un paso a la vez.
      </p>
      <div className="slide-template-bots" aria-hidden="true">
        <Bot className="slide-bot" seed={150} color="#00b9aa" shape="square" />
        <Bot className="slide-bot" seed={151} color="#1688ff" shape="round" />
      </div>
      <div className="slide-footer">
        <span>Grok bot Slides</span>
        <span>Ops / 01</span>
      </div>
    </section>
  );
}
