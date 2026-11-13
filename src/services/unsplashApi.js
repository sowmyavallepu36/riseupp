const ENDPOINT = 'https://api.unsplash.com/search/photos';

export const PER_PAGE = 20;
export const UTM = 'utm_source=riseupp&utm_medium=referral';

export class MissingKeyError extends Error {
  constructor() {
    super('VITE_UNSPLASH_ACCESS_KEY is not set.');
    this.name = 'MissingKeyError';
  }
}

/**
 * Search Unsplash photos. Runs entirely in the browser.
 * Returns { results, total, totalPages }.
 */
export async function searchPhotos({ query, page = 1, signal }) {
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  if (!accessKey || accessKey === 'your_access_key') throw new MissingKeyError();

  const params = new URLSearchParams({
    query,
    page: String(page),
    per_page: String(PER_PAGE),
    client_id: accessKey,
  });

  const response = await fetch(`${ENDPOINT}?${params}`, { signal });
  if (!response.ok) {
    throw new Error(`Unsplash request failed with status ${response.status}`);
  }

  const data = await response.json();
  return {
    results: data.results ?? [],
    total: data.total ?? 0,
    totalPages: data.total_pages ?? 0,
  };
}
