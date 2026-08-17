import type { Color } from '../chess/types';

export interface CandidateMove { from: string; to: string; promotion?: string; san?: string; }

/** A deliberately bounded opponent model: it selects among legal moves using a noisy skill curve. */
export class WeakAI {
  constructor(private readonly elo = 850) {}

  choose<T extends CandidateMove>(moves: T[], evaluate: (move: T) => number, side: Color): T | undefined {
    if (!moves.length) return undefined;
    const skill = Math.max(0, Math.min(1, (this.elo - 400) / 1600));
    const ranked = moves.map((move) => ({ move, score: evaluate(move) * (side === 'w' ? 1 : -1) }))
      .sort((a, b) => b.score - a.score);
    const noise = (1 - skill) * Math.min(8, ranked.length - 1);
    const index = Math.floor(Math.random() * (noise + 1));
    return ranked[Math.min(index, ranked.length - 1)]?.move;
  }
}
