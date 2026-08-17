import type { Metadata } from 'next';
import './globals.css';
import './theme-overrides.css';
import './cozy-overrides.css';
export const metadata: Metadata = { title: 'ChessApex — Climb Higher', description: 'A delightful chess tutor built around deliberate practice.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
