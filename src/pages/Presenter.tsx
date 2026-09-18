import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Users } from "@phosphor-icons/react";
import { deckRoute, presenterRoute } from "../router";
import { findDeck, type Deck } from "../decks";
import { ConnectionNotice } from "../components/Shell";
import { ShareModal } from "../components/ShareModal";
import { PresenterHeader } from "../components/presenter/PresenterHeader";
import { SlideRail } from "../components/presenter/SlideRail";
import { SlideControls } from "../components/presenter/SlideControls";
import { PresenterDetails } from "../components/presenter/PresenterDetails";
import { EndSessionModal } from "../components/presenter/EndSessionModal";
import { ProjectedQuestion } from "../components/presenter/ProjectedQuestion";
import { useSlideTheme } from "../components/presenter/useSlideTheme";
import { useLive } from "../live/LiveProvider";
import { useSession } from "../live/useSession";

type LiveSession = ReturnType<typeof useSession>;

export function DeckPage() {
  const { deckSlug } = deckRoute.useParams();
  const { slide } = deckRoute.useSearch();
  const deck = findDeck(deckSlug);
  return deck ? (
    <Workbench key={deck.slug} deck={deck} initialSlide={slide} />
  ) : (
    <MissingDeck />
  );
}

export function PresenterPage() {
  const { deckSlug, sessionId } = presenterRoute.useParams();
  const live = useSession(sessionId);
  const deck = findDeck(deckSlug);
  if (!deck) return <MissingDeck />;
  if (live.isLoading)
    return (
      <main className="empty-page">
        <div className="loading-block" />
        <p>Abriendo tu sesión…</p>
      </main>
    );
  if (!live.session)
    return (
      <main className="empty-page">
        <h1>No encontramos esta sesión.</h1>
        <p>
          {live.error ||
            "Puede pertenecer a otro navegador o a otra variante del proyecto."}
        </p>
        <Link
          to="/deck/$deckSlug"
          params={{ deckSlug }}
          search={{ slide: undefined }}
          className="button primary"
        >
          Abrir el deck
        </Link>
      </main>
    );
  if (!live.isPresenter || live.session.deckSlug !== deckSlug)
    return (
      <main className="empty-page">
        <h1>Esta es la vista del presentador.</h1>
        <p>
          Los controles están disponibles en el navegador que inició la sesión.
        </p>
        <Link
          to="/join/$sessionId"
          params={{ sessionId }}
          className="button primary"
        >
          Ir a la vista del público
        </Link>
      </main>
    );
  const metadata = deck.slides.map(
    ({ component: _component, ...meta }) => meta,
  );
  if (stableContent(metadata) !== stableContent(live.session.slides))
    return (
      <main className="empty-page">
        <h1>Este deck cambió desde que inició la sesión.</h1>
        <p>
          Abre una nueva sesión para que las slides, las preguntas y la guía del
          público usen el mismo contenido.
        </p>
        <Link
          to="/deck/$deckSlug"
          params={{ deckSlug }}
          search={{ slide: undefined }}
          className="button primary"
        >
          Abrir la versión actual
        </Link>
      </main>
    );
  return <Workbench deck={deck} live={live} sessionId={sessionId} />;
}

function stableContent(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stableContent).join(",")}]`;
  if (value && typeof value === "object")
    return `{${Object.entries(value)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, item]) => `${JSON.stringify(key)}:${stableContent(item)}`)
      .join(",")}}`;
  return JSON.stringify(value) ?? "";
}

function MissingDeck() {
  return (
    <main className="empty-page">
      <h1>Ese deck todavía no existe.</h1>
      <Link to="/" className="button primary">
        Ver la biblioteca
      </Link>
    </main>
  );
}

function Workbench({
  deck,
  initialSlide,
  live,
  sessionId,
}: {
  deck: Deck;
  initialSlide?: string;
  live?: LiveSession;
  sessionId?: string;
}) {
  const [previewIndex, setPreviewIndex] = useState(() =>
    Math.max(
      0,
      deck.slides.findIndex((s) => s.slug === initialSlide),
    ),
  );
  const [share, setShare] = useState(false);
  const [confirmEnd, setConfirmEnd] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [busy, setBusy] = useState(false);
  const [actionError, setActionError] = useState("");
  const stage = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useSlideTheme(deck.slug);
  const navigate = useNavigate();
  const { createSession } = useLive();
  const activeIndex = live?.session
    ? Math.max(
        0,
        deck.slides.findIndex((s) => s.slug === live.session!.activeSlideSlug),
      )
    : previewIndex;
  const slide = deck.slides[activeIndex];
  const Component = slide.component;
  const ended = live?.session?.status === "ended";
  const votingOpen = live?.session?.questionOpen ?? false;
  async function performAction(action: () => Promise<void>): Promise<boolean> {
    setActionError("");
    setBusy(true);
    try {
      await action();
      return true;
    } catch (error) {
      setActionError(
        error instanceof Error
          ? error.message
          : "No pudimos guardar el cambio. Intenta de nuevo.",
      );
      return false;
    } finally {
      setBusy(false);
    }
  }
  function move(index: number) {
    if (
      index === activeIndex ||
      index < 0 ||
      index >= deck.slides.length ||
      busy ||
      ended
    )
      return;
    if (live) void performAction(() => live.navigate(deck.slides[index].slug));
    else {
      setPreviewIndex(index);
      void navigate({
        to: "/deck/$deckSlug",
        params: { deckSlug: deck.slug },
        search: { slide: deck.slides[index].slug },
        replace: true,
      });
    }
  }
  useEffect(() => {
    function keydown(e: KeyboardEvent) {
      if (
        document.querySelector("dialog[open]") ||
        e.altKey ||
        e.ctrlKey ||
        e.metaKey ||
        (e.target instanceof HTMLElement &&
          (e.target.closest("input,textarea,select") ||
            (e.key === " " && e.target.closest("button,a")) ||
            e.target.isContentEditable))
      )
        return;
      if (["ArrowRight", "ArrowDown", " "].includes(e.key)) {
        e.preventDefault();
        move(activeIndex + 1);
      }
      if (["ArrowLeft", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        move(activeIndex - 1);
      }
      if (e.key === "Home") {
        e.preventDefault();
        move(0);
      }
      if (e.key === "End") {
        e.preventDefault();
        move(deck.slides.length - 1);
      }
      if (e.key === "Escape") setFocusMode(false);
    }
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  });
  useEffect(() => {
    const update = () => {
      if (!document.fullscreenElement) setFocusMode(false);
    };
    document.addEventListener("fullscreenchange", update);
    return () => document.removeEventListener("fullscreenchange", update);
  }, []);
  async function finishSession() {
    const completed = await performAction(() => live!.endSession());
    if (completed) setConfirmEnd(false);
  }
  async function start() {
    await performAction(async () => {
      const id = await createSession({
        deckSlug: deck.slug,
        deckTitle: deck.title,
        slides: deck.slides.map(({ component: _component, ...meta }) => meta),
      });
      await navigate({
        to: "/present/$deckSlug/$sessionId",
        params: { deckSlug: deck.slug, sessionId: id },
      });
    });
  }
  async function fullscreen() {
    if (focusMode) {
      if (document.fullscreenElement) await document.exitFullscreen();
      setFocusMode(false);
    } else {
      setFocusMode(true);
      try {
        await stage.current?.requestFullscreen?.();
      } catch {
        /* The distraction-free layout still works when fullscreen is unavailable. */
      }
    }
  }
  return (
    <div className="presenter-shell">
      <PresenterHeader
        isLive={!!live}
        ended={ended}
        busy={busy}
        onStart={() => void start()}
        onEnd={() => setConfirmEnd(true)}
      />
      <div className="presenter-body">
        <SlideRail
          slides={deck.slides}
          activeIndex={activeIndex}
          ended={ended}
          theme={theme}
          onMove={move}
        />
        <main className="presenter-main">
          <div className="workspace-heading">
            <div>
              <p className="eyebrow">
                {deck.category} <span>/</span> {deck.duration}
              </p>
              <h1>{deck.title}</h1>
            </div>
            {live && (
              <span className="participant-count">
                <Users size={18} />
                {live.participants.length}
                <span>participantes</span>
              </span>
            )}
          </div>
          <div
            ref={stage}
            className={`presentation-area ${focusMode ? "focus-mode" : ""}`}
          >
            <div
              className={`projection-surface ${slide.question ? "has-question" : ""}`}
              data-slide-theme={theme}
            >
              <div
                className="slide-stage active-stage"
                data-slide-theme={theme}
                data-testid="active-slide"
              >
                <Component />
              </div>
              {slide.question && (
                <ProjectedQuestion
                  question={slide.question}
                  votes={live?.votes ?? []}
                  slideSlug={slide.slug}
                  isLive={!!live}
                  votingOpen={votingOpen && !ended}
                />
              )}
            </div>
            <SlideControls
              activeIndex={activeIndex}
              slideCount={deck.slides.length}
              title={slide.title}
              busy={busy}
              ended={ended}
              focusMode={focusMode}
              isLive={!!live}
              theme={theme}
              onToggleTheme={toggleTheme}
              onMove={move}
              onFullscreen={() => void fullscreen()}
              onShare={() => setShare(true)}
            />
            {focusMode && share && sessionId && (
              <ShareModal
                sessionId={sessionId}
                question={votingOpen ? slide.question?.prompt : undefined}
                onClose={() => setShare(false)}
              />
            )}
          </div>
          {(actionError || live?.error) && (
            <div role="alert" className="error-message">
              {actionError || live?.error}
            </div>
          )}
          {ended && (
            <div className="notice">
              Esta sesión terminó. La audiencia conserva la última guía y ya no
              puede enviar respuestas.
            </div>
          )}
          <PresenterDetails
            slide={slide}
            isLive={!!live}
            busy={busy}
            ended={ended}
            votingOpen={votingOpen}
            showResults={live?.session?.showResults ?? false}
            onQuestionOpen={(open) => {
              if (live) void performAction(() => live.setQuestionOpen(open));
            }}
            onShowResults={() => {
              if (live)
                void performAction(() =>
                  live.setShowResults(!live.session?.showResults),
                );
            }}
            onShare={() => setShare(true)}
          />
          <ConnectionNotice />
        </main>
      </div>
      {share && !focusMode && sessionId && (
        <ShareModal
          sessionId={sessionId}
          question={votingOpen ? slide.question?.prompt : undefined}
          onClose={() => setShare(false)}
        />
      )}
      {confirmEnd && (
        <EndSessionModal
          busy={busy}
          onClose={() => setConfirmEnd(false)}
          onFinish={() => void finishSession()}
        />
      )}
    </div>
  );
}
