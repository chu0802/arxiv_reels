export type RecommendationsPayload<T = unknown> = {
  digest_df: Record<string, T>;
  order?: string[];
};

export async function fetchRecommendationsClient<T = unknown>(): Promise<RecommendationsPayload<T>> {
  try {
    const res = await fetch('/api/recommendations', { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`Failed with status ${res.status}`);
    }
    const data = (await res.json()) as RecommendationsPayload<T>;
    return data;
  } catch (error) {
    console.error('Client recommendations fetch error:', error);
    return { digest_df: {}, order: [] };
  }
}
