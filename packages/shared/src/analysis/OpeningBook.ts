export interface OpeningNode { eco: string; name: string; moves: string[]; idea: string; }
const BOOK: OpeningNode[] = [
  { eco:'B20', name:'Sicilian Defence', moves:['e4','c5'], idea:'Fight for the centre asymmetrically and prepare active counterplay.' },
  { eco:'C50', name:'Italian Game', moves:['e4','e5','Nf3','Nc6','Bc4'], idea:'Develop quickly and pressure f7 before choosing a centre plan.' },
  { eco:'C60', name:'Ruy Lopez', moves:['e4','e5','Nf3','Nc6','Bb5'], idea:'Increase pressure on the e5 pawn and keep long-term central tension.' },
  { eco:'D00', name:'Queen’s Pawn Game', moves:['d4','d5'], idea:'Build a broad centre and choose between development and tension.' },
  { eco:'E12', name:'Queen’s Indian Setup', moves:['d4','Nf6','c4','e6'], idea:'Control the dark squares and prepare flexible central breaks.' }
];
export function identifyOpening(sans: string[]): OpeningNode | undefined { return BOOK.filter((entry) => entry.moves.every((move, i) => sans[i] === move)).sort((a,b)=>b.moves.length-a.moves.length)[0]; }
export function openingBook(): OpeningNode[] { return BOOK; }
