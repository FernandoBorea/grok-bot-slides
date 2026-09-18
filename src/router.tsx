import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  Link,
} from "@tanstack/react-router";
import { Library } from "./pages/Library";
import { DeckPage, PresenterPage } from "./pages/Presenter";
import { AudiencePage } from "./pages/Audience";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: () => (
    <main className="empty-page">
      <h1>Por aquí no hay slides.</h1>
      <p>Este enlace no existe o cambió de dirección.</p>
      <Link to="/" className="button primary">
        Volver a los decks
      </Link>
    </main>
  ),
  errorComponent: ({ error, reset }) => (
    <main className="empty-page">
      <h1>No pudimos abrir esta vista.</h1>
      <p>
        {error instanceof Error
          ? error.message
          : "Ocurrió un error inesperado."}
      </p>
      <button className="button primary" onClick={reset}>
        Reintentar
      </button>
      <a href="/">Volver a los decks</a>
    </main>
  ),
});
const libraryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Library,
});
export const deckRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/deck/$deckSlug",
  validateSearch: (search: Record<string, unknown>) => ({
    slide: typeof search.slide === "string" ? search.slide : undefined,
  }),
  component: DeckPage,
});
export const presenterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/present/$deckSlug/$sessionId",
  component: PresenterPage,
});
export const audienceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/join/$sessionId",
  component: AudiencePage,
});
export const router = createRouter({
  routeTree: rootRoute.addChildren([
    libraryRoute,
    deckRoute,
    presenterRoute,
    audienceRoute,
  ]),
  defaultPreload: "intent",
  scrollRestoration: true,
});
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
