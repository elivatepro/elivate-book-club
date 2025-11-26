import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function POST(request) {
  const token = request.cookies.get('admin-token')?.value;
  const payload = token ? await verifyToken(token) : null;
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  const { paths = [] } = body;
  paths.forEach((p) => {
    if (typeof p === 'string') revalidatePath(p);
  });
  return NextResponse.json({ success: true, paths });
}
