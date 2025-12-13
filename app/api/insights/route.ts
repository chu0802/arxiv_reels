import { NextResponse } from 'next/server';
import { getPaperInsightsServer } from '@/lib/server/gemini';
import { ChatMessage } from '@/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { abstract, question, history = [] } = body as {
      abstract?: string;
      question?: string;
      history?: ChatMessage[];
    };

    if (!abstract || !question) {
      return NextResponse.json({ error: 'abstract and question are required' }, { status: 400 });
    }

    const answer = await getPaperInsightsServer({ abstract, question, history });
    return NextResponse.json({ text: answer });
  } catch (error) {
    console.error('Error handling /api/insights:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
