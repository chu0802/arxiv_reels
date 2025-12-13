export type RatePayload = {
  paper_id: number;
  rating: number; // -1 dislike, 0 neutral, 1 like
};

export async function ratePaperClient(paper_id: number, rating: number) {
  try {
    const res = await fetch('/api/rating', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ paper_id, rating }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || `Failed with status ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Client rating error:', error);
    throw error;
  }
}
