import type { Question, Vote } from "../live/types";

export function QuestionResults({
  question,
  votes,
  slideSlug,
}: {
  question: Question;
  votes: Vote[];
  slideSlug: string;
}) {
  const answers = votes.filter(
    (v) => v.questionId === question.id && v.slideSlug === slideSlug,
  );
  return (
    <div className="question-results" aria-label="Resultados de la pregunta">
      <div className="results-count">
        {answers.length} {answers.length === 1 ? "respuesta" : "respuestas"}
        {question.type === "multiple" && " · varias opciones por persona"}
      </div>
      {question.options.map((option) => {
        const count = answers.filter((v) =>
          v.optionIds.includes(option.id),
        ).length;
        const percent = answers.length
          ? Math.round((count / answers.length) * 100)
          : 0;
        return (
          <div className="result-row" key={option.id}>
            <div className="result-label">
              <span>{option.label}</span>
              <span>
                {count} <span className="muted">· {percent}%</span>
              </span>
            </div>
            <div className="result-track">
              <div style={{ width: `${percent}%` }} />
            </div>
          </div>
        );
      })}
      {!answers.length && (
        <p className="small muted">Las respuestas aparecerán aquí.</p>
      )}
    </div>
  );
}
