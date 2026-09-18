import { useCallback, useEffect, useState } from "react";
import { useLiveTransport } from "./LiveProvider";
import { emptySnapshot } from "./types";
import type { SessionSnapshot } from "./types";

export function useSession(sessionId: string) {
  const transport = useLiveTransport();
  const [snapshot, setSnapshot] = useState<SessionSnapshot>(emptySnapshot);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setSnapshot(emptySnapshot);
    setIsLoading(true);
    setError(null);
    return transport.subscribe(
      sessionId,
      (value) => {
        setSnapshot(value);
        setIsLoading(false);
        setError(null);
      },
      (reason) => {
        setIsLoading(false);
        setError(reason.message);
      },
    );
  }, [sessionId, transport]);

  const run = useCallback(async (action: () => Promise<void>) => {
    setError(null);
    try {
      await action();
    } catch (reason) {
      const failure =
        reason instanceof Error
          ? reason
          : new Error("No pudimos completar esta acción.");
      setError(failure.message);
      throw failure;
    }
  }, []);

  const join = useCallback(
    () => run(() => transport.join(sessionId)),
    [run, sessionId, transport],
  );
  const navigate = useCallback(
    (slug: string) =>
      run(() => transport.update(sessionId, { type: "navigate", slug })),
    [run, sessionId, transport],
  );
  const slideSlug = snapshot.session?.activeSlideSlug ?? "";
  const setQuestionOpen = useCallback(
    (open: boolean) =>
      run(() =>
        transport.update(sessionId, { type: "question", open, slideSlug }),
      ),
    [run, sessionId, slideSlug, transport],
  );
  const setShowResults = useCallback(
    (show: boolean) =>
      run(() =>
        transport.update(sessionId, { type: "results", show, slideSlug }),
      ),
    [run, sessionId, slideSlug, transport],
  );
  const endSession = useCallback(
    () => run(() => transport.update(sessionId, { type: "end" })),
    [run, sessionId, transport],
  );
  const vote = useCallback(
    (optionIds: string[], expectedSlideSlug: string) =>
      run(() => transport.vote(sessionId, optionIds, expectedSlideSlug)),
    [run, sessionId, transport],
  );

  return {
    ...snapshot,
    isLoading,
    error,
    join,
    navigate,
    setQuestionOpen,
    setShowResults,
    endSession,
    vote,
  };
}
