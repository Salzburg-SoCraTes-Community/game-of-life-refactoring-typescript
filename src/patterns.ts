export const PATTERNS = {
  BLINKER: `
...
OOO
...
`.trim(),

  GLIDER: `
.O.
..O
OOO
`.trim(),

  BLOCK: `
OO
OO
`.trim(),

  TOAD: `
.OOO
OOO.
`.trim(),

  BEACON: `
OO..
OO..
..OO
..OO
`.trim()
};

export function getBlinkerPattern(): string {
  return PATTERNS.BLINKER;
}

export function getGliderPattern(): string {
  return PATTERNS.GLIDER;
}

export function getBlockPattern(): string {
  return PATTERNS.BLOCK;
}

export function getToadPattern(): string {
  return PATTERNS.TOAD;
}

export function getBeaconPattern(): string {
  return PATTERNS.BEACON;
}
