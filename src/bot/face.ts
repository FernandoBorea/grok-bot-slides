// Extracted/adapted from bloub, Copyright (c) 2026 Jérémy Perret.
// MIT license: ./LICENSE. Source details: ../../docs/bot-origin.md.

/**
 * Les yeux sont peints sur une sphere, pas poses a plat.
 *
 * Mesure sur la video : l'oeil le plus proche du bord fait 0.69 fois la largeur
 * de l'autre, et son aire 0.663 fois — exactement le facteur de profondeur
 * (z = 0.669) d'un point de sphere a cette distance du centre. On modelise donc
 * une vraie orientation de tete : chaque oeil recupere le repere tangent de la
 * sphere, projete en orthographique. La compression et l'inclinaison en
 * decoulent toutes seules, c'est ce qui donne le volume.
 *
 * Les constantes ci-dessous ne sont pas choisies a la main : elles sortent d'un
 * ajustement du modele sur les positions et tailles relevees image par image
 * (erreur residuelle ~1 px sur un rayon de 190 px).
 */

type Vec3 = [number, number, number];

/** Demi-ecart des yeux sur la sphere, en degres (separation totale ~31deg). */
export const EYE_SPLIT = 15.46;
/** Taille de l'oeil au repos, en unites de rayon de boule. */
export const EYE_W = 0.186;
export const EYE_H = 0.412;

/** Orientation de tete au repos, ajustee sur les frames de reference. */
export const REST_GAZE: HeadGaze = { yaw: 28.49, pitch: 28.62, roll: -13 };

export interface EyePose {
  x: number;
  y: number;
  /** matrice tangente 2x2 : [a b c d] au sens SVG matrix(a,b,c,d,e,f) */
  a: number;
  b: number;
  c: number;
  d: number;
  /** composante z de la normale : > 0 = face visible */
  depth: number;
}

export interface HeadGaze {
  /** lacet, degres, positif = regarde a droite */
  yaw: number;
  /** tangage, degres, positif = regarde en haut */
  pitch: number;
  /** roulis, degres, inclinaison de la tete */
  roll: number;
}

const deg = (d: number) => (d * Math.PI) / 180;

/** Fait tourner deux vecteurs d'un repere orthonorme dans leur plan commun. */
function spin(u: Vec3, v: Vec3, angle: number): [Vec3, Vec3] {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [
    [u[0] * c + v[0] * s, u[1] * c + v[1] * s, u[2] * c + v[2] * s],
    [v[0] * c - u[0] * s, v[1] * c - u[1] * s, v[2] * c - u[2] * s],
  ];
}

/**
 * Repere de la tete puis des deux yeux.
 * Repere ecran : x a droite, y vers le bas, z vers le spectateur.
 * L'indice 0 est l'oeil interieur, l'indice 1 l'oeil exterieur.
 */
export function eyePoses(
  gaze: HeadGaze,
  scale: number,
  split = EYE_SPLIT,
): [EyePose, EyePose] {
  let f: Vec3 = [0, 0, 1];
  let right: Vec3 = [1, 0, 0];
  let down: Vec3 = [0, 1, 0];

  // lacet : forward bascule vers right
  [f, right] = spin(f, right, deg(gaze.yaw));
  // tangage : forward bascule vers le haut (donc a l'oppose de down)
  [down, f] = spin(down, f, deg(gaze.pitch));
  // roulis : la tete penche dans son propre plan
  [right, down] = spin(right, down, deg(gaze.roll));

  const build = (side: number): EyePose => {
    const [ef, er] = spin(f, right, deg(split * side));
    return {
      x: ef[0] * scale,
      y: ef[1] * scale,
      a: er[0],
      b: er[1],
      c: down[0],
      d: down[1],
      depth: ef[2],
    };
  };

  return [build(-1), build(1)];
}
