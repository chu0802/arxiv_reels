import { ChatMessage } from '@/types';

export async function getPaperInsightsClient(
  abstract: string,
  userQuestion: string,
  history: ChatMessage[] = []
): Promise<string> {
  try {
    const res = await fetch('/api/insights', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ abstract, question: userQuestion, history }),
    });

    if (!res.ok) {
      const { error } = await res.json().catch(() => ({ error: 'Unknown error' }));
      return error || 'The server returned an error while fetching insights.';
    }

    const data = await res.json();
    return data.text ?? 'No response received.';
  } catch (error) {
    console.error('Client insights fetch error:', error);
    return 'Unable to contact the server for insights right now.';
  }
}
