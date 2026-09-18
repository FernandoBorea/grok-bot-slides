import { Bot } from "../../components/Bot";

export function ClosingSlide() {
  return (
    <section className="slide-canvas slide-closing">
      <div className="slide-eyebrow">Esto es solo el comienzo</div>
      <h2 className="slide-display">
        Mejores preguntas.
        <br />
        Mejor software<span className="slide-pink">.</span>
      </h2>
      <p className="slide-closing-caption">
        Llévate una idea.
        <br />
        Ponla a prueba mañana.
      </p>
      <div className="slide-closing-bots" aria-hidden="true">
        <Bot
          className="slide-bot"
          seed={101}
          color="#ff2c9c"
          shape="triangle"
        />
        <Bot className="slide-bot" seed={102} color="#00b9aa" shape="square" />
        <Bot className="slide-bot" seed={103} color="#ff6b00" shape="round" />
      </div>
      <div className="slide-footer">
        <span>Gracias por construir con nosotros.</span>
        <span>Engineering / 06</span>
      </div>
    </section>
  );
}
