import type { EngineLine, PositionAnalysis } from './types';
import type { Color } from '../chess/types';

interface Pending { resolve: (value: PositionAnalysis) => void; reject: (reason: Error) => void; lines: Map<number, EngineLine>; fen: string; sideToMove: Color; }
export class StockfishClient {
  private worker?: Worker; private pending?: Pending; private source: 'stockfish'|'fallback' = 'fallback';
  constructor(workerUrl?: string) { if (typeof Worker !== 'undefined' && workerUrl) { try { this.worker = new Worker(workerUrl); this.source='stockfish'; this.worker.onmessage=(event)=>this.receive(String(event.data)); } catch { this.worker=undefined; } } }
  analyze(fen: string, sideToMove: Color, depth=16, multipv=3): Promise<PositionAnalysis> { if (!this.worker) return Promise.resolve({ fen, sideToMove, depth: 0, lines: [], source: 'fallback' }); return new Promise((resolve,reject)=>{ this.pending={resolve,reject,lines:new Map(),fen,sideToMove}; this.worker?.postMessage(`setoption name MultiPV value ${multipv}`); this.worker?.postMessage('ucinewgame'); this.worker?.postMessage(`position fen ${fen}`); this.worker?.postMessage(`go depth ${depth}`); }); }
  stop(): void { this.worker?.postMessage('stop'); }
  dispose(): void { this.worker?.terminate(); this.worker=undefined; }
  private receive(message: string): void { const pending=this.pending; if(!pending) return; const info=message.match(/info depth (\d+).*?multipv (\d+).*?score (cp|mate) (-?\d+).*? pv (.+)/); if(info && info[5]){ const line:EngineLine={depth:Number(info[1]),multipv:Number(info[2]),scoreCp:info[3]==='mate'?Number(info[4])>0?10000:-10000:Number(info[4]),mate:info[3]==='mate'?Number(info[4]):undefined,pv:info[5].trim().split(/\s+/),san:[]}; pending.lines.set(line.multipv,line); } if(message.startsWith('bestmove')){ const lines=[...pending.lines.values()].sort((a,b)=>a.multipv-b.multipv); pending.resolve({fen:pending.fen,sideToMove:pending.sideToMove,depth:lines[0]?.depth ?? 0,lines,bestMove:lines[0]?.pv[0],source:this.source}); this.pending=undefined; } }
}
