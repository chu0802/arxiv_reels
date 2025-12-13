export async function addCollectionClient(collection: string, paper_id: string | number, collection_id?: string) {
  try {
    const res = await fetch('/api/collections', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ collection, collection_id, paper_id: String(paper_id) }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || `Failed with status ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Client add collection error:', error);
    throw error;
  }
}

export async function removeCollectionClient(collection: string, paper_id: string | number, collection_id?: string) {
  try {
    const res = await fetch('/api/collections/remove', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ collection, collection_id, paper_id: String(paper_id) }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || `Failed with status ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Client remove collection error:', error);
    throw error;
  }
}

export type CollectionsListResponse = { success: boolean; collections: string[]; mapping: Record<string, string>; error?: string };

export async function fetchCollectionsClient(): Promise<CollectionsListResponse> {
  try {
    const res = await fetch('/api/collections/list', { cache: 'no-store' });
    const data = (await res.json()) as CollectionsListResponse;
    if (!res.ok || !data.success) {
      throw new Error(data.error || `Failed with status ${res.status}`);
    }
    return data;
  } catch (error) {
    console.error('Client fetch collections error:', error);
    return { success: false, collections: [], mapping: {}, error: 'Failed to fetch collections' };
  }
}

export type CollectionPapersResponse<T = unknown> = { digest_df: Record<string, T>; order?: string[] };

export async function fetchCollectionPapersClient<T = unknown>(collectionId: string): Promise<CollectionPapersResponse<T>> {
  try {
    const res = await fetch(`/api/collections/papers?collection_id=${encodeURIComponent(collectionId)}`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`Failed with status ${res.status}`);
    }
    return (await res.json()) as CollectionPapersResponse<T>;
  } catch (error) {
    console.error('Client collection papers fetch error:', error);
    return { digest_df: {}, order: [] };
  }
}
