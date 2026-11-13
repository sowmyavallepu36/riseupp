import { useEffect, useRef, useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import ImageGallery from './components/ImageGallery.jsx';
import ImageDetails from './components/ImageDetails.jsx';
import Loader from './components/Loader.jsx';
import Pagination from './components/Pagination.jsx';
import StatusMessage from './components/StatusMessage.jsx';
import { searchPhotos, MissingKeyError, UTM } from './services/unsplashApi.js';

export const CATEGORIES = ['Mountains', 'Flowers', 'Beaches', 'Cities'];
const DEFAULT_QUERY = CATEGORIES[0];

const titleCase = (text) => text.replace(/\b\w/g, (char) => char.toUpperCase());

export default function App() {
  const [inputValue, setInputValue] = useState(DEFAULT_QUERY);
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [reloadKey, setReloadKey] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadMoreFailed, setLoadMoreFailed] = useState(false);
  const [selected, setSelected] = useState(null);

  const isFetchingMore = useRef(false);
  const latestQuery = useRef(query);
  latestQuery.current = query;

  // Fetch page 1 whenever the query changes (or Retry is pressed).
  useEffect(() => {
    const controller = new AbortController();
    isFetchingMore.current = false;
    setStatus('loading');
    setError(null);
    setPhotos([]);
    setPage(1);
    setLoadingMore(false);
    setLoadMoreFailed(false);

    searchPhotos({ query, page: 1, signal: controller.signal })
      .then((data) => {
        setPhotos(data.results);
        setTotal(data.total);
        setTotalPages(data.totalPages);
        setStatus('success');
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError(err);
        setStatus('error');
      });

    return () => controller.abort();
  }, [query, reloadKey]);

  const handleSearch = (rawTerm) => {
    const term = rawTerm.trim();
    if (!term) return;
    setInputValue(term);
    if (term.toLowerCase() === query.toLowerCase()) {
      setReloadKey((key) => key + 1);
    } else {
      setQuery(term);
    }
  };

  const loadMore = async () => {
    if (isFetchingMore.current || page >= totalPages) return;
    isFetchingMore.current = true;
    setLoadingMore(true);
    setLoadMoreFailed(false);
    const requestedQuery = query;
    try {
      const nextPage = page + 1;
      const data = await searchPhotos({ query: requestedQuery, page: nextPage });
      if (requestedQuery !== latestQuery.current) return;
      setPhotos((current) => {
        const seen = new Set(current.map((photo) => photo.id));
        return [...current, ...data.results.filter((photo) => !seen.has(photo.id))];
      });
      setPage(nextPage);
    } catch {
      if (requestedQuery === latestQuery.current) setLoadMoreFailed(true);
    } finally {
      isFetchingMore.current = false;
      setLoadingMore(false);
    }
  };

  const activeCategory = CATEGORIES.find(
    (category) => category.toLowerCase() === query.toLowerCase()
  );

  let content;
  if (status === 'loading') {
    content = <Loader />;
  } else if (status === 'error') {
    content = (
      <StatusMessage
        variant={error instanceof MissingKeyError ? 'key' : 'error'}
        onRetry={() => setReloadKey((key) => key + 1)}
      />
    );
  } else if (photos.length === 0) {
    content = <StatusMessage variant="empty" />;
  } else {
    content = (
      <>
        <ImageGallery photos={photos} onOpen={setSelected} />
        <Pagination
          visible={page < totalPages}
          loading={loadingMore}
          failed={loadMoreFailed}
          onLoadMore={loadMore}
        />
      </>
    );
  }

  return (
    <div className="app" id="top">
      <Header />
      <main>
        <Hero
          value={inputValue}
          onChange={setInputValue}
          onSearch={handleSearch}
          categories={CATEGORIES}
          activeCategory={activeCategory}
        />
        <section className="gallery-section" id="explore" aria-labelledby="results-title">
          <div className="container">
            <div className="results-head">
              <h2 id="results-title">
                {activeCategory ? `Beautiful ${activeCategory}` : `Results for “${titleCase(query)}”`}
              </h2>
              {status === 'success' && total > 0 && (
                <span className="count-pill" aria-live="polite">
                  {total.toLocaleString()} images found
                </span>
              )}
            </div>
            {content}
          </div>
        </section>
      </main>

      <footer className="footer" id="about">
        <div className="container footer-inner">
          <p>
            <strong>RiseUpp</strong> is a photo discovery app. Every photograph is provided by{' '}
            <a href={`https://unsplash.com/?${UTM}`} target="_blank" rel="noopener noreferrer">
              Unsplash
            </a>{' '}
            and credited to its photographer.
          </p>
        </div>
      </footer>

      {selected && <ImageDetails photo={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
