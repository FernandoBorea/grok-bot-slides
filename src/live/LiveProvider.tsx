import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { createConvexTransport } from "./convex";
import { createLocalTransport } from "./local";
import type { LiveTransport } from "./types";

const LiveContext = createContext<LiveTransport | null>(null);
let cachedTransport: LiveTransport | undefined;

function getTransport(): LiveTransport {
  if (cachedTransport) return cachedTransport;
  const requestedNamespace =
    (import.meta.env.VITE_WORKSPACE_SLUG as string | undefined)?.trim() ||
    "grok-bot-slides";
  const validNamespace = /^[a-z0-9][a-z0-9-]{0,79}$/.test(requestedNamespace);
  const namespace = validNamespace ? requestedNamespace : "grok-bot-slides";
  const url = (import.meta.env.VITE_CONVEX_URL as string | undefined)?.trim();
  if (!validNamespace) {
    cachedTransport = createLocalTransport(
      namespace,
      "VITE_WORKSPACE_SLUG no es válido. Usa letras minúsculas, números y guiones. Modo local activo.",
    );
  } else if (url) {
    try {
      cachedTransport = createConvexTransport(url, namespace);
    } catch {
      cachedTransport = createLocalTransport(
        namespace,
        "No ha sido configurado Convex. VITE_CONVEX_URL no es válida; modo local activo.",
      );
    }
  } else {
    cachedTransport = createLocalTransport(namespace);
  }
  return cachedTransport;
}

export function LiveProvider({ children }: { children: ReactNode }) {
  return (
    <LiveContext.Provider value={getTransport()}>
      {children}
    </LiveContext.Provider>
  );
}

export function useLiveTransport(): LiveTransport {
  const value = useContext(LiveContext);
  if (!value) throw new Error("LiveProvider debe envolver la aplicación.");
  return value;
}

export function useLive() {
  const transport = useLiveTransport();
  return {
    mode: transport.mode,
    configurationMessage: transport.configurationMessage,
    createSession: transport.createSession,
  };
}

if (import.meta.hot) {
  // Refresh provider and consumers together when the live transport changes.
  // Session capabilities stay in localStorage, so a reload preserves ownership.
  import.meta.hot.accept(() => window.location.reload());
  import.meta.hot.dispose(() => {
    cachedTransport?.close?.();
    cachedTransport = undefined;
  });
}
