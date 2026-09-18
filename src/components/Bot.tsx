import { useMemo } from "react";
import { createBotGeometry, type BotShape } from "../bot/model";

export interface BotProps {
  seed?: number;
  color?: string;
  shape?: BotShape;
  className?: string;
  expression?: string;
}

/** A decorative, static bot built from bloub's original radial and eye geometry. */
export function Bot({
  seed = 0,
  color = "currentColor",
  shape = "round",
  className,
  expression = "neutral",
}: BotProps) {
  const geometry = useMemo(
    () => createBotGeometry(shape, expression, seed),
    [shape, expression, seed],
  );

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-118 -118 236 236"
      width="100%"
      height="100%"
      className={className}
      aria-hidden="true"
      focusable="false"
      data-bot-shape={shape}
    >
      <path d={geometry.body} fill={color} fillOpacity={1} />
      {geometry.eyes.map((eye, index) => (
        <path
          key={index}
          d={eye.d}
          transform={eye.transform}
          fill="#050505"
          fillOpacity={1}
          opacity={1}
          data-bot-eye="solid"
          style={{ mixBlendMode: "normal" }}
        />
      ))}
    </svg>
  );
}

export default Bot;
