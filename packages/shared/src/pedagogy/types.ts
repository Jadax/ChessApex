export type Tier = 'foundation' | 'developing' | 'tactical' | 'strategic' | 'expert';
export interface Lesson { id: string; title: string; tier: Tier; summary: string; objective: string; fen: string; prompt: string; }
export interface ReviewCard { id: string; dueAt: string; stability: number; difficulty: number; reps: number; lapses: number; }
