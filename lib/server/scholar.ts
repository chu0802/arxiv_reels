import { PAPERS_DATA } from '@/constants';
import { PaperData } from '@/types';

const HEADERS = {
  accept: 'application/json, text/plain, */*',
  'accept-language': 'en-US,en;q=0.9',
  'access-control-allow-origin': '*',
  dnt: '1',
  origin: 'https://scholar-inbox.com',
  priority: 'u=1, i',
  referer: 'https://scholar-inbox.com/',
  'sec-ch-ua': '"Not_A Brand";v="99", "Chromium";v="142"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"macOS"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-site',
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
} as const;

const LOGIN_URL = 'https://api.scholar-inbox.com/api/login';
const RECOMMEND_URL = 'https://api.scholar-inbox.com/api';
const RATE_URL = 'https://api.scholar-inbox.com/api/make_rating/';
const ADD_COLLECTION_URL = 'https://api.scholar-inbox.com/api/add_user_collection';
const REMOVE_COLLECTION_URL = 'https://api.scholar-inbox.com/api/remove_user_collection';
const LIST_COLLECTIONS_URL = 'https://api.scholar-inbox.com/api/collections';
const COLLECTION_PAPERS_URL = 'https://api.scholar-inbox.com/api/collection-papers';

export type RecommendationResponse = {
  digest_df: Record<string, PaperData>;
  order?: string[];
};

async function loginAndGetCookie(): Promise<string | null> {
  const magicToken = process.env.SCHOLAR_MAGIC_TOKEN;
  if (!magicToken) {
    console.error('SCHOLAR_MAGIC_TOKEN is missing');
    return null;
  }
  const loginRes = await fetch(`${LOGIN_URL}/${magicToken}`, {
    method: 'GET',
    headers: HEADERS,
    cache: 'no-store',
  });
  return loginRes.headers.get('set-cookie');
}

export async function fetchCollectionsList(): Promise<{ success: boolean; collections: string[]; mapping: Record<string, string>; error?: string }> {
  const magicToken = process.env.SCHOLAR_MAGIC_TOKEN;
  if (!magicToken) {
    console.error('SCHOLAR_MAGIC_TOKEN is missing');
    return { success: false, collections: [], mapping: {}, error: 'Missing SCHOLAR_MAGIC_TOKEN' };
  }

  try {
    const cookie = await loginAndGetCookie();
    if (!cookie) {
      return { success: false, collections: [], mapping: {}, error: 'Login failed' };
    }

    logRequest(LIST_COLLECTIONS_URL, {
      method: 'GET',
      headers: { ...HEADERS, cookie },
    });

    const res = await fetch(LIST_COLLECTIONS_URL, {
      method: 'GET',
      headers: { ...HEADERS, cookie },
      cache: 'no-store',
    });

    if (!res.ok) {
      const text = await res.text();
      return { success: false, collections: [], mapping: {}, error: text || `Status ${res.status}` };
    }

    const data = await res.json().catch(() => ({} as any));
    const namesDict = data?.collection_names_to_ids_dict ?? {};
    const collections = Object.keys(namesDict);
    return { success: true, collections, mapping: namesDict };
  } catch (error) {
    console.error('Fetch collections error:', error);
    return { success: false, collections: [], mapping: {}, error: 'Unexpected error' };
  }
}

const DEFAULT_VENUE_COLOR = '#EFEFEF';
const DEFAULT_YEAR_COLOR = '#ebe3f4';
const DEFAULT_PAPER_COLOR: PaperData['color'] = [0.8234, 0.4093, 0.4901, 0.3];

const WARM_COLORS = [
  '#f8e8e8', '#f4dddd', '#f0d2d2',
  '#f8ede3', '#f4e5d8', '#f0ddcd',
  '#f8f4e3', '#f4efd8', '#f0eacd',
  '#ecf4e8', '#e3efdd', '#d8ead2',
  '#e8eff8', '#ddebf4', '#d2e6f0',
  '#f0ecf8', '#ebe3f4', '#e6d8f0',
  '#f4f1ec',
];

const TAG_COLOR_MAP: Record<string, string> = {
  preprint: '#EFEFEF',
};

// Simple deterministic RNG (LCG) to mirror seeded randomness
function makeRng(seed: number) {
  let state = seed >>> 0;
  return (max: number) => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state % max;
  };
}

function getColorForTag(tagName: string, seed = 20250707): string {
  const key = tagName?.toLowerCase() ?? '';
  if (key in TAG_COLOR_MAP) return TAG_COLOR_MAP[key];

  const rng = makeRng(seed);
  const hashValue = [...tagName].reduce((s, c) => s + c.charCodeAt(0), 0) * (rng(100) + 1) + (rng(1000) + 1);
  const colorIndex = Math.abs(hashValue) % WARM_COLORS.length;
  return WARM_COLORS[colorIndex];
}

function normalizePaper(raw: any): PaperData {
  const published = raw.published_date || raw.publication_date || raw.publishedDate || raw.published_at || raw.date;
  const published_date = typeof published === 'string' ? published : new Date(published || Date.now()).toISOString();

  const ranking_score = Number(raw.ranking_score ?? raw.score ?? 0.5);
  const relevance = raw.relevance ?? ranking_score * 2 - 1;

  const venueNameRaw = raw.display_venue ?? raw.venue ?? 'Preprint';
  const venueName = typeof venueNameRaw === 'string' && venueNameRaw.toLowerCase().includes('arxiv') ? 'Preprint' : venueNameRaw;

  const collectionsRaw = raw.user_paper_collections ?? raw.collections ?? [];
  const collections = (Array.isArray(collectionsRaw) ? collectionsRaw : []).map((col: any) => {
    if (typeof col === 'string') return { name: col, color: getColorForTag(col) };
    const name = col?.name ?? String(col ?? 'Collection');
    const color = col?.color ?? getColorForTag(name);
    return { name, color };
  });

  const yearValue = new Date(published_date).getFullYear().toString();

  const colorArr = Array.isArray(raw.color) && raw.color.length === 4
    ? raw.color as PaperData['color']
    : DEFAULT_PAPER_COLOR;

  return {
    paper_id: Number(raw.paper_id ?? raw.id ?? Date.now()),
    arxiv_id: String(raw.arxiv_id ?? raw.id ?? ''),
    title: String(raw.title ?? ''),
    authors: String(raw.authors ?? ''),
    published_date,
    color: colorArr,
    ranking_score,
    rating: Number(raw.rating ?? 0),
    total_likes: Number(raw.total_likes ?? 0),
    total_read: Number(raw.total_read ?? 0),
    venue: {
      name: venueName,
      color: raw.venue?.color ?? getColorForTag(venueName),
    },
    year: {
      name: yearValue,
      color: getColorForTag(yearValue, 20250707),
    },
    url: String(raw.url ?? ''),
    abstract: String(raw.abstract ?? ''),
    relevance,
    collections,
  };
}

function arrayToMapWithOrder(list: any[]): { map: Record<string, PaperData>; order: string[] } {
  const map: Record<string, PaperData> = {};
  const order: string[] = [];

  list.forEach((item, idx) => {
    const paper = normalizePaper(item);
    const key = String(paper.paper_id ?? item?.paper_id ?? item?.id ?? item?.arxiv_id ?? idx);
    if (!(key in map)) {
      order.push(key);
    }
    map[key] = paper;
  });

  return { map, order };
}

function logRequest(url: string, opts: RequestInit) {
  const headers = opts.headers as Record<string, string>;
  const body =
    typeof opts.body === 'string'
      ? opts.body
      : opts.body
      ? '<non-string body>'
      : undefined;

  console.log('[api call]', {
    url,
    method: opts.method,
    headers: {
      ...headers,
      cookie: headers?.cookie ? '<redacted>' : undefined,
    },
    body,
  });
}

export async function fetchRecommendations(): Promise<RecommendationResponse> {
  try {
    const cookie = await loginAndGetCookie();
    if (!cookie) {
      return { digest_df: PAPERS_DATA, order: Object.keys(PAPERS_DATA) };
    }

    const cookieHeader = { cookie };

    logRequest(RECOMMEND_URL, {
      method: 'GET',
      headers: { ...HEADERS, ...cookieHeader },
    });

    // Step 2: call recommendations
    const recRes = await fetch(RECOMMEND_URL, {
      method: 'GET',
      headers: {
        ...HEADERS,
        ...cookieHeader,
      },
      cache: 'no-store',
    });

    const raw = (await recRes.json().catch(() => ({}))) as any;
    if (Array.isArray(raw?.digest_df) && raw.digest_df.length > 0) {
      const sorted = [...raw.digest_df].sort((a, b) => {
        const da = new Date(a.published_date || a.date || a.published_at || 0).getTime();
        const db = new Date(b.published_date || b.date || b.published_at || 0).getTime();
        return db - da;
      });
      const { map, order } = arrayToMapWithOrder(sorted);
      return { digest_df: map, order };
    }

    return { digest_df: PAPERS_DATA, order: Object.keys(PAPERS_DATA) };
  } catch (error) {
    console.error('Recommendation fetch error:', error);
    return { digest_df: PAPERS_DATA, order: Object.keys(PAPERS_DATA) };
  }
}

export async function fetchCollectionPapers(collectionId: string): Promise<RecommendationResponse> {
  if (!collectionId) {
    return { digest_df: PAPERS_DATA, order: Object.keys(PAPERS_DATA) };
  }

  try {
    const cookie = await loginAndGetCookie();
    if (!cookie) {
      return { digest_df: PAPERS_DATA, order: Object.keys(PAPERS_DATA) };
    }

    const url = `${COLLECTION_PAPERS_URL}?collection_id=${encodeURIComponent(collectionId)}`;

    logRequest(url, {
      method: 'GET',
      headers: { ...HEADERS, cookie },
    });

    const res = await fetch(url, {
      method: 'GET',
      headers: { ...HEADERS, cookie },
      cache: 'no-store',
    });

    const raw = (await res.json().catch(() => ({}))) as any;
    if (Array.isArray(raw?.digest_df) && raw.digest_df.length > 0) {
      const normalized = raw.digest_df.map((item: any) => normalizePaper(item));
      const sorted = normalized.sort((a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime());

      const map: Record<string, PaperData> = {};
      const order: string[] = [];
      sorted.forEach((paper, idx) => {
        const key = String(paper.paper_id ?? paper.arxiv_id ?? idx);
        if (!(key in map)) {
          order.push(key);
        }
        map[key] = paper;
      });

      return { digest_df: map, order };
    }

    return { digest_df: PAPERS_DATA, order: Object.keys(PAPERS_DATA) };
  } catch (error) {
    console.error('Collection papers fetch error:', error);
    return { digest_df: PAPERS_DATA, order: Object.keys(PAPERS_DATA) };
  }
}

export async function ratePaper(paperId: number, rating: number) {
  const magicToken = process.env.SCHOLAR_MAGIC_TOKEN;
  if (!magicToken) {
    console.error('SCHOLAR_MAGIC_TOKEN is missing');
    return { success: false, error: 'Missing SCHOLAR_MAGIC_TOKEN' };
  }

  if (!Number.isFinite(paperId)) {
    return { success: false, error: 'Invalid paper id' };
  }

  if (![ -1, 0, 1 ].includes(rating)) {
    return { success: false, error: 'Invalid rating value' };
  }

  try {
    const cookie = await loginAndGetCookie();
    if (!cookie) {
      return { success: false, error: 'Login failed' };
    }

    const url = `${RATE_URL}`;

    logRequest(url, {
      method: 'POST',
      headers: { ...HEADERS, cookie, 'content-type': 'application/json' },
      body: JSON.stringify({ rating, id: String(paperId) }),
    });

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        ...HEADERS,
        cookie,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ id: String(paperId), rating }),
      cache: 'no-store',
    });

    if (!res.ok) {
      const bodyText = await res.text();
      return {
        success: false,
        status: res.status,
        statusText: res.statusText,
        url,
        error: bodyText || 'Rating failed',
      };
    }

    const data = await res.json().catch(() => null);
    return { success: true, data };
  } catch (error) {
    console.error('Rate paper error:', error);
    return { success: false, error: 'Unexpected error' };
  }
}

export async function addPaperToCollection(collection: string, paperId: string | number, collectionId?: string) {
  const magicToken = process.env.SCHOLAR_MAGIC_TOKEN;
  if (!magicToken) {
    console.error('SCHOLAR_MAGIC_TOKEN is missing');
    return { success: false, error: 'Missing SCHOLAR_MAGIC_TOKEN' };
  }

  const collectionName = (collection ?? '').toString().trim();
  if (!collectionName && !collectionId) {
    return { success: false, error: 'Collection name or id is required' };
  }

  const paperIdStr = paperId?.toString().trim();
  if (!paperIdStr) {
    return { success: false, error: 'Paper id is required' };
  }

  try {
    const cookie = await loginAndGetCookie();
    if (!cookie) {
      return { success: false, error: 'Login failed' };
    }

  const payload = { collection: collectionName, collection_id: collectionId, paper_id: paperIdStr };

    logRequest(ADD_COLLECTION_URL, {
      method: 'POST',
      headers: { ...HEADERS, cookie, 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const res = await fetch(ADD_COLLECTION_URL, {
      method: 'POST',
      headers: {
        ...HEADERS,
        cookie,
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    if (!res.ok) {
      const bodyText = await res.text();
      return {
        success: false,
        status: res.status,
        statusText: res.statusText,
        url: ADD_COLLECTION_URL,
        error: bodyText || 'Add collection failed',
      };
    }

    const data = await res.json().catch(() => null);
    return { success: true, data };
  } catch (error) {
    console.error('Add collection error:', error);
    return { success: false, error: 'Unexpected error' };
  }
}

export async function removePaperFromCollection(collection: string, paperId: string | number, collectionId?: string) {
  const magicToken = process.env.SCHOLAR_MAGIC_TOKEN;
  if (!magicToken) {
    console.error('SCHOLAR_MAGIC_TOKEN is missing');
    return { success: false, error: 'Missing SCHOLAR_MAGIC_TOKEN' };
  }

  const collectionName = (collection ?? '').toString().trim();
  if (!collectionName && !collectionId) {
    return { success: false, error: 'Collection name or id is required' };
  }

  const paperIdStr = paperId?.toString().trim();
  if (!paperIdStr) {
    return { success: false, error: 'Paper id is required' };
  }

  try {
    const cookie = await loginAndGetCookie();
    if (!cookie) {
      return { success: false, error: 'Login failed' };
    }

  const payload = { collection: collectionName, collection_id: collectionId, paper_id: paperIdStr };

    logRequest(REMOVE_COLLECTION_URL, {
      method: 'POST',
      headers: { ...HEADERS, cookie, 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const res = await fetch(REMOVE_COLLECTION_URL, {
      method: 'POST',
      headers: {
        ...HEADERS,
        cookie,
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    if (!res.ok) {
      const bodyText = await res.text();
      return {
        success: false,
        status: res.status,
        statusText: res.statusText,
        url: REMOVE_COLLECTION_URL,
        error: bodyText || 'Remove collection failed',
      };
    }

    const data = await res.json().catch(() => null);
    return { success: true, data };
  } catch (error) {
    console.error('Remove collection error:', error);
    return { success: false, error: 'Unexpected error' };
  }
}
