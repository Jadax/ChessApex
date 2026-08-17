import { Chess } from 'chess.js';
import { classifyMove } from './classifier';
import type { MoveClassification } from '../chess/types';

export interface ReviewSummary { moves: number; accuracy: number; classifications: Record<MoveClassification, number>; headline: string; }

export function reviewPgn(pgn: string): ReviewSummary {
  const chess = new Chess(); chess.loadPgn(pgn);
  const history = chess.history(); const classifications: Record<MoveClassification, number> = { brilliant:0, great:0, good:0, inaccuracy:0, mistake:0, blunder:0 };
  history.forEach((san, index) => { const category = classifyMove(san.includes('!') ? 0 : -(san.includes('?') ? 1.6 : 0.15 + (index % 4) * 0.08), san.includes('!')); classifications[category]++; });
  const accuracy = history.length ? Math.round(((classifications.brilliant * 1 + classifications.great * .95 + classifications.good * .82 + classifications.inaccuracy * .65 + classifications.mistake * .4) / history.length) * 100) : 0;
  const headline = classifications.blunder ? 'Your next unlock is the blunder-check habit.' : classifications.brilliant ? 'You found forcing ideas under pressure.' : 'A clean foundation — keep building consistency.';
  return { moves: history.length, accuracy, classifications, headline };
}
