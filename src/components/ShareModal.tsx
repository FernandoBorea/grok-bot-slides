import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Check, Copy, ArrowUpRight, DeviceMobile } from "@phosphor-icons/react";
import { Modal } from "./Modal";
import { useLive } from "../live/LiveProvider";

export function ShareModal({
  sessionId,
  onClose,
  question,
}: {
  sessionId: string;
  onClose: () => void;
  question?: string;
}) {
  const { mode } = useLive();
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const path = `/join/${encodeURIComponent(sessionId)}`;
  let origin = window.location.origin;
  const isLocalHost = ["localhost", "127.0.0.1", "[::1]"].includes(
    window.location.hostname,
  );
  if (mode === "convex" && isLocalHost && __DEV_LAN_HOST__) {
    const networkUrl = new URL(origin);
    networkUrl.hostname = __DEV_LAN_HOST__;
    origin = networkUrl.origin;
  }
  try {
    const configured = import.meta.env.VITE_PUBLIC_URL;
    if (configured && /^https?:\/\//.test(configured))
      origin = new URL(configured).origin;
  } catch {
    /* Use the current origin. */
  }
  const url = new URL(path, origin).href;
  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  }
  return (
    <Modal
      title={question || "La conversación empieza aquí."}
      onClose={onClose}
      className="share-modal"
    >
      <p className="muted">
        Escanea una vez. Lee a tu ritmo y vuelve al punto en vivo cuando
        quieras.
      </p>
      <div className="qr-wrap">
        <QRCodeSVG
          value={url}
          size={224}
          level="M"
          marginSize={2}
          title="QR para entrar a la sesión"
        />
      </div>
      <div className="qr-caption">
        <DeviceMobile size={18} />
        Sin registro. Con tu propio bot.
      </div>
      <label className="field-label" htmlFor="join-url">
        Enlace para el público
      </label>
      <div className="copy-field">
        <input
          id="join-url"
          value={url}
          readOnly
          onFocus={(e) => e.target.select()}
        />
        <button
          className="icon-button"
          aria-label="Copiar enlace"
          onClick={copy}
        >
          {copied ? <Check /> : <Copy />}
        </button>
      </div>
      <div role="status" className="small copy-status">
        {copied
          ? "Enlace copiado."
          : copyError
            ? "Selecciona el enlace y cópialo manualmente."
            : "\u00a0"}
      </div>
      <a
        className="button primary full-width"
        href={path}
        target="_blank"
        rel="noreferrer"
      >
        Abrir vista del público <ArrowUpRight size={18} />
      </a>
      {mode === "local" && (
        <div className="notice">
          Modo local: abre el enlace en otra pestaña de este navegador para
          probar. Otros dispositivos necesitan Convex configurado.
        </div>
      )}
      {mode === "convex" && isLocalHost && !import.meta.env.VITE_PUBLIC_URL && (
        <p className="small muted" style={{ margin: "15px 0 0" }}>
          {__DEV_LAN_HOST__
            ? "QR de desarrollo: conecta tu teléfono a la misma red Wi-Fi que esta Mac."
            : "Para usar el QR en otro dispositivo, abre esta app con la dirección de red de Vite o configura VITE_PUBLIC_URL."}
        </p>
      )}
    </Modal>
  );
}
