import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { slideValidator } from "./validators";

export default defineSchema({
  sessions: defineTable({
    publicId: v.string(),
    namespace: v.string(),
    presenterKey: v.string(),
    deckSlug: v.string(),
    deckTitle: v.string(),
    slides: v.array(slideValidator),
    activeSlideSlug: v.string(),
    questionOpen: v.boolean(),
    showResults: v.boolean(),
    status: v.union(v.literal("live"), v.literal("ended")),
    createdAt: v.number(),
    updatedAt: v.number(),
    participantCount: v.optional(v.number()),
  }).index("by_namespace_and_publicId", ["namespace", "publicId"]),
  participants: defineTable({
    sessionId: v.id("sessions"),
    token: v.string(),
    name: v.string(),
    seed: v.number(),
  })
    .index("by_sessionId", ["sessionId"])
    .index("by_sessionId_and_token", ["sessionId", "token"]),
  votes: defineTable({
    sessionId: v.id("sessions"),
    participantId: v.id("participants"),
    slideSlug: v.string(),
    questionId: v.string(),
    optionIds: v.array(v.string()),
  })
    .index("by_sessionId_and_slideSlug", ["sessionId", "slideSlug"])
    .index("by_participantId_and_slideSlug", ["participantId", "slideSlug"]),
});
