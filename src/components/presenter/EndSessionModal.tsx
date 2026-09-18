import { ArrowRight } from "@phosphor-icons/react";
import { Modal } from "../Modal";

type EndSessionModalProps = {
  busy: boolean;
  onClose: () => void;
  onFinish: () => void;
};

export function EndSessionModal({
  busy,
  onClose,
  onFinish,
}: EndSessionModalProps) {
  return (
    <Modal title="¿Terminamos por aquí?" onClose={onClose}>
      <p className="muted">
        Se cerrarán las preguntas. El público podrá seguir leyendo la última
        guía. Puedes iniciar otra sesión cuando quieras.
      </p>
      <div className="modal-actions">
        <button className="button secondary" onClick={onClose}>
          Seguir presentando
        </button>
        <button className="button primary" disabled={busy} onClick={onFinish}>
          Finalizar sesión <ArrowRight size={17} />
        </button>
      </div>
    </Modal>
  );
}
