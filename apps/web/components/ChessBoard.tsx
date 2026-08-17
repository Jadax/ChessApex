'use client';
import { useState } from 'react';
import { Chess } from 'chess.js';
import { GameEngine } from '@chessapex/shared';
import { Chessboard } from 'react-chessboard';

const glyph: Record<string,string> = { wK:'♔',wQ:'♕',wR:'♖',wB:'♗',wN:'♘',wP:'♙',bK:'♚',bQ:'♛',bR:'♜',bB:'♝',bN:'♞',bP:'♟' };
export function ChessBoard() {
  const [engine] = useState(() => new GameEngine()); const [fen, setFen] = useState(engine.snapshot.fen); const [selected, setSelected] = useState<string>(); const [message, setMessage] = useState('Your move — start with a central pawn.');
  const chess = new Chess(fen); const legal = selected ? chess.moves({ square: selected as never, verbose: true }) : []; const legalStyles = Object.fromEntries(legal.map((move) => [move.to, { background: 'radial-gradient(circle, #81b64c 0 18%, transparent 20%)' }]));
  const tone = (capture:boolean) => { const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext; if(!AudioContextClass) return; const audio = new AudioContextClass(); const oscillator=audio.createOscillator(); const gain=audio.createGain(); oscillator.frequency.value=capture?180:420; gain.gain.setValueAtTime(.035,audio.currentTime); gain.gain.exponentialRampToValueAtTime(.001,audio.currentTime+.12); oscillator.connect(gain); gain.connect(audio.destination); oscillator.start(); oscillator.stop(audio.currentTime+.12); };
  const drop = (from:string,to:string) => { void (async()=>{ try { const result = await engine.play(from as never,to as never); tone(Boolean(result.san.includes('x'))); setFen(engine.snapshot.fen); setMessage(result.feedback); setSelected(undefined); } catch { setMessage('That move is not legal here. Try a highlighted piece.'); } })(); return true; };
  const aiTurn = async () => { const result = await engine.playWeakAIMove(); if (result) { tone(Boolean(result.san.includes('x'))); setFen(engine.snapshot.fen); setMessage(`Apex AI played ${result.san}. ${result.feedback}`); } };
  return <div><div className="board-wrap"><div className="eval"><div className="white"/><div className="black"/></div><div className="board"><Chessboard position={fen} onPieceDrop={drop} onSquareClick={(square)=>setSelected(square)} customSquareStyles={legalStyles} animationDuration={180}/></div></div><div className="board-foot"><span>{message}</span><span>{chess.turn() === 'w' ? 'White' : 'Black'} to move</span></div><button className="cta" style={{marginTop:14}} onClick={aiTurn}>Play beginner AI →</button></div>;
}
