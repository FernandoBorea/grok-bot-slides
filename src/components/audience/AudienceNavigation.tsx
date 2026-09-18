import { Broadcast, CaretLeft, CaretRight } from "@phosphor-icons/react";

export function AudienceNavigation({
  index,
  presenterIndex,
  slideCount,
  questionOpen,
  ended,
  onMove,
  onCatchUp,
}: {
  index: number;
  presenterIndex: number;
  slideCount: number;
  questionOpen: boolean;
  ended: boolean;
  onMove: (index: number) => void;
  onCatchUp: () => void;
}) {
  const isCurrent = index === presenterIndex;
  return (
    <nav className="audience-navigation" aria-label="Navegar la guía">
      <p className="audience-navigation-status" role="status">
        {ended
          ? "La presentación terminó. Puedes seguir explorando."
          : questionOpen
            ? `Pregunta abierta en la slide ${presenterIndex + 1}`
            : `El presentador está en la slide ${presenterIndex + 1}`}
      </p>
      <div className="audience-navigation-controls">
        <button
          className="audience-nav-arrow"
          aria-label="Slide anterior"
          disabled={index === 0}
          onClick={() => onMove(index - 1)}
        >
          <CaretLeft size={21} />
        </button>
        <span
          className="audience-page-number"
          aria-label={`Slide ${index + 1} de ${slideCount}`}
        >
          {String(index + 1).padStart(2, "0")}{" "}
          <span>/ {String(slideCount).padStart(2, "0")}</span>
        </span>
        <button
          className="audience-nav-arrow"
          aria-label="Slide siguiente"
          disabled={index === slideCount - 1}
          onClick={() => onMove(index + 1)}
        >
          <CaretRight size={21} />
        </button>
        <button
          className={`audience-sync-button ${isCurrent ? "is-current" : ""}`}
          aria-label="Ir al presentador"
          disabled={ended}
          onClick={onCatchUp}
        >
          <Broadcast size={18} />
          {ended ? "Finalizada" : isCurrent ? "En vivo" : "Ir al presentador"}
        </button>
      </div>
    </nav>
  );
}
