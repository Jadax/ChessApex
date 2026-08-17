import { neon } from '@neondatabase/serverless';
export function getNeon() { const url = process.env.DATABASE_URL; if (!url) return null; return neon(url); }
