import { Chess } from 'chess.js';
import type { Color } from '../chess/types';

const values: Record<string, number> = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 0 };
export function evaluateMaterial(fen: string): number {
  const chess = new Chess(fen); let score = 0;
  for (const rank of chess.board()) for (const piece of rank) if (piece) score += (piece.color === 'w' ? 1 : -1) * (values[piece.type] ?? 0);
  return score;
}
export function evaluateForSide(fen: string, side: Color): number { const score = evaluateMaterial(fen); return side === 'w' ? score : -score; }
