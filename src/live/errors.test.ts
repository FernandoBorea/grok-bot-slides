import { ConvexError } from "convex/values";
import { afterEach, describe, expect, it, vi } from "vitest";
import { convexRequest, normalizeConvexError } from "./errors";

afterEach(() => vi.restoreAllMocks());

describe("mensajes de Convex", () => {
  it("explica funciones sin desplegar sin exponer detalles internos", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const reason = new Error("[CONVEX Q(sessions:snapshot)] [Request ID: xyz] Server Error Could not find public function for 'sessions:snapshot'");
    expect(normalizeConvexError(reason).message).toContain("Ejecuta npm run convex:dev");
    expect(normalizeConvexError(reason).message).not.toMatch(/Request ID|sessions:snapshot|xyz/);
  });
  it("conserva mensajes públicos de validación y explica errores de conexión", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect(normalizeConvexError(new ConvexError("Esta sesión ya terminó.")).message).toBe("Esta sesión ya terminó.");
    expect(normalizeConvexError(new Error("WebSocket connection failed")).message).toContain("No pudimos conectar");
  });
  it("normaliza también fallos de las mutaciones", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    await expect(convexRequest(Promise.reject(new Error("Could not find public function")))).rejects.toThrow("faltan las funciones");
  });
});
