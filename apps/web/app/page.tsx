'use client';
import { useState } from 'react';
import { ChessBoard, GameSetup, type GameConfig } from '../components/ChessBoard';
import { ApexPath } from '../components/ApexPath';
import { TheoryLibrary } from '../components/TheoryLibrary';

export default function Home() {
  const [config, setConfig] = useState<GameConfig>();
  const key = config ? `${config.color}-${config.level}-${config.mode}` : 'default';
  return <main className="shell"><nav className="nav"><div className="brand">Chess<span>Apex</span></div><div className="nav-right"><span className="status-dot"/> ENGINE ONLINE <span className="streak">✦ 4 day streak</span></div></nav><section className="content"><div className="hero"><div><div className="eyebrow">YOUR PERSONAL CHESS CLIMB // 12 MIN</div><h1>Learn the move.<br/><span className="gradient-text">Own the moment.</span></h1><p>ChessApex is a calm, clever training partner. Play your way, make the mistake, and ask for the idea only when you want it.</p></div><div className="hero-actions"><button className="cta">Resume training <span>↗</span></button><a href="/analysis" className="secondary-cta">Open post-game lab →</a></div></div><div className="apex-strip"><div><span className="strip-label">CURRENT RATING</span><strong>842</strong><em>+26 this week</em></div><div><span className="strip-label">NEXT UNLOCK</span><strong>Tactical</strong><em>3 lessons remaining</em></div><div><span className="strip-label">TODAY'S FOCUS</span><strong>Threat scan</strong><em>Ask for help only when you need it</em></div></div><div className="grid home-grid"><section className="card board-card"><div className="card-heading"><h2>Practice arena</h2><span className="live-pill"><span/> LIVE ENGINE</span></div><ChessBoard key={key} config={config}/></section><div className="home-side"><GameSetup onPreview={setConfig}/><ApexPath/></div></div><TheoryLibrary/></section></main>;
}
