import type { MoveClassification } from '../chess/types';

export function classifyMove(delta: number, isBestMove: boolean): MoveClassification {
  if (isBestMove && delta >= -0.1) return 'brilliant';
  if (delta >= -0.2) return 'great';
  if (delta >= -0.45) return 'good';
  if (delta >= -0.8) return 'inaccuracy';
  if (delta >= -1.5) return 'mistake';
  return 'blunder';
}
