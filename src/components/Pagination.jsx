import { Loader2 } from 'lucide-react';

export default function Pagination({ visible, loading, failed, onLoadMore }) {
  if (!visible) return null;
  return (
    <div className="pagination">
      {failed && (
        <p className="pagination-error" role="alert">
          Could not load more images. Please try again.
        </p>
      )}
      <button type="button" className="load-more" onClick={onLoadMore} disabled={loading}>
        {loading ? (
          <>
            <Loader2 size={20} className="spin" aria-hidden="true" /> Loading...
          </>
        ) : (
          'Load More'
        )}
      </button>
    </div>
  );
}
