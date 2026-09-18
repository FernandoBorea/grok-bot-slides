import { CheckSquare } from "@phosphor-icons/react";
import type { SlideDefinition } from "../../decks";
import type { SlideTheme } from "./useSlideTheme";

type SlideRailProps = {
  slides: SlideDefinition[];
  activeIndex: number;
  ended: boolean;
  theme: SlideTheme;
  onMove: (index: number) => void;
};

export function SlideRail({
  slides,
  activeIndex,
  ended,
  theme,
  onMove,
}: SlideRailProps) {
  return (
    <aside className="slides-rail">
      <div className="rail-heading">
        <span>SLIDES</span>
        <span>{String(slides.length).padStart(2, "0")}</span>
      </div>
      <nav aria-label="Slides del deck">
        {slides.map((item, index) => {
          const Thumbnail = item.component;
          return (
            <button
              key={item.slug}
              className={`slide-thumbnail ${index === activeIndex ? "selected" : ""}`}
              onClick={() => onMove(index)}
              disabled={ended}
              aria-current={index === activeIndex ? "step" : undefined}
            >
              <span className="thumbnail-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="thumbnail-content">
                <span
                  className="slide-stage"
                  data-slide-theme={theme}
                  aria-hidden="true"
                >
                  <Thumbnail />
                </span>
                <span className="thumbnail-caption">
                  {item.title}
                  {item.question && <CheckSquare size={13} />}
                </span>
              </span>
            </button>
          );
        })}
      </nav>
      <div className="rail-footer">
        <span className="keycap">←</span>
        <span className="keycap">→</span>
        <span>para avanzar</span>
      </div>
    </aside>
  );
}
