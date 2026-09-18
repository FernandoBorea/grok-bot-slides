import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  ArrowRight,
  MagnifyingGlass,
  Stack,
  Clock,
  Broadcast,
} from "@phosphor-icons/react";
import { decks } from "../decks";
import { ShellHeader, ConnectionNotice } from "../components/Shell";

export function Library() {
  const [search, setSearch] = useState("");
  const filtered = decks.filter((deck) =>
    `${deck.title} ${deck.category}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  const featured = filtered[0];
  const FeaturedCover = featured?.slides[0].component;
  return (
    <div className="app-shell">
      <ShellHeader />
      <main className="library-main">
        <div className="library-intro">
          <div>
            <p className="eyebrow">
              <span className="status-dot" /> IDEAS PARA COMPARTIR
            </p>
            <h1>
              Presentaciones con
              <br />
              <span>personalidad.</span>
            </h1>
          </div>
          <p className="intro-aside">
            Tus ideas en la pantalla.
            <br />
            La conversación, en todas.<span>Presenta. Conecta. Construye.</span>
          </p>
        </div>
        <div className="library-heading">
          <h2>
            Tu biblioteca <span>{String(decks.length).padStart(2, "0")}</span>
          </h2>
          <label className="search-field">
            <MagnifyingGlass size={18} />
            <input
              aria-label="Buscar decks"
              placeholder="Buscar un deck…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                aria-label="Limpiar búsqueda"
                onClick={() => setSearch("")}
              >
                ×
              </button>
            )}
          </label>
        </div>
        {featured && FeaturedCover ? (
          <article className="featured-deck">
            <Link
              to="/deck/$deckSlug"
              params={{ deckSlug: featured.slug }}
              search={{ slide: undefined }}
              className="featured-cover"
              aria-label={`Abrir ${featured.title}`}
            >
              <div className="slide-stage">
                <FeaturedCover />
              </div>
            </Link>
          </article>
        ) : null}
        {featured && (
          <div className="featured-info">
            <div>
              <div className="deck-tag">
                <span className="status-dot green" /> LISTO PARA PRESENTAR{" "}
                <span className="tag-divider">/</span> {featured.category}
              </div>
              <h3>{featured.title}</h3>
              <p>{featured.description}</p>
              <div className="deck-facts">
                <span>
                  <Stack size={16} />
                  {featured.slides.length} slides
                </span>
                <span>
                  <Clock size={16} />
                  {featured.duration}
                </span>
                <span>
                  <Broadcast size={16} />
                  Interactivo
                </span>
              </div>
            </div>
            <Link
              className="button primary"
              to="/deck/$deckSlug"
              params={{ deckSlug: featured.slug }}
              search={{ slide: undefined }}
            >
              Abrir deck <ArrowUpRight size={19} />
            </Link>
          </div>
        )}
        {filtered.length > 1 && (
          <div className="more-decks">
            {filtered.slice(1).map((deck) => {
              const Cover = deck.slides[0].component;
              return (
                <article className="deck-tile" key={deck.slug}>
                  <Link
                    to="/deck/$deckSlug"
                    params={{ deckSlug: deck.slug }}
                    search={{ slide: undefined }}
                    className="tile-cover"
                    aria-label={`Abrir ${deck.title}`}
                  >
                    <div className="slide-stage">
                      <Cover />
                    </div>
                    <span className="cover-arrow">
                      <ArrowUpRight size={20} />
                    </span>
                  </Link>
                  <div className="tile-meta">
                    <div>
                      <span className="eyebrow">{deck.category}</span>
                      <h3>{deck.title}</h3>
                      <p>
                        {deck.slides.length} slides <span>·</span>{" "}
                        {deck.duration}
                      </p>
                    </div>
                    <ArrowRight size={22} />
                  </div>
                </article>
              );
            })}
          </div>
        )}
        {!featured && (
          <div className="search-empty">
            <MagnifyingGlass size={28} />
            <h3>No encontramos ese deck.</h3>
            <p>Prueba con 101, Engineering, Founders, GTM, Ops o Research.</p>
            <button className="button secondary" onClick={() => setSearch("")}>
              Ver todos los decks
            </button>
          </div>
        )}
        <ConnectionNotice />
        <footer className="library-footer">
          <span>Un poco de curiosidad hace grandes cosas.</span>
          <span>
            Grok bot Slides <span className="footer-dot">·</span> Hecho para
            compartir.
          </span>
        </footer>
      </main>
    </div>
  );
}
