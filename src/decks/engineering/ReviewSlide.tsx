import { Bot } from "../../components/Bot";

export function ReviewSlide() {
  return (
    <section className="slide-canvas slide-review">
      <div className="slide-eyebrow">03 / El trabajo no termina en el diff</div>
      <h2 className="slide-heading">
        Implementar.
        <br />
        Revisar.
        <br />
        <span className="slide-orange">Verificar.</span>
      </h2>
      <div className="slide-review-list">
        <div>
          <span>01</span>
          <p>¿Resuelve el problema?</p>
        </div>
        <div>
          <span>02</span>
          <p>¿Encaja en el proyecto?</p>
        </div>
        <div>
          <span>03</span>
          <p>¿Qué prueba que funciona?</p>
        </div>
      </div>
      <Bot
        className="slide-bot slide-review-bot"
        seed={106}
        color="#ff6b00"
        shape="round"
      />
      <div className="slide-footer">
        <span>El bot propone. Tú mantienes el criterio.</span>
        <span>Engineering / 04</span>
      </div>
    </section>
  );
}
