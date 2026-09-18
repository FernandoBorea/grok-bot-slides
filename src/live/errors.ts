import { ConvexError } from "convex/values";

export function normalizeConvexError(reason: unknown): Error {
  if (import.meta.env.DEV) console.error("Error de Convex", reason);
  if (reason instanceof ConvexError && typeof reason.data === "string") return new Error(reason.data);
  const message = reason instanceof Error ? reason.message : String(reason);
  if (/could not find public function|function.*not found|no function registered/i.test(message)) {
    return new Error("Convex está configurado, pero faltan las funciones de la presentación. Ejecuta npm run convex:dev y vuelve a intentar.");
  }
  if (/network|fetch|websocket|connection|connect|offline|timed? ?out/i.test(message)) {
    return new Error("No pudimos conectar con Convex. Revisa tu conexión y que npm run convex:dev esté funcionando.");
  }
  return new Error("Convex no pudo completar esta acción. Revisa que npm run convex:dev termine sin errores y vuelve a intentar.");
}

export async function convexRequest<T>(request: Promise<T>): Promise<T> {
  try { return await request; }
  catch (reason) { throw normalizeConvexError(reason); }
}
