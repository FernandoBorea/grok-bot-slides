import { describe, expect, it } from "vitest";
import {
  applyPresenterAction,
  avatarFromToken,
  validateManifest,
  validateVote,
} from "./rules";
import { publicSnapshot, recordVote, requirePresenter } from "./local";
import type { LocalRecord } from "./local";
import type { CreateSessionInput, Session } from "./types";

const manifest: CreateSessionInput = {
  deckSlug: "engineering",
  deckTitle: "Grok bot for Engineering",
  slides: [
    {
      slug: "welcome",
      title: "Bienvenidos",
      kicker: "01",
      guide: { intro: "Primera guía" },
      question: {
        id: "used-grok",
        prompt: "¿Ya usaste Grok bot?",
        type: "poll",
        options: [
          { id: "yes", label: "Sí" },
          { id: "no", label: "No" },
        ],
      },
    },
    {
      slug: "workflow",
      title: "Workflow",
      kicker: "02",
      guide: { intro: "Segunda guía" },
      question: {
        id: "use-cases",
        prompt: "¿Para qué lo usarías?",
        type: "multiple",
        options: [
          { id: "code", label: "Código" },
          { id: "review", label: "Reviews" },
        ],
      },
    },
    {
      slug: "closing",
      title: "Cierre",
      kicker: "03",
      guide: { intro: "Gracias" },
    },
  ],
};

const session: Session = {
  ...manifest,
  id: "session",
  namespace: "test",
  activeSlideSlug: "welcome",
  questionOpen: true,
  showResults: false,
  status: "live",
  createdAt: 1,
  updatedAt: 1,
};
const record: LocalRecord = {
  session,
  presenterKey: "presenter-secret",
  participants: [
    { id: "one", name: "Águila veloz", seed: 1, token: "token-one" },
    { id: "two", name: "Zorro brillante", seed: 2, token: "token-two" },
  ],
  votes: [
    {
      participantId: "one",
      questionId: "used-grok",
      slideSlug: "welcome",
      optionIds: ["yes"],
    },
  ],
};

describe("manifiesto y estado de una presentación", () => {
  it("acepta componentes independientes con metadata válida", () =>
    expect(() => validateManifest(manifest)).not.toThrow());
  it("rechaza slides y opciones con identificadores repetidos", () => {
    expect(() =>
      validateManifest({
        ...manifest,
        slides: [manifest.slides[0], manifest.slides[0]],
      }),
    ).toThrow("slug único");
    const duplicate = structuredClone(manifest);
    duplicate.slides[0].question!.options[1].id = "yes";
    expect(() => validateManifest(duplicate)).toThrow("identificadores únicos");
  });
  it("al navegar cierra la pregunta y oculta resultados", () => {
    expect(
      applyPresenterAction(
        { ...session, showResults: true },
        { type: "navigate", slug: "workflow" },
        2,
      ),
    ).toMatchObject({
      activeSlideSlug: "workflow",
      questionOpen: false,
      showResults: false,
      updatedAt: 2,
    });
  });
  it("rechaza slides inexistentes y preguntas inexistentes", () => {
    expect(() =>
      applyPresenterAction(session, { type: "navigate", slug: "missing" }, 2),
    ).toThrow("no existe");
    expect(() =>
      applyPresenterAction(
        { ...session, activeSlideSlug: "closing" },
        { type: "question", open: true, slideSlug: "closing" },
        2,
      ),
    ).toThrow("no tiene una pregunta");
  });
  it("terminar la sesión bloquea el control y los votos", () => {
    const ended = applyPresenterAction(session, { type: "end" }, 2);
    expect(ended.questionOpen).toBe(false);
    expect(() =>
      applyPresenterAction(ended, { type: "navigate", slug: "workflow" }, 3),
    ).toThrow("ya terminó");
    expect(() => validateVote(ended, "one", ["yes"])).toThrow("ya terminó");
  });
  it("rechaza controles de pregunta y resultados de una pestaña atrasada", () => {
    for (const open of [true, false])
      expect(() =>
        applyPresenterAction(
          session,
          { type: "question", open, slideSlug: "workflow" },
          2,
        ),
      ).toThrow("La presentación avanzó");
    for (const show of [true, false])
      expect(() =>
        applyPresenterAction(
          session,
          { type: "results", show, slideSlug: "workflow" },
          2,
        ),
      ).toThrow("La presentación avanzó");
  });
});

describe("identidad, capacidades y votos", () => {
  it("asigna el mismo avatar a la misma identidad", () => {
    expect(avatarFromToken("abc")).toEqual(avatarFromToken("abc"));
    expect(avatarFromToken("abc").name.split(" ")).toHaveLength(2);
  });
  it("los visitantes no obtienen el control del presentador", () => {
    expect(() =>
      requirePresenter(record, { participantToken: "token-one" }),
    ).toThrow("Solo el presentador");
    expect(() => requirePresenter(record, { presenterKey: "wrong" })).toThrow(
      "Solo el presentador",
    );
    expect(() =>
      requirePresenter(record, { presenterKey: "presenter-secret" }),
    ).not.toThrow();
  });
  it("el snapshot público no revela claves, tokens ni votos ocultos ajenos", () => {
    const snapshot = publicSnapshot(record, { participantToken: "token-two" });
    expect(snapshot.participant?.id).toBe("two");
    expect(snapshot.isPresenter).toBe(false);
    expect(snapshot.votes).toEqual([]);
    expect(JSON.stringify(snapshot)).not.toMatch(
      /presenter-secret|token-one|token-two/,
    );
    expect(
      publicSnapshot(record, { participantToken: "token-one" }).votes,
    ).toHaveLength(1);
    expect(
      publicSnapshot(record, { presenterKey: "presenter-secret" }).votes,
    ).toHaveLength(1);
    expect(
      publicSnapshot(
        { ...record, session: { ...session, showResults: true } },
        {},
      ).votes,
    ).toHaveLength(1);
  });
  it("solo cambia el voto de la identidad verificada", () => {
    const updated = recordVote(record, { participantToken: "token-two" }, [
      "no",
    ]);
    expect(updated.votes).toHaveLength(2);
    expect(
      updated.votes.find((vote) => vote.participantId === "one")?.optionIds,
    ).toEqual(["yes"]);
    const changed = recordVote(updated, { participantToken: "token-two" }, [
      "yes",
    ]);
    expect(changed.votes).toHaveLength(2);
    expect(
      changed.votes.find((vote) => vote.participantId === "two")?.optionIds,
    ).toEqual(["yes"]);
    expect(() =>
      recordVote(record, { participantToken: "unknown" }, ["no"]),
    ).toThrow("Únete");
  });
  it("rechaza opciones inexistentes, vacías, repetidas y selección múltiple en polls", () => {
    for (const options of [[], ["unknown"], ["yes", "yes"], ["yes", "no"]])
      expect(() => validateVote(session, "one", options)).toThrow();
    expect(validateVote(session, "one", ["yes"]).optionIds).toEqual(["yes"]);
    expect(() =>
      validateVote({ ...session, questionOpen: false }, "one", ["yes"]),
    ).toThrow("no ha abierto");
  });
  it("acepta varias opciones válidas únicamente en preguntas múltiples", () => {
    expect(
      validateVote({ ...session, activeSlideSlug: "workflow" }, "one", [
        "code",
        "review",
      ]).optionIds,
    ).toEqual(["code", "review"]);
  });
  it("rechaza un voto enviado desde una slide desactualizada", () => {
    expect(() => validateVote(session, "one", ["yes"], "workflow")).toThrow(
      "La presentación avanzó",
    );
  });
});
