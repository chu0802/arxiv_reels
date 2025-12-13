import { NextResponse } from 'next/server';
import { fetchCollectionPapers } from '@/lib/server/scholar';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const collectionId = searchParams.get('collection_id') || '';

  const result = await fetchCollectionPapers(collectionId);
  return NextResponse.json(result);
}
