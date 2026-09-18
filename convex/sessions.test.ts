/// <reference types="vite/client" />
import { convexTest } from "convex-test";
import { describe, expect, it } from "vitest";
import schema from "./schema";
import { sessionsApi } from "../src/live/api";
import type { CreateSessionInput } from "../src/live/types";

const modules = import.meta.glob("./**/*.{ts,js}");
const address = { namespace: "grok-bot-slides", sessionId: "a123456789abcdef" };
const presenterKey = "a".repeat(48);
const tokenOne = "b".repeat(48);
const tokenTwo = "c".repeat(48);
const manifest: CreateSessionInput = {
  deckSlug: "engineering",
  deckTitle: "Grok bot for Engineering",
  slides: [
    {
      slug: "welcome",
      title: "Hola",
      kicker: "01",
      guide: { intro: "Guía móvil" },
      question: {
        id: "used-grok",
        prompt: "¿Lo has usado?",
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
      guide: { intro: "El siguiente paso" },
      question: {
        id: "use-cases",
        prompt: "¿Para qué?",
        type: "multiple",
        options: [
          { id: "code", label: "Código" },
          { id: "review", label: "Reviews" },
        ],
      },
    },
  ],
};

async function setup() {
  const t = convexTest(schema, modules);
  await t.mutation(sessionsApi.create, {
    ...address,
    ...manifest,
    presenterKey,
  });
  return t;
}

describe("funciones de Convex con su esquema y base de datos", () => {
  it("crea una sesión y las queries nunca revelan capacidades privadas", async () => {
    const t = await setup();
    await t.mutation(sessionsApi.join, {
      ...address,
      participantToken: tokenOne,
    });
    const publicView = await t.query(sessionsApi.snapshot, address);
    expect(publicView.session).toMatchObject({
      id: address.sessionId,
      namespace: address.namespace,
      status: "live",
      activeSlideSlug: "welcome",
      questionOpen: false,
    });
    expect(publicView.participants).toHaveLength(1);
    expect(publicView.participant).toBeNull();
    expect(publicView.isPresenter).toBe(false);
    expect(JSON.stringify(publicView)).not.toContain(presenterKey);
    expect(JSON.stringify(publicView)).not.toContain(tokenOne);
    expect(
      (await t.query(sessionsApi.snapshot, { ...address, presenterKey }))
        .isPresenter,
    ).toBe(true);
  });

  it("rechaza una capacidad ajena sin cambiar la sesión", async () => {
    const t = await setup();
    await expect(
      t.mutation(sessionsApi.update, {
        ...address,
        presenterKey: tokenOne,
        action: { type: "end" },
      }),
    ).rejects.toThrow("Solo el presentador");
    expect((await t.query(sessionsApi.snapshot, address)).session?.status).toBe(
      "live",
    );
  });

  it("conserva la identidad y reemplaza solo el voto del participante verificado", async () => {
    const t = await setup();
    await t.mutation(sessionsApi.join, {
      ...address,
      participantToken: tokenOne,
    });
    const first = await t.query(sessionsApi.snapshot, {
      ...address,
      participantToken: tokenOne,
    });
    await t.mutation(sessionsApi.join, {
      ...address,
      participantToken: tokenOne,
    });
    await t.mutation(sessionsApi.join, {
      ...address,
      participantToken: tokenTwo,
    });
    const rejoined = await t.query(sessionsApi.snapshot, {
      ...address,
      participantToken: tokenOne,
    });
    expect(rejoined.participant).toEqual(first.participant);
    expect(rejoined.participants).toHaveLength(2);
    await t.mutation(sessionsApi.update, {
      ...address,
      presenterKey,
      action: { type: "question", open: true, slideSlug: "welcome" },
    });
    await t.mutation(sessionsApi.vote, {
      ...address,
      participantToken: tokenOne,
      slideSlug: "welcome",
      optionIds: ["yes"],
    });
    await t.mutation(sessionsApi.vote, {
      ...address,
      participantToken: tokenTwo,
      slideSlug: "welcome",
      optionIds: ["no"],
    });
    await t.mutation(sessionsApi.vote, {
      ...address,
      participantToken: tokenTwo,
      slideSlug: "welcome",
      optionIds: ["yes"],
    });
    const owner = await t.query(sessionsApi.snapshot, {
      ...address,
      presenterKey,
    });
    expect(owner.votes).toHaveLength(2);
    expect(owner.votes.every((vote) => vote.optionIds[0] === "yes")).toBe(true);
    const voter = await t.query(sessionsApi.snapshot, {
      ...address,
      participantToken: tokenTwo,
    });
    expect(voter.votes).toHaveLength(1);
    expect((await t.query(sessionsApi.snapshot, address)).votes).toHaveLength(
      0,
    );
    await expect(
      t.mutation(sessionsApi.vote, {
        ...address,
        participantToken: "d".repeat(48),
        slideSlug: "welcome",
        optionIds: ["no"],
      }),
    ).rejects.toThrow("Únete");
  });

  it("valida estado, opciones, slide activa y sesiones finalizadas en el servidor", async () => {
    const t = await setup();
    await t.mutation(sessionsApi.join, {
      ...address,
      participantToken: tokenOne,
    });
    const voteArgs = {
      ...address,
      participantToken: tokenOne,
      slideSlug: "welcome",
    };
    await expect(
      t.mutation(sessionsApi.vote, { ...voteArgs, optionIds: ["yes"] }),
    ).rejects.toThrow("no ha abierto");
    await t.mutation(sessionsApi.update, {
      ...address,
      presenterKey,
      action: { type: "question", open: true, slideSlug: "welcome" },
    });
    for (const optionIds of [[], ["other"], ["yes", "yes"], ["yes", "no"]])
      await expect(
        t.mutation(sessionsApi.vote, { ...voteArgs, optionIds }),
      ).rejects.toThrow();
    await t.mutation(sessionsApi.update, {
      ...address,
      presenterKey,
      action: { type: "navigate", slug: "workflow" },
    });
    await expect(
      t.mutation(sessionsApi.update, {
        ...address,
        presenterKey,
        action: { type: "question", open: true, slideSlug: "welcome" },
      }),
    ).rejects.toThrow("La presentación avanzó");
    await expect(
      t.mutation(sessionsApi.update, {
        ...address,
        presenterKey,
        action: { type: "results", show: true, slideSlug: "welcome" },
      }),
    ).rejects.toThrow("La presentación avanzó");
    expect(
      (await t.query(sessionsApi.snapshot, address)).session,
    ).toMatchObject({ questionOpen: false, showResults: false });
    await t.mutation(sessionsApi.update, {
      ...address,
      presenterKey,
      action: { type: "question", open: true, slideSlug: "workflow" },
    });
    await expect(
      t.mutation(sessionsApi.vote, { ...voteArgs, optionIds: ["yes"] }),
    ).rejects.toThrow("La presentación avanzó");
    await t.mutation(sessionsApi.vote, {
      ...voteArgs,
      slideSlug: "workflow",
      optionIds: ["code", "review"],
    });
    await t.mutation(sessionsApi.update, {
      ...address,
      presenterKey,
      action: { type: "end" },
    });
    await expect(
      t.mutation(sessionsApi.vote, {
        ...voteArgs,
        slideSlug: "workflow",
        optionIds: ["code"],
      }),
    ).rejects.toThrow("ya terminó");
    await expect(
      t.mutation(sessionsApi.join, { ...address, participantToken: tokenTwo }),
    ).rejects.toThrow("ya terminó");
  });

  it("publica resultados de la slide actual sin revelar respuestas de otras slides", async () => {
    const t = await setup();
    await t.mutation(sessionsApi.join, {
      ...address,
      participantToken: tokenOne,
    });
    await t.mutation(sessionsApi.update, {
      ...address,
      presenterKey,
      action: { type: "question", open: true, slideSlug: "welcome" },
    });
    await t.mutation(sessionsApi.vote, {
      ...address,
      participantToken: tokenOne,
      slideSlug: "welcome",
      optionIds: ["yes"],
    });
    await t.mutation(sessionsApi.update, {
      ...address,
      presenterKey,
      action: { type: "results", show: true, slideSlug: "welcome" },
    });
    expect((await t.query(sessionsApi.snapshot, address)).votes).toHaveLength(
      1,
    );
    await t.mutation(sessionsApi.update, {
      ...address,
      presenterKey,
      action: { type: "navigate", slug: "workflow" },
    });
    await t.mutation(sessionsApi.update, {
      ...address,
      presenterKey,
      action: { type: "results", show: true, slideSlug: "workflow" },
    });
    expect((await t.query(sessionsApi.snapshot, address)).votes).toHaveLength(
      0,
    );
    expect(
      (await t.query(sessionsApi.snapshot, { ...address, presenterKey })).votes,
    ).toHaveLength(0);
  });

  it("aísla namespaces y rechaza una colisión de sesión", async () => {
    const t = await setup();
    const otherAddress = { ...address, namespace: "otra-comunidad" };
    expect(
      (await t.query(sessionsApi.snapshot, otherAddress)).session,
    ).toBeNull();
    await t.mutation(sessionsApi.create, {
      ...otherAddress,
      ...manifest,
      presenterKey: tokenTwo,
    });
    expect(
      (await t.query(sessionsApi.snapshot, { ...otherAddress, presenterKey }))
        .isPresenter,
    ).toBe(false);
    await expect(
      t.mutation(sessionsApi.create, { ...address, ...manifest, presenterKey }),
    ).rejects.toThrow("ya existe");
  });

  it("admite 500 participantes completos y rechaza nuevos ingresos sin truncar la sala", async () => {
    const t = await setup();
    await t.run(async ctx => {
      const session = await ctx.db.query("sessions").withIndex("by_namespace_and_publicId", q => q.eq("namespace", address.namespace).eq("publicId", address.sessionId)).unique();
      if (!session) throw new Error("Falta la sesión de prueba");
      for (let index = 0; index < 500; index++) {
        await ctx.db.insert("participants", { sessionId: session._id, token: index.toString(16).padStart(48, "0"), name: `Águila ${index}`, seed: index });
      }
      await ctx.db.patch("sessions", session._id, { participantCount: 500 });
    });
    expect((await t.query(sessionsApi.snapshot, address)).participants).toHaveLength(500);
    await expect(t.mutation(sessionsApi.join, { ...address, participantToken: tokenOne })).rejects.toThrow("máximo de 500");
    await expect(t.mutation(sessionsApi.join, { ...address, participantToken: "0".repeat(48) })).resolves.toBeNull();
  });
});
