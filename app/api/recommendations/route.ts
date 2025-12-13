import { NextResponse } from 'next/server';
import { fetchRecommendations } from '@/lib/server/scholar';

export const dynamic = 'force-dynamic';

export async function GET() {
  const data = await fetchRecommendations();
  return NextResponse.json(data);
}
