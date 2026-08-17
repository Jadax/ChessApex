import { Chess, type Move, type Square } from 'chess.js';
import { phaseFromFen } from '../chess/phase';
import type { EvaluatedMove, PositionSnapshot } from '../chess/types';
import { classifyMove } from '../analysis/classifier';
import { WeakAI, type CandidateMove } from './WeakAI';
import { evaluateMaterial } from '../analysis/MaterialEvaluator';

export interface EngineOptions { weakAI?: WeakAI; evaluate?: (fen: string) => Promise<number>; }

export class GameEngine {
  readonly chess: Chess;
  private readonly weakAI: WeakAI;
  private readonly evaluatePosition: (fen: string) => Promise<number>;
  private lastEvaluation = 0;

  constructor(fen?: string, options: EngineOptions = {}) {
    this.chess = new Chess(fen);
    this.weakAI = options.weakAI ?? new WeakAI();
    this.evaluatePosition = options.evaluate ?? (async (position) => evaluateMaterial(position));
  }

  get snapshot(): PositionSnapshot {
    const fen = this.chess.fen();
    return { fen, turn: this.chess.turn(), moveNumber: this.chess.moveNumber(), phase: phaseFromFen(fen) };
  }
  legalMoves(square?: Square): Move[] { return this.chess.moves({ square, verbose: true }); }
  isGameOver(): boolean { return this.chess.isGameOver(); }
  undo(): Move | null { return this.chess.undo(); }
  reset(): void { this.chess.reset(); this.lastEvaluation = 0; }
  pgn(): string { return this.chess.pgn(); }
  history(): string[] { return this.chess.history(); }

  async play(from: Square, to: Square, promotion?: 'q'|'r'|'b'|'n'): Promise<EvaluatedMove> {
    const before = this.chess.fen();
    const previousEvaluation = await this.evaluatePosition(before);
    const move = this.chess.move({ from, to, ...(promotion ? { promotion } : {}) });
    if (!move) throw new Error('Illegal move');
    const evaluation = await this.evaluatePosition(this.chess.fen());
    const delta = evaluation - previousEvaluation;
    const whiteDelta = move.color === 'w' ? delta : -delta;
    this.lastEvaluation = evaluation;
    return { san: move.san, uci: `${move.from}${move.to}${move.promotion ?? ''}`, evaluation, previousEvaluation, classification: classifyMove(whiteDelta, Math.abs(whiteDelta) < 0.12), feedback: this.feedback(move, whiteDelta) };
  }

  async playWeakAIMove(): Promise<EvaluatedMove | null> {
    const before = this.chess.fen();
    const moves = this.chess.moves({ verbose: true }) as unknown as CandidateMove[];
    const chosen = this.weakAI.choose(moves, (move) => this.scoreAIMove(before, move), this.chess.turn());
    if (!chosen) return null;
    return this.play(chosen.from as Square, chosen.to as Square, chosen.promotion as 'q'|'r'|'b'|'n'|undefined);
  }

  /** GRANDMASTER-NOTE: score every legal move with simple chess principles first; WeakAI then adds level-scaled noise. */
  private scoreAIMove(before: string, candidate: CandidateMove): number {
    const position = new Chess(before);
    const move = position.move({ from: candidate.from as Square, to: candidate.to as Square, ...(candidate.promotion ? { promotion: candidate.promotion as 'q'|'r'|'b'|'n' } : {}) });
    if (!move) return -999;
    const material = evaluateMaterial(position.fen()) / 100;
    const capture = move.captured === 'q' ? 9 : move.captured === 'r' ? 5 : move.captured === 'b' || move.captured === 'n' ? 3 : move.captured ? 1 : 0;
    const centre = ['d4', 'e4', 'd5', 'e5'].includes(move.to) ? .35 : ['c4', 'f4', 'c5', 'f5'].includes(move.to) ? .15 : 0;
    const development = move.piece === 'n' || move.piece === 'b' ? .18 : 0;
    const kingSafety = move.san.includes('O-O') ? .6 : 0;
    const forcing = move.san.includes('#') ? 12 : move.san.includes('+') ? 1.2 : 0;
    return material + capture + centre + development + kingSafety + forcing;
  }

  private feedback(move: Move, delta: number): string {
    if (delta <= -1.5) return `This move loses significant material. Look for ${move.color === 'w' ? 'king safety' : 'a forcing reply'} before committing.`;
    if (move.captured === 'q') return 'Excellent — you won the queen. Now simplify safely.';
    if (move.san.includes('O-O')) return 'Good instinct: castling connects your rook and shelters the king.';
    if (['e4', 'd4', 'e5', 'd5'].includes(move.to)) return 'Excellent development: you are contesting the centre immediately.';
    if (delta >= -0.2) return 'Solid move. Your position remains healthy and flexible.';
    return 'Pause and scan checks, captures, and threats before your next move.';
  }
}
