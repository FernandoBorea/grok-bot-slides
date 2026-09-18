import type { Deck } from "./types";
import { introDeck } from "./intro/deck";
import { engineeringDeck } from "./engineering/deck";
import { foundersDeck } from "./founders/deck";
import { gtmDeck } from "./gtm/deck";
import { opsDeck } from "./ops/deck";
import { researchDeck } from "./research/deck";

export type { Deck, SlideDefinition } from "./types";

// Each deck contains ordinary, hand-authored React components and its own metadata.
// Keep slugs and question IDs stable so a fork can use the same live backend.
export const decks: Deck[] = [
  introDeck,
  engineeringDeck,
  foundersDeck,
  gtmDeck,
  opsDeck,
  researchDeck,
];

export function findDeck(slug: string): Deck | undefined {
  return decks.find((deck) => deck.slug === slug);
}
