import { Link } from "@tanstack/react-router";
import { ArrowLeft, Play, Stop } from "@phosphor-icons/react";
import { Brand } from "../Shell";

type PresenterHeaderProps = {
  isLive: boolean;
  ended: boolean;
  busy: boolean;
  onStart: () => void;
  onEnd: () => void;
};

export function PresenterHeader({
  isLive,
  ended,
  busy,
  onStart,
  onEnd,
}: PresenterHeaderProps) {
  return (
    <header className="presenter-header">
      <Brand compact />
      <span className="header-separator" />
      <Link to="/" className="back-library">
        <ArrowLeft size={16} /> Biblioteca
      </Link>
      <div className="presenter-header-end">
        <span className="mode-label">
          <span className={`status-dot ${isLive && !ended ? "green" : ""}`} />
          {isLive
            ? ended
              ? "Sesión finalizada"
              : "Sesión en vivo"
            : "Vista previa"}
        </span>
        {isLive && !ended && (
          <button className="button subtle end-button" onClick={onEnd}>
            <Stop size={15} />
            Finalizar
          </button>
        )}
        {(!isLive || ended) && (
          <button className="button primary" disabled={busy} onClick={onStart}>
            <Play size={17} weight="fill" />
            {busy
              ? "Preparando…"
              : ended
                ? "Nueva sesión"
                : "Iniciar presentación"}
          </button>
        )}
      </div>
    </header>
  );
}
