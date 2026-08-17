import { NextResponse } from 'next/server';
import { getNeon } from '../../../lib/neon';
export async function GET() { const sql=getNeon(); if(!sql) return NextResponse.json({ok:true,database:'not-configured'}); try { await sql`select 1`; return NextResponse.json({ok:true,database:'neon'}); } catch { return NextResponse.json({ok:false,database:'unavailable'},{status:503}); } }
