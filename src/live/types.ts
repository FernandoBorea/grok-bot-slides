export type Question = {
  id: string;
  prompt: string;
  type: "poll" | "single" | "multiple";
  options: { id: string; label: string }[];
};

export type SlideMeta = {
  slug: string;
  title: string;
  kicker: string;
  guide: {
    intro: string;
    sections?: { title: string; body: string }[];
    takeaway?: string;
  };
  question?: Question;
};

export type Session = {
  id: string;
  namespace: string;
  deckSlug: string;
  deckTitle: string;
  slides: SlideMeta[];
  activeSlideSlug: string;
  questionOpen: boolean;
  showResults: boolean;
  status: "live" | "ended";
  createdAt: number;
  updatedAt: number;
};

export type Participant = { id: string; name: string; seed: number };
export type Vote = {
  questionId: string;
  slideSlug: string;
  participantId: string;
  optionIds: string[];
};

export type CreateSessionInput = {
  deckSlug: string;
  deckTitle: string;
  slides: SlideMeta[];
};

export type SessionSnapshot = {
  session: Session | null;
  participants: Participant[];
  votes: Vote[];
  participant: Participant | null;
  isPresenter: boolean;
};

export type Credentials = { presenterKey?: string; participantToken?: string };

export type PresenterAction =
  | { type: "navigate"; slug: string }
  | { type: "question"; open: boolean; slideSlug: string }
  | { type: "results"; show: boolean; slideSlug: string }
  | { type: "end" };

export type LiveTransport = {
  mode: "local" | "convex";
  configurationMessage?: string;
  createSession(input: CreateSessionInput): Promise<string>;
  subscribe(
    sessionId: string,
    next: (snapshot: SessionSnapshot) => void,
    error: (error: Error) => void,
  ): () => void;
  join(sessionId: string): Promise<void>;
  update(sessionId: string, action: PresenterAction): Promise<void>;
  vote(
    sessionId: string,
    optionIds: string[],
    slideSlug: string,
  ): Promise<void>;
  close?(): void;
};

export const emptySnapshot: SessionSnapshot = {
  session: null,
  participants: [],
  votes: [],
  participant: null,
  isPresenter: false,
};
