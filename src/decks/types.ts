import type { ComponentType } from "react";
import type { SlideMeta } from "../live/types";

/** Each slide is ordinary React. Its companion guide and question live beside it. */
export type SlideDefinition = SlideMeta & {
  component: ComponentType;
};

export type Deck = {
  slug: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  accent: string;
  slides: SlideDefinition[];
};
