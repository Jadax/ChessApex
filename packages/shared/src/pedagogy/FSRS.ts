import type { ReviewCard } from './types';
export type Rating = 1 | 2 | 3 | 4;

export function retrievability(card: ReviewCard, now = new Date()): number { const days = Math.max(0, (now.getTime() - new Date(card.dueAt).getTime()) / 86400000); return Math.pow(0.9, days / Math.max(card.stability, 0.1)); }

export function schedule(card: ReviewCard, rating: Rating, now = new Date()): ReviewCard {
  const success = rating >= 3;
  const difficulty = Math.max(1, Math.min(10, card.difficulty + 0.3 * (3 - rating)));
  const retrieval = retrievability(card, now);
  const stability = success ? card.stability * (1 + (0.18 + rating * 0.08) * (11 - difficulty) / 10 + (1-retrieval)*0.22) : Math.max(0.2, card.stability * 0.35);
  const days = success ? Math.max(1, Math.round(stability)) : 1;
  return { ...card, difficulty, stability, reps: card.reps + (success ? 1 : 0), lapses: card.lapses + (success ? 0 : 1), dueAt: new Date(now.getTime() + days * 86400000).toISOString() };
}
