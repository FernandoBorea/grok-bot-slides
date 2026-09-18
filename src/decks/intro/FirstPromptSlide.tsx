import { Bot } from "../../components/Bot";

export function FirstPromptSlide() {
  return (
    <section className="slide-canvas slide-experiment">
      <div className="slide-eyebrow">02 / Práctica · 5 minutos</div>
      <h2 className="slide-heading">
        Empieza con
        <br />
        <span className="slide-blue">una tarea pequeña.</span>
      </h2>
      <div className="slide-experiment-options">
        <div>
          <span>01</span>
          <h3>Elige una tarea</h3>
          <p>Algo que puedas revisar en pocos minutos.</p>
        </div>
        <div>
          <span>02</span>
          <h3>Escribe tu pedido</h3>
          <p>Objetivo, contexto y resultado esperado.</p>
        </div>
        <div>
          <span>03</span>
          <h3>Compara y ajusta</h3>
          <p>¿Qué cambió al agregar más contexto?</p>
        </div>
      </div>
      <Bot
        className="slide-bot slide-corner-bot"
        seed={204}
        color="#ff6b00"
        shape="flower"
      />
      <div className="slide-footer">
        <span>Guarda un ejemplo que te sirva para volver a empezar.</span>
        <span>101 / 03</span>
      </div>
    </section>
  );
}
