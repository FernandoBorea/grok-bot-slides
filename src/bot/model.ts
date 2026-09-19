// Static React adapter around the MIT-licensed bloub geometry. See ./LICENSE.
import { EXPRESSION_BY_ID } from "./expressions";
import { eyePoses } from "./face";
import {
  capsulePath,
  closedPath,
  PROFILE_SAMPLES,
  r2,
  radiusAtAngle,
  regularPolygonProfile,
  superellipseProfile,
  toPoints,
  unionOfCirclesProfile,
} from "./geometry";

export type BotShape = "round" | "flower" | "square" | "triangle" | "hexagon";

function normalize(radii: number[], max = 1) {
  const peak = Math.max(...radii);
  return radii.map((radius) => (radius * max) / peak);
}

const flowerCircles = Array.from({ length: 6 }, (_, index) => {
  const angle = (index * Math.PI) / 3 - Math.PI / 2;
  return { x: Math.cos(angle) * 0.5, y: Math.sin(angle) * 0.5, r: 0.55 };
});

/** Original customizer profiles; flower adapts its union-of-circles construction. */
const shapes: Record<BotShape, number[]> = {
  round: new Array(PROFILE_SAMPLES).fill(1),
  square: normalize(superellipseProfile(4.2), 1.15),
  triangle: regularPolygonProfile(3, 1.12, 0.34, -90),
  hexagon: regularPolygonProfile(6, 1.1, 0.28, -90),
  flower: normalize(unionOfCirclesProfile(flowerCircles), 1.02),
};

const expressionAliases: Record<string, string> = {
  neutral: "neutre",
  attentive: "attentif",
  happy: "heureux",
  curious: "curieux",
  surprised: "surpris",
  sleepy: "somnolent",
  excited: "excite",
  thinking: "curieux",
  wink: "mefiant",
};

type Matrix = [number, number, number, number, number, number];

interface Eye {
  d: string;
  matrix: Matrix;
  edge: Array<{ x: number; y: number }>;
}

/** Sample capsule edges to keep both eye holes entirely inside narrow silhouettes. */
function capsuleEdge(width: number, height: number) {
  const radius = Math.min(width, height) / 2;
  const dx = width / 2 - radius;
  const dy = height / 2 - radius;
  return Array.from({ length: 40 }, (_, index) => {
    const angle = (index / 40) * Math.PI * 2;
    return {
      x: Math.cos(angle) * radius + Math.sign(Math.cos(angle)) * dx,
      y: Math.sin(angle) * radius + Math.sign(Math.sin(angle)) * dy,
    };
  });
}

/**
 * Static counterpart of the original eyefit correction: translate the pair together.
 * There is no animation or per-frame fitting. Keeping a common translation preserves
 * the original eye separation, capsule sizes and spherical perspective.
 */
function fitEyes(eyes: Eye[], radii: number[]) {
  if (!eyes.length) return;
  const centerX =
    eyes.reduce((sum, eye) => sum + eye.matrix[4], 0) / eyes.length;
  const centerY =
    eyes.reduce((sum, eye) => sum + eye.matrix[5], 0) / eyes.length;
  for (let step = 0; step <= 40; step++) {
    const fraction = step / 40;
    const tx = -centerX * fraction;
    const ty = -centerY * fraction;
    const fits = eyes.every((eye) => {
      const [a, b, c, d, x, y] = eye.matrix;
      return eye.edge.every((point) => {
        const px = a * point.x + c * point.y + x + tx;
        const py = b * point.x + d * point.y + y + ty;
        return (
          Math.hypot(px, py) + 4 <=
          radiusAtAngle(radii, Math.atan2(py, px)) * 100
        );
      });
    });
    if (fits || step === 40) {
      for (const eye of eyes) {
        eye.matrix[4] += tx;
        eye.matrix[5] += ty;
      }
      return;
    }
  }
}

export function createBotGeometry(
  shape: BotShape = "round",
  expression = "neutral",
  seed = 0,
) {
  const radii = shapes[shape] ?? shapes.round;
  const face =
    EXPRESSION_BY_ID.get(expressionAliases[expression] ?? expression) ??
    EXPRESSION_BY_ID.get("neutre")!;
  const safeSeed = Number.isFinite(seed) ? seed : 0;
  const seedOffset = Math.sin(safeSeed * 12.9898) * 4;
  // The slides' reference art uses a centered, larger face. Retain bloub's
  // spherical projection, while art-directing its neutral pose for this deck.
  const baseGaze =
    face.id === "neutre" ? { yaw: 0, pitch: 0, roll: -12 } : face.gaze;
  const gaze = { ...baseGaze, yaw: baseGaze.yaw + seedOffset };
  const eyeScale = 1.3;
  const eyes: Eye[] = eyePoses(gaze, 100, face.split).flatMap((pose, index) => {
    if (pose.depth <= 0.02) return [];
    const config = face.eyes[index]!;
    const fit = radiusAtAngle(radii, Math.atan2(pose.y, pose.x));
    const angle = ((config.tilt ?? 0) * Math.PI) / 180;
    const cp = Math.cos(angle);
    const sp = Math.sin(angle);
    const lid = 0.06 + 0.94 * Math.min(1, Math.max(0, config.open));
    return [
      {
        d: capsulePath(config.w * 100 * eyeScale, config.h * 100 * eyeScale),
        matrix: [
          pose.a * cp + pose.c * sp,
          (pose.b * cp + pose.d * sp) * lid,
          -pose.a * sp + pose.c * cp,
          (-pose.b * sp + pose.d * cp) * lid,
          pose.x * fit,
          pose.y * fit,
        ] as Matrix,
        edge: capsuleEdge(config.w * 100 * eyeScale, config.h * 100 * eyeScale),
      },
    ];
  });
  fitEyes(eyes, radii);
  return {
    body: closedPath(
      toPoints({ radii, rot: 0, cx: 0, cy: 0, sx: 1, sy: 1 }, 100),
    ),
    eyes: eyes.map((eye) => ({
      d: eye.d,
      transform: `matrix(${eye.matrix.map(r2).join(" ")})`,
    })),
  };
}
