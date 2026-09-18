import { Broadcast, ChartBar, NoteBlank, QrCode } from "@phosphor-icons/react";
import type { SlideMeta } from "../../live/types";

type PresenterDetailsProps = {
  slide: SlideMeta;
  isLive: boolean;
  busy: boolean;
  ended: boolean;
  votingOpen: boolean;
  showResults: boolean;
  onQuestionOpen: (open: boolean) => void;
  onShowResults: () => void;
  onShare: () => void;
};

export function PresenterDetails(props: PresenterDetailsProps) {
  return (
    <div className="presenter-details">
      <SpeakerNotes guide={props.slide.guide} />
      <InteractionPanel {...props} />
    </div>
  );
}

function SpeakerNotes({ guide }: { guide: SlideMeta["guide"] }) {
  return (
    <section className="speaker-notes">
      <p className="section-label">
        <NoteBlank size={16} /> GUÍA DE ESTA SLIDE
      </p>
      <h2>{guide.intro}</h2>
      <p>{guide.takeaway || guide.sections?.[0]?.body}</p>
      <span className="small muted">
        El público verá esta guía adaptada a su dispositivo.
      </span>
    </section>
  );
}

function InteractionPanel({
  slide,
  isLive,
  busy,
  ended,
  votingOpen,
  showResults,
  onQuestionOpen,
  onShowResults,
  onShare,
}: PresenterDetailsProps) {
  const question = slide.question;
  return (
    <section className="interaction-panel">
      <div className="interaction-heading">
        <p className="section-label">
          <Broadcast size={17} /> PARTICIPACIÓN
        </p>
        {question && (
          <label className="question-toggle">
            <input
              type="checkbox"
              aria-label="Activar pregunta"
              checked={votingOpen}
              disabled={!isLive || busy || ended}
              onChange={(event) => onQuestionOpen(event.target.checked)}
            />
            <span>{votingOpen ? "Abierta" : "Cerrada"}</span>
          </label>
        )}
      </div>
      {question ? (
        <>
          <h2>{question.prompt}</h2>
          <div className="question-type-label">
            {question.type === "multiple"
              ? "Selección múltiple"
              : question.type === "poll"
                ? "Encuesta"
                : "Opción única"}
            <span>·</span>
            {question.options.length} opciones
          </div>
          {isLive ? (
            <>
              <div className="interaction-actions">
                <button className="button secondary" onClick={onShare}>
                  <QrCode size={19} />
                  Mostrar QR
                </button>
                <button
                  className={`button subtle ${showResults ? "is-active" : ""}`}
                  disabled={busy || ended}
                  onClick={onShowResults}
                >
                  <ChartBar size={18} />
                  {showResults ? "Ocultar en móviles" : "Mostrar en móviles"}
                </button>
              </div>
              <p className="small muted">
                Los resultados se actualizan en la slide. También puedes
                mostrarlos en los teléfonos del público.
              </p>
            </>
          ) : (
            <>
              <div className="preview-options">
                {question.options.map((option) => (
                  <span key={option.id}>{option.label}</span>
                ))}
              </div>
              <p className="small muted">
                Inicia la presentación para compartir el QR y recibir
                respuestas.
              </p>
            </>
          )}
        </>
      ) : (
        <>
          <h2>Un momento para escuchar.</h2>
          <p className="muted">
            Esta slide no tiene pregunta. El público puede explorar la guía y
            volver a tu slide en vivo.
          </p>
          {isLive && (
            <button className="button secondary" onClick={onShare}>
              <QrCode size={18} />
              Compartir sesión
            </button>
          )}
        </>
      )}
    </section>
  );
}
