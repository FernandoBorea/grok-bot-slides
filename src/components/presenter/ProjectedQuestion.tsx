import type { Question, Vote } from "../../live/types";
import { QuestionResults } from "../QuestionResults";

export function ProjectedQuestion({
  question,
  votes,
  slideSlug,
  isLive,
  votingOpen,
}: {
  question: Question;
  votes: Vote[];
  slideSlug: string;
  isLive: boolean;
  votingOpen: boolean;
}) {
  return (
    <section
      className="slide-question-panel"
      aria-label="Participación en la slide"
      data-testid="projected-question"
    >
      <div className="slide-question-heading">
        <h2>{question.prompt}</h2>
        <span className="slide-question-status">
          {!isLive
            ? "Vista previa"
            : votingOpen
              ? "En vivo"
              : "Votación cerrada"}
        </span>
      </div>
      <QuestionResults
        question={question}
        votes={votes}
        slideSlug={slideSlug}
      />
    </section>
  );
}
