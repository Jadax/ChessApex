import type { GamePhase } from './types';

export function phaseFromFen(fen: string): GamePhase {
  const pieces = fen.split(' ')[0] ?? '';
  const nonPawns = (pieces.match(/[QRBNqrb]/g) ?? []).length;
  const move = Number(fen.split(' ')[5] ?? 1);
  if (nonPawns <= 4 || move >= 40) return 'endgame';
  if (move <= 12) return 'opening';
  return 'middlegame';
}
