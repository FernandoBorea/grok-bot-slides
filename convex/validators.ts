import { v } from "convex/values";

export const questionValidator = v.object({
  id: v.string(),
  prompt: v.string(),
  type: v.union(v.literal("poll"), v.literal("single"), v.literal("multiple")),
  options: v.array(v.object({ id: v.string(), label: v.string() })),
});

export const slideValidator = v.object({
  slug: v.string(),
  title: v.string(),
  kicker: v.string(),
  guide: v.object({
    intro: v.string(),
    sections: v.optional(
      v.array(v.object({ title: v.string(), body: v.string() })),
    ),
    takeaway: v.optional(v.string()),
  }),
  question: v.optional(questionValidator),
});

export const presenterActionValidator = v.union(
  v.object({ type: v.literal("navigate"), slug: v.string() }),
  v.object({
    type: v.literal("question"),
    open: v.boolean(),
    slideSlug: v.string(),
  }),
  v.object({
    type: v.literal("results"),
    show: v.boolean(),
    slideSlug: v.string(),
  }),
  v.object({ type: v.literal("end") }),
);

export const publicSessionValidator = v.object({
  id: v.string(), namespace: v.string(), deckSlug: v.string(), deckTitle: v.string(),
  slides: v.array(slideValidator), activeSlideSlug: v.string(),
  questionOpen: v.boolean(), showResults: v.boolean(),
  status: v.union(v.literal("live"), v.literal("ended")),
  createdAt: v.number(), updatedAt: v.number(),
});

export const publicParticipantValidator = v.object({
  id: v.id("participants"), name: v.string(), seed: v.number(),
});

export const publicVoteValidator = v.object({
  participantId: v.id("participants"), questionId: v.string(),
  slideSlug: v.string(), optionIds: v.array(v.string()),
});

export const snapshotValidator = v.object({
  session: v.union(publicSessionValidator, v.null()),
  participants: v.array(publicParticipantValidator),
  participant: v.union(publicParticipantValidator, v.null()),
  votes: v.array(publicVoteValidator), isPresenter: v.boolean(),
});
