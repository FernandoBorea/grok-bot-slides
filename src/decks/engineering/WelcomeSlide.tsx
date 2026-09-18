import { Bot } from "../../components/Bot";

export function WelcomeSlide() {
  return (
    <section className="slide-canvas slide-welcome">
      <div className="slide-eyebrow">Una nueva forma de construir</div>
      <h1 className="slide-display">
        Grok Bot
        <br />
        for Engineering<span className="slide-orange">.</span>
      </h1>
      <p className="slide-welcome-caption">
        Menos fricción.
        <br />
        Más ideas en producción.
      </p>
      <div className="slide-welcome-bots" aria-hidden="true">
        <Bot
          className="slide-bot slide-welcome-bot-blue"
          seed={107}
          color="#1688ff"
          shape="round"
        />
        <Bot
          className="slide-bot slide-welcome-bot-orange"
          seed={108}
          color="#ff6b00"
          shape="round"
        />
        <Bot
          className="slide-bot slide-welcome-bot-teal"
          seed={109}
          color="#00b9aa"
          shape="square"
        />
        <Bot
          className="slide-bot slide-welcome-bot-pink"
          seed={110}
          color="#ff2c9c"
          shape="triangle"
        />
      </div>
      <div className="slide-footer">
        <span>Grok bot Slides</span>
        <span>Engineering / 01</span>
      </div>
    </section>
  );
}
