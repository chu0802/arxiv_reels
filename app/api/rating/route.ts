import { NextResponse } from 'next/server';
import { ratePaper } from '@/lib/server/scholar';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const paperId = Number(body.paper_id ?? body.paperId ?? body.id);
    const rating = Number(body.rating);

    const result = await ratePaper(paperId, rating);
    if (!result.success) {
      const status = typeof result.status === 'number' ? result.status : 400;
      return NextResponse.json({ success: false, error: result.error || 'Rating failed' }, { status });
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (error) {
    console.error('Rating API error', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
