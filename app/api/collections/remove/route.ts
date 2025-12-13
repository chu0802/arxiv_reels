import { NextResponse } from 'next/server';
import { removePaperFromCollection } from '@/lib/server/scholar';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
  const collection = body.collection ?? body.collection_name ?? body.name;
  const collectionId = body.collection_id ?? body.collectionId;
  const paperId = body.paper_id ?? body.paperId ?? body.id;

  const result = await removePaperFromCollection(collection, paperId, collectionId);
    if (!result.success) {
      return NextResponse.json(result, { status: result.status ?? 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Remove Collection API error', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
