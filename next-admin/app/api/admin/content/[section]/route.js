import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { sql } from '@vercel/postgres';

async function requireAuth(request) {
  const token = request.cookies.get('admin-token')?.value;
  if (!token) return false;
  const payload = await verifyToken(token);
  return !!payload;
}

async function ensureTable() {
  await sql`CREATE TABLE IF NOT EXISTS content (section TEXT PRIMARY KEY, data JSONB, updated_at TIMESTAMPTZ DEFAULT NOW(), updated_by TEXT);`;
}

export async function GET(request, { params }) {
  const authed = await requireAuth(request);
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const section = params.section;
  await ensureTable();
  const { rows } = await sql`SELECT data FROM content WHERE section = ${section} LIMIT 1;`;
  const data = rows[0]?.data || {};
  return NextResponse.json({ section, data });
}

export async function PUT(request, { params }) {
  const authed = await requireAuth(request);
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const section = params.section;
  const body = await request.json().catch(() => ({}));
  await ensureTable();
  await sql`INSERT INTO content (section, data, updated_at, updated_by) VALUES (${section}, ${body}, NOW(), 'admin') ON CONFLICT (section) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW(), updated_by = 'admin';`;
  return NextResponse.json({ success: true });
}
