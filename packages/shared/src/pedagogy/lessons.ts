import type { Lesson } from './types';

export const LESSONS: Lesson[] = [
  { id: 'foundation-checks', title: 'The Three Questions', tier: 'foundation', summary: 'Build the blunder-check habit.', objective: 'Scan checks, captures, and threats before every move.', fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1', prompt: 'What is your opponent threatening?' },
  { id: 'foundation-mates', title: 'Mate in One Radar', tier: 'foundation', summary: 'Spot forcing finishes instantly.', objective: 'Recognize open lines to the king.', fen: '6k1/5ppp/8/8/8/5Q2/6PP/6K1 w - - 0 1', prompt: 'Find the checkmate.' },
  { id: 'developing-center', title: 'Own the Centre', tier: 'developing', summary: 'Turn central space into active pieces.', objective: 'Use pawns to claim space, then develop with tempo.', fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1', prompt: 'Choose a move that contests the centre.' },
  { id: 'tactical-forks', title: 'Forks That Forge Wins', tier: 'tactical', summary: 'Create double attacks with tempo.', objective: 'Find a forcing knight fork on king and queen.', fen: 'r3k2r/pppq1ppp/2np4/8/4N3/8/PPPP1PPP/R1BQK2R w KQkq - 0 1', prompt: 'Which knight jump attacks two valuable targets?' },
  { id: 'strategic-outposts', title: 'Build an Outpost', tier: 'strategic', summary: 'Make a square your opponent cannot chase.', objective: 'Place a minor piece on a protected, stable central square.', fen: 'r1bq1rk1/ppp2ppp/2np4/3Np3/3P4/8/PPP1NPPP/R1BQ1RK1 w - - 0 1', prompt: 'Where is the safest active square for your knight?' }
];
