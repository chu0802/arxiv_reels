import { NextResponse } from 'next/server';
import { fetchCollectionsList } from '@/lib/server/scholar';

export const dynamic = 'force-dynamic';

export async function GET() {
  const result = await fetchCollectionsList();
  const status = result.success ? 200 : 400;
  return NextResponse.json(result, { status });
}
