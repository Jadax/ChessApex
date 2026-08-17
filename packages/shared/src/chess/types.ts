export type Color = 'w' | 'b';
export type MoveClassification = 'brilliant' | 'great' | 'good' | 'inaccuracy' | 'mistake' | 'blunder';
export type GamePhase = 'opening' | 'middlegame' | 'endgame';

export interface PositionSnapshot {
  fen: string;
  turn: Color;
  moveNumber: number;
  phase: GamePhase;
}

export interface EvaluatedMove {
  san: string;
  uci: string;
  evaluation: number;
  previousEvaluation: number;
  classification: MoveClassification;
  feedback: string;
}
