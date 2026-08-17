import type { Color, GamePhase, MoveClassification } from '../chess/types';

export interface EngineLine { multipv: number; depth: number; scoreCp: number; mate?: number; pv: string[]; san: string[]; }
export interface PositionAnalysis { fen: string; sideToMove: Color; depth: number; lines: EngineLine[]; bestMove?: string; source: 'stockfish' | 'fallback'; }
export interface MoveAnalysis { ply: number; san: string; uci: string; fenBefore: string; fenAfter: string; side: Color; evalBefore: number; evalAfter: number; bestEval: number; centipawnLoss: number; classification: MoveClassification; phase: GamePhase; coachNote: string; }
export interface GameAnalysis { pgn: string; moves: MoveAnalysis[]; summary: { accuracy: number; confidence: 'engine'|'heuristic'; avgCentipawnLoss: number; blunders: number; mistakes: number; inaccuracies: number; bestPhase: GamePhase; headline: string; }; }
