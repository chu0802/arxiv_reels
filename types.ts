export interface Venue {
  name: string;
  color: string;
}

export interface Year {
  name: string;
  color: string;
}

export interface Collection {
  name: string;
  color: string;
}

export interface PaperData {
  paper_id: number;
  arxiv_id: string;
  title: string;
  authors: string;
  published_date: string;
  color: [number, number, number, number]; // RGBA usually 0-1 range based on provided json
  ranking_score: number;
  rating: number;
  total_likes: number;
  total_read: number;
  venue: Venue;
  year: Year;
  url: string;
  abstract: string;
  relevance: number;
  collections: Collection[];
}

export interface PaperMap {
  [key: string]: PaperData;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
