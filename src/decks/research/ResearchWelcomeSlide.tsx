import { Bot } from "../../components/Bot";

export function ResearchWelcomeSlide() {
  return (
    <section className="slide-canvas slide-template-cover slide-research-cover">
      <div className="slide-eyebrow">Una pregunta. Muchas posibilidades.</div>
      <h1 className="slide-display">
        Grok Bot
        <br />
        for Research
        <br />
        &amp; Experiments<span className="slide-teal">.</span>
      </h1>
      <p className="slide-template-caption">
        Explora una idea.
        <br />
        Diseña cómo comprobarla.
      </p>
      <div className="slide-template-bots" aria-hidden="true">
        <Bot className="slide-bot" seed={151} color="#00b9aa" shape="square" />
        <Bot className="slide-bot" seed={152} color="#1688ff" shape="flower" />
      </div>
      <div className="slide-footer">
        <span>Grok bot Slides</span>
        <span>Research &amp; Experiments / 01</span>
      </div>
    </section>
  );
}
