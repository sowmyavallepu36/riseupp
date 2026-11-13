import { ImageOff, KeyRound, RefreshCw, TriangleAlert } from 'lucide-react';

export default function StatusMessage({ variant, onRetry }) {
  if (variant === 'empty') {
    return (
      <div className="status" role="status">
        <span className="status-icon"><ImageOff size={34} /></span>
        <h3>No images found. Try another search keyword.</h3>
      </div>
    );
  }

  if (variant === 'key') {
    return (
      <div className="status" role="alert">
        <span className="status-icon"><KeyRound size={34} /></span>
        <h3>Unsplash access key is missing</h3>
        <p>
          Create a <code>.env</code> file in the project root, add{' '}
          <code>VITE_UNSPLASH_ACCESS_KEY=your_access_key</code>, then restart{' '}
          <code>npm run dev</code>.
        </p>
        <button type="button" className="retry-btn" onClick={onRetry}>
          <RefreshCw size={18} /> Retry
        </button>
      </div>
    );
  }

  return (
    <div className="status" role="alert">
      <span className="status-icon"><TriangleAlert size={34} /></span>
      <h3>Oops! Something went wrong. Please try again.</h3>
      <button type="button" className="retry-btn" onClick={onRetry}>
        <RefreshCw size={18} /> Retry
      </button>
    </div>
  );
}
