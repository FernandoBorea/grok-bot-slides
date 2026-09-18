import { afterEach, describe, expect, it } from "vitest";
import { createLocalTransport } from "./local";
import { readCredentials, saveCredentials } from "./credentials";
import type {
  CreateSessionInput,
  LiveTransport,
  SessionSnapshot,
} from "./types";

const transports: LiveTransport[] = [];
afterEach(() => {
  for (const transport of transports.splice(0)) transport.close?.();
});

const input: CreateSessionInput = {
  deckSlug: "demo",
  deckTitle: "Demo",
  slides: [
    {
      slug: "first",
      title: "Primera",
      kicker: "01",
      guide: { intro: "Guía" },
      question: {
        id: "q1",
        prompt: "¿Sí o no?",
        type: "single",
        options: [
          { id: "yes", label: "Sí" },
          { id: "no", label: "No" },
        ],
      },
    },
    {
      slug: "second",
      title: "Segunda",
      kicker: "02",
      guide: { intro: "Más contexto" },
    },
  ],
};

function setup() {
  const namespace = `test-${crypto.randomUUID()}`;
  const transport = createLocalTransport(namespace);
  transports.push(transport);
  return { namespace, transport };
}

describe("transporte local", () => {
  it("no atribuye un voto adelantado o tardío a otra pregunta con opciones iguales", async () => {
    const { transport } = setup();
    const repeatedOptions = structuredClone(input);
    repeatedOptions.slides[1].question = {
      ...structuredClone(input.slides[0].question!),
      id: "q2",
      prompt: "¿Otra pregunta con Sí y No?",
    };
    const id = await transport.createSession(repeatedOptions);
    let current!: SessionSnapshot;
    const unsubscribe = transport.subscribe(
      id,
      (value) => {
        current = value;
      },
      (error) => {
        throw error;
      },
    );
    await transport.join(id);
    await transport.update(id, {
      type: "question",
      open: true,
      slideSlug: "first",
    });

    // A reader ahead of the presenter cannot answer a future question.
    await expect(transport.vote(id, ["yes"], "second")).rejects.toThrow(
      "La presentación avanzó",
    );
    expect(current.votes).toHaveLength(0);
    await transport.vote(id, ["yes"], "first");

    await transport.update(id, { type: "navigate", slug: "second" });
    await transport.update(id, {
      type: "question",
      open: true,
      slideSlug: "second",
    });
    // A form still displaying the first slide must not vote in the second.
    await expect(transport.vote(id, ["no"], "first")).rejects.toThrow(
      "La presentación avanzó",
    );
    expect(current.votes).toHaveLength(1);
    expect(current.votes[0]).toMatchObject({
      questionId: "q1",
      slideSlug: "first",
      optionIds: ["yes"],
    });
    await transport.vote(id, ["no"], "second");
    expect(current.votes).toHaveLength(2);
    expect(current.votes.find((v) => v.slideSlug === "second")).toMatchObject({
      questionId: "q2",
      optionIds: ["no"],
    });
    await transport.update(id, {
      type: "question",
      open: false,
      slideSlug: "second",
    });
    await expect(transport.vote(id, ["yes"], "second")).rejects.toThrow(
      "no ha abierto",
    );
    unsubscribe();
  });

  it("permite crear, entrar, responder, avanzar y terminar sin Convex", async () => {
    const { transport } = setup();
    expect(transport.mode).toBe("local");
    expect(transport.configurationMessage).toBe(
      "No ha sido configurado Convex",
    );
    const id = await transport.createSession(input);
    let current!: SessionSnapshot;
    const unsubscribe = transport.subscribe(
      id,
      (value) => {
        current = value;
      },
      (error) => {
        throw error;
      },
    );
    expect(current.isPresenter).toBe(true);
    expect(current.session?.activeSlideSlug).toBe("first");
    await transport.join(id);
    const avatar = current.participant;
    await transport.join(id);
    expect(current.participant).toEqual(avatar);
    expect(current.participants).toHaveLength(1);
    await expect(transport.vote(id, ["yes"], "first")).rejects.toThrow(
      "no ha abierto",
    );
    await transport.update(id, {
      type: "question",
      open: true,
      slideSlug: "first",
    });
    await transport.vote(id, ["yes"], "first");
    await transport.vote(id, ["no"], "first");
    expect(current.votes).toHaveLength(1);
    expect(current.votes[0].optionIds).toEqual(["no"]);
    await transport.update(id, { type: "navigate", slug: "second" });
    expect(current.session?.activeSlideSlug).toBe("second");
    expect(current.session?.questionOpen).toBe(false);
    await expect(
      transport.update(id, {
        type: "question",
        open: true,
        slideSlug: "first",
      }),
    ).rejects.toThrow("La presentación avanzó");
    await expect(
      transport.update(id, { type: "results", show: true, slideSlug: "first" }),
    ).rejects.toThrow("La presentación avanzó");
    expect(current.session?.questionOpen).toBe(false);
    expect(current.session?.showResults).toBe(false);
    await transport.update(id, { type: "end" });
    await expect(transport.join(id)).rejects.toThrow("ya terminó");
    await expect(transport.vote(id, ["yes"], "first")).rejects.toThrow(
      "ya terminó",
    );
    unsubscribe();
  });

  it("comprueba la capacidad al ejecutar cada acción de presentación", async () => {
    const { namespace, transport } = setup();
    const id = await transport.createSession(input);
    const owner = readCredentials(namespace, id);
    saveCredentials(namespace, id, {});
    await expect(transport.update(id, { type: "end" })).rejects.toThrow(
      "Solo el presentador",
    );
    saveCredentials(namespace, id, owner);
    await expect(
      transport.update(id, { type: "end" }),
    ).resolves.toBeUndefined();
  });

  it("sincroniza otra instancia y restaura la sesión guardada", async () => {
    const { namespace, transport } = setup();
    const id = await transport.createSession(input);
    const other = createLocalTransport(namespace);
    transports.push(other);
    let current!: SessionSnapshot;
    const unsubscribe = other.subscribe(
      id,
      (value) => {
        current = value;
      },
      (error) => {
        throw error;
      },
    );
    expect(current.session?.deckTitle).toBe("Demo");
    await transport.update(id, { type: "navigate", slug: "second" });
    await expect.poll(() => current.session?.activeSlideSlug).toBe("second");
    unsubscribe();
  });

  it("separa namespaces y devuelve una sesión ausente sin fallar", async () => {
    const { transport } = setup();
    const id = await transport.createSession(input);
    const { transport: other } = setup();
    let current!: SessionSnapshot;
    const unsubscribe = other.subscribe(
      id,
      (value) => {
        current = value;
      },
      (error) => {
        throw error;
      },
    );
    expect(current.session).toBeNull();
    await expect(other.join(id)).rejects.toThrow("No encontramos");
    unsubscribe();
  });
});
