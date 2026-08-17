import type { GamePhase } from '../chess/types';
export interface PrincipleContext { san: string; phase: GamePhase; captured?: string; evaluationDelta: number; }

export function principleFeedback(context: PrincipleContext): string {
  if (context.evaluationDelta <= -1.5) return 'Blunder alert: the position changed sharply. Re-check every forcing reply before moving.';
  if (context.captured === 'q') return 'Tactical conversion: the queen is gone. Reduce counterplay and bring the game home.';
  if (context.san.includes('O-O')) return 'King safety unlocked: castling completes development and connects your rooks.';
  if (context.phase === 'opening' && /[NBRQ]/.test(context.san[0] ?? '')) return 'Develop with purpose: bring a new piece toward the centre and keep tempi precious.';
  if (context.phase === 'endgame') return 'Endgame lens: activate your king and calculate pawn races before making a quiet move.';
  return 'Keep the initiative: compare your move against your opponent’s strongest check, capture, and threat.';
}
