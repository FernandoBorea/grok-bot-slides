import type { Credentials } from "./types";

export const storagePrefix = "grok-bot-slides:v1";
const memoryStorage = new Map<string, string>();

export function readStorage(key: string): string | null {
  try {
    return (
      globalThis.localStorage?.getItem(key) ?? memoryStorage.get(key) ?? null
    );
  } catch {
    return memoryStorage.get(key) ?? null;
  }
}

export function writeStorage(key: string, value: string): void {
  memoryStorage.set(key, value);
  try {
    globalThis.localStorage?.setItem(key, value);
  } catch {
    /* Private browsers can use the in-memory demo. */
  }
}

export function randomToken(): string {
  const bytes = new Uint8Array(24);
  globalThis.crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join(
    "",
  );
}

export function newSessionId(): string {
  return randomToken().slice(0, 16);
}

const credentialsKey = (namespace: string, sessionId: string) =>
  `${storagePrefix}:credentials:${namespace}:${sessionId}`;

export function readCredentials(
  namespace: string,
  sessionId: string,
): Credentials {
  try {
    return JSON.parse(
      readStorage(credentialsKey(namespace, sessionId)) ?? "{}",
    ) as Credentials;
  } catch {
    return {};
  }
}

export function saveCredentials(
  namespace: string,
  sessionId: string,
  value: Credentials,
): void {
  writeStorage(credentialsKey(namespace, sessionId), JSON.stringify(value));
  if (typeof window !== "undefined")
    window.dispatchEvent(new Event("grok-credentials-changed"));
}

export function ensureParticipantToken(
  namespace: string,
  sessionId: string,
): string {
  const credentials = readCredentials(namespace, sessionId);
  if (credentials.participantToken) return credentials.participantToken;
  const participantToken = randomToken();
  saveCredentials(namespace, sessionId, { ...credentials, participantToken });
  return participantToken;
}
